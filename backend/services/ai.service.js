const ai = require("../config/ai");

const generateInterviewQuestions = async ({
  role,
  experienceLevel,
  interviewType,
  totalQuestions,
}) => {
  const difficultyPattern =
    totalQuestions === 5
      ? ["easy", "easy", "medium", "hard", "hard"]
      : ["easy", "easy", "medium", "hard", "hard", "hard"];

  const prompt = `
You are an expert technical interviewer.

Generate ${totalQuestions} interview questions for:

Role: ${role}
Experience Level: ${experienceLevel}
Interview Type: ${interviewType}

Difficulty pattern must be exactly:
${difficultyPattern.join(", ")}

Return ONLY valid JSON.

Format:
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
- Do not provide answers.
- Do not provide explanations.
- Do not use markdown.
- Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};


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
- score must be a number between 0 and 10.
- Do not give half-point restrictions; decimals like 7.5 are allowed.
- Feedback should be specific to the answer.
- Strengths should contain genuine strengths.
- Improvements should contain actionable improvements.
- Do not include markdown.
- Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

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

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};

module.exports = {
  generateInterviewQuestions,
  evaluateAnswer,
  generateInterviewReport
};