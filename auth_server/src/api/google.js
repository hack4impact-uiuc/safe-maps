const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const fetch = require("node-fetch");
const { googleAuth } = require("./../utils/getConfigFile");
const { sendResponse } = require("./../utils/sendResponse");
const handleAsyncErrors = require("../utils/errorHandler");
require("dotenv").config();

router.post(
  "/google",
  check("tokenId")
    .isString()
    .isLength({ min: 1 }),
  handleAsyncErrors(async function(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    const useGoogle = await googleAuth();
    if (!useGoogle)
      return sendResponse(res, 400, "Google authentication has not be enabled");

    const tokenInfoRes = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
        req.body.tokenId
      }`
    );
    const payload = await tokenInfoRes.json();

    const user = await User.findOne({ email: payload.email, googleAuth: true });
    if (user) {
      return sendResponse(res, 200, "Successful login!");
    } else {
      const userCheck = await User.findOne({ email: payload.email });
      if (userCheck) {
        return sendResponse(res, 400, "User is not a Google user");
      } else {
        const user = new User({
          email: payload.email,
          //username: payload.name,
          password: null,
          googleAuth: true,
          role: "guest"
        });
        await user.save();
        sendResponse(res, 200, "New Google user: " + payload.email);
      }
    }
  })
);

module.exports = router;
