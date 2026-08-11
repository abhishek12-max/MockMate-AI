const express = require("express");

const {
  uploadResumeController,
} = require("../controllers/resume.controller");

const authMiddleware = require("../middleware/auth.middleware");
const uploadResume = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  uploadResume.single("resume"),
  uploadResumeController
);

module.exports = router;