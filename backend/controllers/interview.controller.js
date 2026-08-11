const interviewModel = require("../models/interview.model");
const questionModel = require("../models/question.model");
const resumeModel = require("../models/resume.model");
const {
  generateInterviewQuestions,
  evaluateAnswer,
  generateInterviewReport,
} = require("../services/ai.service");

// Create Interview
const createInterview = async (req, res, next) => {
  try {
    const {
      role,
      experienceLevel,
      interviewType,
      totalQuestions,
    } = req.body;

    const resume = await resumeModel.findOne({
      user: req.user.id,
    });

    const interview = await interviewModel.create({
      user: req.user.id,
      resume: resume ? resume._id : null,
      role,
      experienceLevel,
      interviewType,
      totalQuestions,
      status: "created",
    });

    const aiResponse = await generateInterviewQuestions({
      role,
      experienceLevel,
      interviewType,
      totalQuestions,
      resume,
    });

    const questions = await questionModel.insertMany(
      aiResponse.questions.map((item) => ({
        interview: interview._id,
        question: item.question,
        difficulty: item.difficulty,
      }))
    );

    interview.questions = questions.map(
      (question) => question._id
    );

    await interview.save();

    return res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interviewId: interview._id,
      questions,
    });
  } catch (error) {
    next(error);
  }
};

// Start Question
const startQuestion = async (req, res, next) => {
  try {
    const { interviewId, questionId } = req.params;

    const interview = await interviewModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const question = await questionModel.findOne({
      _id: questionId,
      interview: interviewId,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    if (question.startedAt) {
      return res.status(400).json({
        success: false,
        message: "Question has already been started",
      });
    }

    question.startedAt = new Date();

    await question.save();

    if (interview.status === "created") {
      interview.status = "in-progress";
      interview.startedAt = new Date();

      await interview.save();
    }

    return res.status(200).json({
      success: true,
      message: "Question started successfully",
      startedAt: question.startedAt,
    });
  } catch (error) {
    next(error);
  }
};

// Submit Answer
const submitAnswer = async (req, res, next) => {
  try {
    const { interviewId, questionId } = req.params;
    const { answer } = req.body;

    const interview = await interviewModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const question = await questionModel.findOne({
      _id: questionId,
      interview: interviewId,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    if (question.answer) {
      return res.status(400).json({
        success: false,
        message: "Answer already submitted",
      });
    }

    if (!question.startedAt) {
      return res.status(400).json({
        success: false,
        message: "Question has not been started",
      });
    }

    const evaluation = await evaluateAnswer({
      role: interview.role,
      question: question.question,
      difficulty: question.difficulty,
      answer,
    });

    question.answer = answer;
    question.score = evaluation.score;
    question.feedback = evaluation.feedback;
    question.strengths = evaluation.strengths;
    question.improvements = evaluation.improvements;
    question.submittedAt = new Date();

    await question.save();

    return res.status(200).json({
      success: true,
      message: "Answer evaluated successfully",
      evaluation: {
        score: question.score,
        feedback: question.feedback,
        strengths: question.strengths,
        improvements: question.improvements,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Interview
const getInterview = async (req, res, next) => {
  try {
    const { interviewId } = req.params;

    const interview = await interviewModel
      .findOne({
        _id: interviewId,
        user: req.user.id,
      })
      .populate({
        path: "questions",
        select:
          "question difficulty answer score feedback strengths improvements startedAt submittedAt",
      });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    next(error);
  }
};

// Complete Interview
const completeInterview = async (req, res, next) => {
  try {
    const { interviewId } = req.params;

    const interview = await interviewModel
      .findOne({
        _id: interviewId,
        user: req.user.id,
      })
      .populate("questions");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Interview is already completed",
      });
    }

    const unansweredQuestions = interview.questions.filter(
      (question) => !question.answer
    );

    if (unansweredQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Please answer all questions before completing the interview",
        remainingQuestions: unansweredQuestions.length,
      });
    }

    const report = await generateInterviewReport({
      role: interview.role,
      experienceLevel: interview.experienceLevel,
      questions: interview.questions,
    });

    interview.overallScore = report.overallScore;
    interview.readinessScore = report.readinessScore;
    interview.strengths = report.strengths;
    interview.weaknesses = report.weaknesses;
    interview.skillGaps = report.skillGaps;

    interview.status = "completed";
    interview.completedAt = new Date();

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview completed successfully",
      report: {
        overallScore: interview.overallScore,
        readinessScore: interview.readinessScore,
        strengths: interview.strengths,
        weaknesses: interview.weaknesses,
        skillGaps: interview.skillGaps,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Interview History
const getInterviewHistory = async (req, res, next) => {
  try {
    const interviews = await interviewModel
      .find({
        user: req.user.id,
      })
      .select(
        "role experienceLevel interviewType totalQuestions overallScore readinessScore status completedAt createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    next(error);
  }
};

// Anti-Cheating Activity
const trackInterviewActivity = async (req, res, next) => {
  try {
    const { interviewId } = req.params;
    const { type } = req.body;

    const allowedActivities = [
      "tab-switch",
      "fullscreen-exit",
    ];

    if (!allowedActivities.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid activity type",
      });
    }

    const interview = await interviewModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    if (interview.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Interview is already completed",
      });
    }

    if (type === "tab-switch") {
      interview.antiCheating.tabSwitches += 1;
    }

    if (type === "fullscreen-exit") {
      interview.antiCheating.fullscreenExits += 1;
    }

    const totalSuspiciousActivities =
      interview.antiCheating.tabSwitches +
      interview.antiCheating.fullscreenExits;

    if (totalSuspiciousActivities >= 3) {
      interview.antiCheating.suspiciousActivity = true;
    }

    await interview.save();

    return res.status(200).json({
      success: true,
      message: "Interview activity recorded",
    });
  } catch (error) {
    next(error);
  }
};

const getInterviewReport = async (req, res, next) => {
  try {
    const { interviewId } = req.params;

    const interview = await interviewModel
      .findOne({
        _id: interviewId,
        user: req.user.id,
        status: "completed",
      })
      .populate({
        path: "questions",
        select:
          "question difficulty answer score feedback strengths improvements startedAt submittedAt",
      });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Completed interview report not found",
      });
    }

    return res.status(200).json({
      success: true,
      report: {
        interviewId: interview._id,
        role: interview.role,
        experienceLevel: interview.experienceLevel,
        interviewType: interview.interviewType,
        totalQuestions: interview.totalQuestions,

        overallScore: interview.overallScore,
        readinessScore: interview.readinessScore,

        strengths: interview.strengths,
        weaknesses: interview.weaknesses,
        skillGaps: interview.skillGaps,

        status: interview.status,
        completedAt: interview.completedAt,

        questions: interview.questions,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInterview,
  startQuestion,
  submitAnswer,
  getInterview,
  completeInterview,
  getInterviewReport,
  getInterviewHistory,
  trackInterviewActivity,
  
};