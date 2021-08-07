const express = require("express");
const router = express.Router();
const { signup } = require("../../controller/admin/auth");
const { signin, signout } = require("../../controller/admin/auth");
const { requireSignin } = require("../../common-middleware/index");
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require("../../validators/auth");

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/admin/signout", requireSignin, signout);

module.exports = router;
