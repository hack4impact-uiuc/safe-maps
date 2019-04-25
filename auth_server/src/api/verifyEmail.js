const router = require("express").Router();
const { sendResponse } = require("./../utils/sendResponse");
const { isGmailEnabled } = require("../utils/getConfigFile");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("./../utils/userVerification");

router.post(
  "/verifyEmail",
  [],
  handleAsyncErrors(async function(req, res) {
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }

    const usingGmail = await isGmailEnabled();
    if (!usingGmail) {
      return sendResponse(
        res,
        500,
        "Gmail not enabled. Do not use this endpoint."
      );
    }
    if (!req.body || !req.body.pin) {
      return sendResponse(res, 400, "Malformed request: pin not specified");
    }

    if (user.verified) {
      return sendResponse(res, 400, "User has already verified their email");
    }

    if (req.body.pin != user.pin) {
      return sendResponse(res, 400, "PIN does not match");
    }

    user.verified = true;
    await user.save();
    return sendResponse(res, 200, "User successfully verified");
  })
);

module.exports = router;
