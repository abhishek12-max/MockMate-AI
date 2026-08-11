const imagekit = require("../config/imagekit");

const uploadResume = async (file) => {
  const base64File = file.buffer.toString("base64");

  const response = await imagekit.files.upload({
    file: base64File,
    fileName: file.originalname,
    folder: "/mockmate/resumes",
  });

  return {
    fileId: response.fileId,
    fileUrl: response.url,
  };
};

module.exports = {
  uploadResume,
};