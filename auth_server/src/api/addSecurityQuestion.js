const router = require("express").Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator/check");
const { sendResponse } = require("./../utils/sendResponse");
const bcrypt = require("bcrypt");
const { getSecurityQuestions } = require("../utils/getConfigFile");
const handleAsyncErrors = require("../utils/errorHandler");
const { verifyUser } = require("./../utils/userVerification");

router.post(
  "/addSecurityQuestionAnswer",
  [
    check("token"),
    check("questionIdx").isNumeric(),
    check("answer")
      .isString()
      .isLength({ min: 1 })
  ],
  handleAsyncErrors(async function(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }

    let user = await verifyUser(req.headers.token);
    if (user.errorMessage != null) {
      return sendResponse(res, 400, user.errorMessage);
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return sendResponse(res, 400, "Incorrect Password");
    }

    user = await User.findById(user.id);
    if (!user) {
      return sendResponse(res, 400, "User does not exist in the database");
    } else {
      let authenticated = false;
      if (
        !!req.body.password &&
        (await bcrypt.compare(req.body.password, user.password))
      ) {
        // hash matches! sign a JWT with an expiration 1 day in the future and send back to the user
        authenticated = true;
      }
      if (!authenticated) {
        return sendResponse(res, 400, "Incorrect Password");
      }
      const securityQuestionsResponse = await getSecurityQuestions();
      if (!securityQuestionsResponse.success) {
        return sendResponse(res, 500, "Security question unable to set");
      }
      const question =
        securityQuestionsResponse.securityQuestions[req.body.questionIdx];
      if (!question || !req.body.answer) {
        return sendResponse(
          res,
          400,
          "user entered wrong security question or no answer"
        );
      }
      await User.update(
        { _id: user._id },

        {
          question: question,
          answer: req.body.answer.toLowerCase().replace(/\s/g, "")
        }
      );
      return sendResponse(res, 200, "Succesfully added the security question");
    }
  })
);

module.exports = router;
