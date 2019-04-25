const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const { sendResponse } = require("./../utils/sendResponse");
const { getRolesForUser } = require("./../utils/getConfigFile");
const fetch = require("node-fetch");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("./../utils/userVerification");

router.get(
  "/roles",
  check("token")
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
    let user = null;
    if (req.headers.google === "undefined") {
      user = await verifyUser(req.headers.token);
      if (user.errorMessage != null) {
        return sendResponse(res, 400, user.errorMessage);
      }
    } else {
      const tokenInfoRes = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
          req.headers.token
        }`
      );
      const payload = await tokenInfoRes.json();
      user = await User.findOne({ email: payload.email, googleAuth: true });
      if (!user) {
        sendResponse(res, 400, "User does not exist in the database");
        return;
      }
    }
    const roles = await getRolesForUser(user.role);
    let users = [];
    await Promise.all(
      roles.map(async role => {
        let usersWithRoles = await User.find({ role });
        for (let i in usersWithRoles) {
          let newUser = {
            email: usersWithRoles[i].email,
            role: usersWithRoles[i].role
          };
          users = users.concat(newUser);
        }
      })
    );
    return res.status(200).send({
      status: 200,
      message: "Users succesfully returned",
      user_emails: users
    });
  })
);

module.exports = router;
