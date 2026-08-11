const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Resume",
  default: null,
},

    role: {
      type: String,
      required: true,
      trim: true,
    },

    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
      required: true,
    },

    interviewType: {
      type: String,
      enum: ["technical", "behavioral", "mixed"],
      default: "mixed",
    },

    totalQuestions: {
      type: Number,
      enum: [5, 6],
      required: true,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    overallScore: {
      type: Number,
      default: null,
      min: 0,
      max: 10,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    skillGaps: {
      type: [String],
      default: [],
    },

    readinessScore: {
      type: Number,
      default: null,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["created", "in-progress", "completed", "abandoned"],
      default: "created",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    antiCheating: {
  tabSwitches: {
    type: Number,
    default: 0,
  },

  fullscreenExits: {
    type: Number,
    default: 0,
  },

  suspiciousActivity: {
    type: Boolean,
    default: false,
  },
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);