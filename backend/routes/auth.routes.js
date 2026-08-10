const express = require("express");

const {
  register,
  verifyOtp,
  resendOtp,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  me,
} = require("../controllers/auth.controller");

const {
  registerValidator,
  verifyOtpValidator,
  resendOtpValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth.validator");

const validate = require("../middleware/validation.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  validate,
  register
);

router.post(
  "/verify-otp",
  verifyOtpValidator,
  validate,
  verifyOtp
);

router.post(
  "/resend-otp",
  resendOtpValidator,
  validate,
  resendOtp
);

router.post(
  "/login",
  loginValidator,
  validate,
  login
);

router.post(
  "/refresh-token",
  refreshToken
);

router.post(
  "/logout",
  logout
);

router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  forgotPassword
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  resetPassword
);

router.get(
  "/me",
  authMiddleware,
  me
);

module.exports = router;