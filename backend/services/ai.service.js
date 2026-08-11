const ai = require("../config/ai");


// ==============================
// AI HELPER
// ==============================

const generateAIResponse = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Gemini Error:", error);

    const aiError = new Error(
      "AI service is temporarily unavailable. Please try again."
    );

    aiError.statusCode = 503;

    throw aiError;
  }
};


// ==============================
// AI JSON PARSER
// ==============================

const parseAIJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("AI JSON Parse Error:", error);

    const aiError = new Error(
      "AI returned an invalid response. Please try again."
    );

    aiError.statusCode = 502;

    throw aiError;
  }
};


// ==============================
// GENERATE INTERVIEW QUESTIONS
// ==============================

const generateInterviewQuestions = async ({
  role,
  experienceLevel,
  interviewType,
  totalQuestions,
  resume,
}) => {
  const difficultyPattern =
    totalQuestions === 5
      ? ["easy", "easy", "medium", "hard", "hard"]
      : ["easy", "easy", "medium", "hard", "hard", "hard"];

  const resumeContext = resume
    ? `
Candidate Resume Information:

Skills:
${resume.skills.join(", ")}

Projects:
${resume.projects
  .map(
    (project) =>
      `${project.name}: ${project.description}
Technologies: ${project.technologies.join(", ")}`
  )
  .join("\n")}

Experience:
${resume.experience
  .map(
    (experience) =>
      `${experience.role} at ${experience.company}: ${experience.description}`
  )
  .join("\n")}

Education:
${resume.education
  .map(
    (education) =>
      `${education.degree} - ${education.institution}`
  )
  .join("\n")}
`
    : "No resume information is available.";

  const prompt = `
You are an expert technical interviewer.

Generate ${totalQuestions} interview questions for:

Role: ${role}
Experience Level: ${experienceLevel}
Interview Type: ${interviewType}

${resumeContext}

Difficulty pattern:
${difficultyPattern.join(", ")}

Create a personalized interview based on the candidate's actual resume.

Return ONLY valid JSON:

{
  "questions": [
    {
      "question": "Question text",
      "difficulty": "easy"
    }
  ]
}

Rules:
- Generate exactly ${totalQuestions} questions.
- Follow the difficulty pattern exactly.
- Questions must be relevant to the selected role.
- Use the candidate's resume when relevant.
- Ask about technologies, projects, architecture, implementation decisions,
  and concepts that are actually present in the resume.
- Do not invent projects, skills, companies, or experience.
- Do not make every question resume-specific.
- Include a balanced mix of fundamentals, practical questions, and
  resume/project-based questions.
- Do not provide answers.
- Do not provide explanations.
- Do not use markdown.
- Return JSON only.
`;

  const response = await generateAIResponse(prompt);

  return parseAIJson(response.text);
};


// ==============================
// EVALUATE ANSWER
// ==============================

const evaluateAnswer = async ({
  role,
  question,
  difficulty,
  answer,
}) => {
  const prompt = `
You are an expert interviewer evaluating a candidate's interview answer.

Role: ${role}

Question:
${question}

Difficulty:
${difficulty}

Candidate's Answer:
${answer}

Evaluate the answer based on:
- Technical correctness
- Relevance
- Clarity
- Depth
- Practical understanding

Return ONLY valid JSON in exactly this format:

{
  "score": 0,
  "feedback": "Detailed feedback about the answer",
  "strengths": [
    "Strength 1"
  ],
  "improvements": [
    "Improvement 1"
  ]
}

Rules:
- score must be between 0 and 10.
- Decimals such as 7.5 are allowed.
- Feedback should be specific to the answer.
- Strengths should contain genuine strengths.
- Improvements should contain actionable improvements.
- Do not include markdown.
- Return JSON only.
`;

  const response = await generateAIResponse(prompt);

  return parseAIJson(response.text);
};


// ==============================
// FINAL INTERVIEW REPORT
// ==============================

const generateInterviewReport = async ({
  role,
  experienceLevel,
  questions,
}) => {
  const questionData = questions.map((item, index) => {
    const responseTime =
      item.startedAt && item.submittedAt
        ? Math.round(
            (new Date(item.submittedAt) -
              new Date(item.startedAt)) /
              1000
          )
        : null;

    return {
      questionNumber: index + 1,
      question: item.question,
      difficulty: item.difficulty,
      answer: item.answer,
      score: item.score,
      feedback: item.feedback,
      responseTimeInSeconds: responseTime,
    };
  });

  const prompt = `
You are an expert interview evaluator.

Candidate Role: ${role}
Experience Level: ${experienceLevel}

Analyze the complete interview below:

${JSON.stringify(questionData)}

Generate a final interview performance report.

Return ONLY valid JSON:

{
  "overallScore": 0,
  "readinessScore": 0,
  "strengths": [],
  "weaknesses": [],
  "skillGaps": []
}

Rules:
- overallScore must be between 0 and 10.
- readinessScore must be between 0 and 100.
- Base the report only on the candidate's actual answers.
- Consider answer quality, correctness, difficulty, and response time.
- Identify genuine technical strengths.
- Identify specific weaknesses.
- Skill gaps must be relevant to the candidate's role.
- Do not invent skills or experience.
- Return JSON only.
`;

  const response = await generateAIResponse(prompt);

  return parseAIJson(response.text);
};


// ==============================
// PARSE RESUME
// ==============================

const parseResume = async (rawText) => {
  const prompt = `
You are an expert resume parser.

Extract structured information from the resume below.

RESUME:

${rawText}

Return ONLY valid JSON in exactly this format:

{
  "skills": [],
  "projects": [
    {
      "name": "",
      "description": "",
      "technologies": []
    }
  ],
  "experience": [
    {
      "company": "",
      "role": "",
      "description": ""
    }
  ],
  "education": [
    {
      "degree": "",
      "institution": ""
    }
  ]
}

Rules:
- Extract only information explicitly present in the resume.
- Do NOT invent or assume information.
- Keep skills concise.
- Keep project descriptions concise but meaningful.
- Extract technologies mentioned for each project when available.
- If a section is missing, return an empty array.
- Do not include personal contact information.
- Do not include markdown.
- Return JSON only.
`;

  const response = await generateAIResponse(prompt);

  return parseAIJson(response.text);
};


// ==============================
// EXPORT
// ==============================

module.exports = {
  generateInterviewQuestions,
  evaluateAnswer,
  generateInterviewReport,
  parseResume,
};