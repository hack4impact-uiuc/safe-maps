var router = require("express").Router();

router.use("/", require("./login"));
router.use("/", require("./register"));
router.use("/", require("./getSecurityQuestion"));
router.use("/", require("./passwordReset"));
router.use("/", require("./forgotPassword"));
router.use("/", require("./changePassword"));
router.use("/", require("./google"));
router.use("/", require("./addSecurityQuestion"));
router.use("/", require("./verifyEmail"));
router.use("/", require("./roles"));
router.use("/", require("./rolesChange"));
router.use("/", require("./verify"));
router.use("/", require("./resendVerificationEmail"));
router.use("/", require("./getSecurityQuestionForUser"));
router.use("/", require("./getUser"));

module.exports = router;
