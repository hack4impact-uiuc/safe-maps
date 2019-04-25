const router = require("express").Router();
const { check, validationResult } = require("express-validator/check");
const { sendResponse } = require("./../utils/sendResponse");
const { getSecurityQuestions } = require("../utils/getConfigFile");

router.get(
  "/getSecurityQuestions",
  check("token")
    .isString()
    .isLength({ min: 1 }),
  async function(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, 400, "Invalid request", {
        errors: errors.array({ onlyFirstError: true })
      });
    }
    const questionsResponse = await getSecurityQuestions();
    if (!questionsResponse.success) {
      return sendResponse(
        res,
        500,
        "No security question could be parsed from config file"
      );
    } else {
      return res.status(200).send({
        questions: questionsResponse.securityQuestions
      });
    }
  }
);

module.exports = router;
