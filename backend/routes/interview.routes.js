const express = require("express");

const {
  createInterview,
   submitAnswer,
   getInterview,
   completeInterview,
   getInterviewReport,
   getInterviewHistory,
   trackInterviewActivity,
   startQuestion
} = require("../controllers/interview.controller");

const {
  createInterviewValidator, submitAnswerValidator
} = require("../validators/interview.validator");

const validate = require("../middleware/validation.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createInterviewValidator,
  validate,
  createInterview
);


router.post(
  "/:interviewId/questions/:questionId/answer",
  authMiddleware,
  submitAnswerValidator,
  validate,
  submitAnswer
);

router.get(
  "/:interviewId",
  authMiddleware,
  getInterview
);

router.post(
  "/:interviewId/complete",
  authMiddleware,
  completeInterview
);

router.get(
  "/history",
  authMiddleware,
  getInterviewHistory
);

router.post(
  "/:interviewId/activity",
  authMiddleware,
  trackInterviewActivity
);

router.post(
  "/:interviewId/questions/:questionId/start",
  authMiddleware,
  startQuestion
);

router.get(
  "/:interviewId/report",
  authMiddleware,
  getInterviewReport
);

module.exports = router;