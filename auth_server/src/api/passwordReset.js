const router = require("express").Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { signAuthJWT } = require("../utils/jwtHelpers");
const {
  isGmailEnabled,
  isSecurityQuestionEnabled
} = require("../utils/getConfigFile");
const { expirePIN } = require("../utils/pinHelpers");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/passwordReset",
  [
    check("email").isEmail(),
    check("password")
      .isString()
      .isLength({ min: 1 }),
    check("pin")
      .isNumeric()
      .optional(),
    check("answer")
      .isString()
      .isLength({ min: 1 })
      .optional()
  ],
  handleAsyncErrors(async function(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }
    const gmailEnabled = await isGmailEnabled();
    const securityQuestionEnabled = await isSecurityQuestionEnabled();
    if (
      (gmailEnabled && !req.body.pin) ||
      (securityQuestionEnabled && !req.body.answer)
    ) {
      sendResponse(
        res,
        400,
        "Gmail enabled/not enabled but PIN/security answer not provided"
      );
      return;
    }
    let user;
    try {
      user = await User.findOne({ email: req.body.email });
    } catch (e) {
      return sendResponse(res, 500, e.message);
    }
    if (!user) {
      sendResponse(res, 400, "User does not exist in the database");
      return;
    }
    if (gmailEnabled) {
      if (user.pin && user.pin != req.body.pin) {
        sendResponse(res, 400, "PIN does not match");
        return;
      }
      if (
        !user.expiration ||
        user.expiration.getTime() < new Date().getTime()
      ) {
        sendResponse(
          res,
          400,
          "PIN is expired or expiration field doesn't exist in the DB"
        );
        return;
      }
    } else {
      if (
        req.body.answer &&
        user.answer !== req.body.answer.toLowerCase().replace(/\s/g, "")
      ) {
        sendResponse(res, 400, "Answer to security question does not match");
        return;
      }
    }
    expirePIN(user);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    sendResponse(res, 200, "Password successfully reset", {
      token: await signAuthJWT(user._id, user.password)
    });
  })
);

module.exports = router;
