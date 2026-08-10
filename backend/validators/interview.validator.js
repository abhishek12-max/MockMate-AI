const { body } = require("express-validator");

const createInterviewValidator = [
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required"),

  body("experienceLevel")
    .trim()
    .notEmpty()
    .withMessage("Experience level is required")
    .isIn(["fresher", "junior", "mid", "senior"])
    .withMessage("Invalid experience level"),

  body("interviewType")
    .optional()
    .isIn(["technical", "behavioral", "mixed"])
    .withMessage("Invalid interview type"),

  body("totalQuestions")
    .notEmpty()
    .withMessage("Total questions is required")
    .isInt({ min: 5, max: 6 })
    .withMessage("Total questions must be 5 or 6"),
];

const submitAnswerValidator = [
  body("answer")
    .trim()
    .notEmpty()
    .withMessage("Answer is required")
    .isLength({ min: 2 })
    .withMessage("Answer must be at least 2 characters"),
];

module.exports = {
  createInterviewValidator,
  submitAnswerValidator
};