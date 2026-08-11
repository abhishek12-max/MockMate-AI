const resumeModel = require("../models/resume.model");

const { uploadResume } = require("../services/imagekit.service");

const { extractResumeText } = require("../services/resume.service");

const { parseResume } = require("../services/ai.service");

const uploadResumeController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required",
      });
    }

    const existingResume = await resumeModel.findOne({
      user: req.user.id,
    });

    const uploadedFile = await uploadResume(req.file);

    const rawText = await extractResumeText(req.file.buffer);

    const parsedResume = await parseResume(rawText);

    const resumeData = {
      user: req.user.id,
      fileName: req.file.originalname,
      fileUrl: uploadedFile.fileUrl,
      rawText,
      skills: parsedResume.skills,
      projects: parsedResume.projects,
      experience: parsedResume.experience,
      education: parsedResume.education,
    };

    let resume;

    if (existingResume) {
      existingResume.fileName = resumeData.fileName;
      existingResume.fileUrl = resumeData.fileUrl;
      existingResume.rawText = resumeData.rawText;
      existingResume.skills = resumeData.skills;
      existingResume.projects = resumeData.projects;
      existingResume.experience = resumeData.experience;
      existingResume.education = resumeData.education;

      resume = await existingResume.save();
    } else {
      resume = await resumeModel.create(resumeData);
    }

    return res.status(existingResume ? 200 : 201).json({
      success: true,
      message: existingResume
        ? "Resume analyzed and updated successfully"
        : "Resume uploaded and analyzed successfully",
      resume,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadResumeController,
};