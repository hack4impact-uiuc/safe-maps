const router = require("express").Router();
const { validationResult } = require("express-validator/check");
const { sendResponse } = require("./../utils/sendResponse");
const { isGmailEnabled } = require("../utils/getConfigFile");
const { generatePIN } = require("../utils/pinHelpers");
const { sendMail } = require("../utils/sendMail");
const handleAsyncErrors = require("../utils/errorHandler");

const { verifyUser } = require("./../utils/userVerification");
router.post(
  "/resendVerificationEmail",
  [],
  handleAsyncErrors(async function(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    const usingGmail = await isGmailEnabled();
    if (!usingGmail) {
      return sendResponse(res, 500, "Endpoint invalid. Gmail is not enabled.");
    }
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }

    if (user.verified) {
      sendResponse(res, 400, "User is already verified");
    }

    // All the validation checks passed, so let's try and send the email
    generatePIN(user);
    const body = {
      from: "hack4impact.infra@gmail.com",
      to: user.email,
      subject: "New User Verification",
      text:
        "Thanks for signing up! Please enter the following PIN on the new user confirmation page: " +
        user.pin
    };
    try {
      await sendMail(body);
      // success, so save the user to the DB and send back the JWT
      // note that the PIN does not change if the email can't be sent
      await user.save();
      return sendResponse(res, 200, "Verification email successfully resent");
    } catch (e) {
      console.log(e);
      return sendResponse(
        res,
        500,
        "Verification email could not be sent despite Gmail being enabled. This is likely due to incorrect gmail keys in the .env file. User not added to DB."
      );
    }
  })
);

module.exports = router;
