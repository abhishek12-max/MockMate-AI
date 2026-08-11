const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    projects: {
      type: [
        {
          name: {
            type: String,
            trim: true,
          },

          description: {
            type: String,
            trim: true,
          },

          technologies: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
    },

    experience: {
      type: [
        {
          company: {
            type: String,
            trim: true,
          },

          role: {
            type: String,
            trim: true,
          },

          description: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },

    education: {
      type: [
        {
          degree: {
            type: String,
            trim: true,
          },

          institution: {
            type: String,
            trim: true,
          },
        },
      ],
      default: [],
    },

    rawText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);