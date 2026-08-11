import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resumeData, setResumeData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setMessage("");
    setError("");

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const formData = new FormData();

      formData.append("resume", file);

      const response = await api.post(
        "/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("RESUME UPLOAD:", response.data);

      setResumeData(response.data.resume);

      setMessage(
        response.data?.message ||
          "Resume uploaded and analyzed successfully."
      );

      setFile(null);
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Resume upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-600">
            Resume
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Upload your resume
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Upload your PDF resume and let MockMate AI analyze your
            skills, projects, education, and experience.
          </p>

        </div>

        {/* Upload Card */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">

          <label
            htmlFor="resume-upload"
            className="flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-6 text-center transition hover:border-white/30 hover:bg-white/[0.02]"
          >

            {/* Upload Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
              ↑
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              Upload your resume
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              PDF files only
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Click anywhere to choose a file
            </p>

            {file && (
              <div className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-2">

                <p className="text-sm text-gray-300">
                  {file.name}
                </p>

               <p className="mt-1 text-xs text-gray-600">
                {file.size < 1024 * 1024
            ? `${(file.size / 1024).toFixed(1)} KB`
            : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
             </p>

              </div>
            )}

          </label>

          <input
            id="resume-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Success Message */}
          {message && (
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">

              <p className="text-sm text-gray-300">
                {message}
              </p>

            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">

              <p className="text-sm text-red-400">
                {error}
              </p>

            </div>
          )}

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || loading}
            className="mt-5 w-full rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Uploading & Analyzing..." : "Upload Resume"}
          </button>

        </section>

        {/* Resume Analysis */}
        {resumeData && (
          <section className="mt-12 space-y-6">

            {/* Analysis Header */}
            <div>

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-600">
                Resume Analysis
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Your resume is ready.
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                MockMate AI extracted the following information from
                your resume.
              </p>

            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

              <h3 className="text-lg font-semibold">
                Skills
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">

                {resumeData.skills?.length > 0 ? (
                  resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300"
                    >
                      {typeof skill === "string"
                        ? skill
                        : skill.name || skill.skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No skills detected.
                  </p>
                )}

              </div>

            </div>

            {/* Projects */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

              <h3 className="text-lg font-semibold">
                Projects
              </h3>

              <div className="mt-5 space-y-4">

                {resumeData.projects?.length > 0 ? (
                  resumeData.projects.map((project, index) => (
                    <div
                      key={project._id || index}
                      className="rounded-xl border border-white/10 bg-black/20 p-5"
                    >

                      <h4 className="font-semibold text-white">
                        {project.name || "Untitled Project"}
                      </h4>

                      {project.description && (
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {project.description}
                        </p>
                      )}

                      {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">

                          {project.technologies.map(
                            (technology, technologyIndex) => (
                              <span
                                key={technologyIndex}
                                className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-400"
                              >
                                {typeof technology === "string"
                                  ? technology
                                  : technology.name || technology.technology}
                              </span>
                            )
                          )}

                        </div>
                      )}

                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No projects detected.
                  </p>
                )}

              </div>

            </div>

            {/* Education */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

              <h3 className="text-lg font-semibold">
                Education
              </h3>

              <div className="mt-5 space-y-4">

                {resumeData.education?.length > 0 ? (
                  resumeData.education.map((education, index) => (
                    <div
                      key={education._id || index}
                      className="rounded-xl border border-white/10 bg-black/20 p-5"
                    >

                      <h4 className="font-semibold">
                        {education.degree ||
                          education.course ||
                          "Education"}
                      </h4>

                      {education.institution && (
                        <p className="mt-2 text-sm text-gray-500">
                          {education.institution}
                        </p>
                      )}

                      {education.year && (
                        <p className="mt-1 text-xs text-gray-600">
                          {education.year}
                        </p>
                      )}

                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No education details detected.
                  </p>
                )}

              </div>

            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">

              <h3 className="text-lg font-semibold">
                Experience
              </h3>

              <div className="mt-5 space-y-4">

                {resumeData.experience?.length > 0 ? (
                  resumeData.experience.map((experience, index) => (
                    <div
                      key={experience._id || index}
                      className="rounded-xl border border-white/10 bg-black/20 p-5"
                    >

                      <h4 className="font-semibold">
                        {experience.role ||
                          experience.position ||
                          experience.title ||
                          "Experience"}
                      </h4>

                      {experience.company && (
                        <p className="mt-2 text-sm text-gray-500">
                          {experience.company}
                        </p>
                      )}

                      {experience.description && (
                        <p className="mt-3 text-sm leading-6 text-gray-500">
                          {experience.description}
                        </p>
                      )}

                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No professional experience detected.
                  </p>
                )}

              </div>

            </div>
               <div className="flex justify-end">
  <Link
    to="/interviews/setup"
    className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
  >
    Start Your Interview →
  </Link>
</div>
              
          </section>
        )}

      </div>

    </main>
  );
};

export default Resume;