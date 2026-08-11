const express = require("express");

const {
  createInterview,
  submitAnswer,
  getInterview,
  completeInterview,
  getInterviewReport,
  getInterviewHistory,
  trackInterviewActivity,
  startQuestion,
} = require("../controllers/interview.controller");

const {
  createInterviewValidator,
  submitAnswerValidator,
} = require("../validators/interview.validator");

const validate = require("../middleware/validation.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


// ======================================
// CREATE INTERVIEW
// ======================================

router.post(
  "/",
  authMiddleware,
  createInterviewValidator,
  validate,
  createInterview
);


// ======================================
// INTERVIEW HISTORY
// IMPORTANT:
// This MUST come BEFORE /:interviewId
// ======================================

router.get(
  "/history",
  authMiddleware,
  getInterviewHistory
);


// ======================================
// GET INTERVIEW REPORT
// ======================================

router.get(
  "/:interviewId/report",
  authMiddleware,
  getInterviewReport
);


// ======================================
// START QUESTION
// ======================================

router.post(
  "/:interviewId/questions/:questionId/start",
  authMiddleware,
  startQuestion
);


// ======================================
// SUBMIT ANSWER
// ======================================

router.post(
  "/:interviewId/questions/:questionId/answer",
  authMiddleware,
  submitAnswerValidator,
  validate,
  submitAnswer
);


// ======================================
// COMPLETE INTERVIEW
// ======================================

router.post(
  "/:interviewId/complete",
  authMiddleware,
  completeInterview
);


// ======================================
// TRACK INTERVIEW ACTIVITY
// ======================================

router.post(
  "/:interviewId/activity",
  authMiddleware,
  trackInterviewActivity
);


// ======================================
// GET SINGLE INTERVIEW
// IMPORTANT:
// Keep this AFTER /history
// ======================================

router.get(
  "/:interviewId",
  authMiddleware,
  getInterview
);


module.exports = router;