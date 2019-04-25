const router = require("express").Router();
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { signAuthJWT, shouldUpdateJWT } = require("./../utils/jwtHelpers");
const { googleAuth } = require("./../utils/getConfigFile");
const fetch = require("node-fetch");
const { verifyUser } = require("./../utils/userVerification");
const handleAsyncErrors = require("../utils/errorHandler");

router.post(
  "/verify",
  handleAsyncErrors(async function(req, res) {
    const useGoogle = await googleAuth();

    if (useGoogle) {
      const tokenInfoRes = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
          req.headers.token
        }`
      );
      const payload = await tokenInfoRes.json();
      const user = await User.findOne({
        email: payload.email,
        googleAuth: true
      });
      if (user) {
        return sendResponse(res, 200, "Google Authenticated");
      } else {
        null;
      }
    }
    const user = await verifyUser(req.headers.token);
    if (user.errorMessage != undefined) {
      return sendResponse(res, 400, user.errorMessage);
    }

    if (await shouldUpdateJWT(req.headers.token, user._id, user.password)) {
      var newToken = await signAuthJWT(user._id, user.password);
      return res.status(200).send({
        status: 200,
        message: "Valid JWT token",
        role: user.role,
        newToken
      });
    }

    return res.status(200).send({
      status: 200,
      message: "Valid JWT token",
      role: user.role
    });
  })
);

module.exports = router;
