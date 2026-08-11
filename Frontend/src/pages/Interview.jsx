import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const Interview = () => {
  const { interviewId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Questions interview setup se aa rahe hain
  const questions = location.state?.questions || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [startingQuestion, setStartingQuestion] =
    useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // CURRENT QUESTION
  // ==========================================

  const question = questions[currentQuestion];

  // ==========================================
  // GET QUESTION ID
  // ==========================================

  const getQuestionId = () => {
    if (!question) return null;

    return (
      question?._id ||
      question?.id ||
      question?.questionId ||
      null
    );
  };

  // ==========================================
  // START CURRENT QUESTION
  // ==========================================

  useEffect(() => {
    const startCurrentQuestion = async () => {
      if (!question || !interviewId) {
        return;
      }

      const questionId = getQuestionId();

      if (!questionId) {
        console.error(
          "QUESTION ID NOT FOUND:",
          question
        );

        setError("Question ID not found.");

        return;
      }

      try {
        setStartingQuestion(true);
        setError("");

        console.log(
          "STARTING QUESTION:",
          questionId
        );

        const response = await api.post(
          `/interviews/${interviewId}/questions/${questionId}/start`
        );

        console.log(
          "QUESTION STARTED:",
          response.data
        );
      } catch (error) {
        console.error(
          "START QUESTION ERROR:",
          error.response?.data || error
        );

        setError(
          error.response?.data?.message ||
            "Unable to start this question."
        );
      } finally {
        setStartingQuestion(false);
      }
    };

    startCurrentQuestion();

  }, [currentQuestion, interviewId]);

  // ==========================================
  // SUBMIT ANSWER
  // ==========================================

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError("Please enter your answer.");

      return;
    }

    const questionId = getQuestionId();

    if (!questionId) {
      setError("Question ID not found.");

      console.error(
        "QUESTION ID NOT FOUND:",
        question
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      console.log(
        "INTERVIEW ID:",
        interviewId
      );

      console.log(
        "QUESTION:",
        question
      );

      console.log(
        "QUESTION ID:",
        questionId
      );

      console.log(
        "SUBMITTING ANSWER..."
      );

      const response = await api.post(
        `/interviews/${interviewId}/questions/${questionId}/answer`,
        {
          answer: answer.trim(),
        }
      );

      console.log(
        "ANSWER EVALUATION:",
        response.data
      );

      const result =
        response.data?.evaluation ||
        response.data?.result ||
        response.data;

      setEvaluation(result);

    } catch (error) {
      console.error(
        "ANSWER ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to evaluate your answer."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // NEXT QUESTION
  // ==========================================

 const handleNext = async () => {
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion((previous) => previous + 1);

    setAnswer("");
    setEvaluation(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  // ==============================
  // COMPLETE INTERVIEW
  // ==============================

  try {
    setLoading(true);
    setError("");

    console.log("COMPLETING INTERVIEW...");

    const response = await api.post(
      `/interviews/${interviewId}/complete`
    );

    console.log(
      "INTERVIEW COMPLETED:",
      response.data
    );

    navigate(
      `/interviews/${interviewId}/report`
    );

  } catch (error) {
    console.error(
      "COMPLETE INTERVIEW ERROR:",
      error.response?.data || error
    );

    setError(
      error.response?.data?.message ||
        "Unable to complete interview."
    );
  } finally {
    setLoading(false);
  }
};

  // ==========================================
  // NO QUESTIONS
  // ==========================================

  if (!questions.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">

        <div className="text-center">

          <p className="text-sm text-gray-500">
            No interview questions found.
          </p>

          <button
            onClick={() =>
              navigate("/interviews/setup")
            }
            className="mt-5 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Back to Interview Setup
          </button>

        </div>

      </main>
    );
  }

  // ==========================================
  // QUESTION TEXT
  // ==========================================

  const questionText =
    typeof question === "string"
      ? question
      : question?.question ||
        question?.text ||
        "Interview question";

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex items-center justify-between border-b border-white/10 pb-6">

          <div>

            <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
              MockMate AI
            </p>

            <h1 className="mt-2 text-xl font-semibold">
              AI Interview
            </h1>

          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2">

            <span className="text-sm text-gray-400">
              Question
            </span>

            <span className="ml-2 text-sm font-semibold">
              {currentQuestion + 1}/
              {questions.length}
            </span>

          </div>

        </div>

        {/* =====================================
            PROGRESS BAR
        ===================================== */}

        <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full bg-white transition-all duration-500"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />

        </div>

        {/* =====================================
            QUESTION CARD
        ===================================== */}

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          {/* Question Number */}

          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            Question {currentQuestion + 1}
          </p>

          {/* Question */}

          <h2 className="mt-5 text-2xl font-semibold leading-relaxed sm:text-3xl">
            {questionText}
          </h2>

          {/* Difficulty */}

          {typeof question === "object" &&
            question?.difficulty && (
              <div className="mt-4">

                <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs capitalize text-gray-400">
                  {question.difficulty}
                </span>

              </div>
            )}

          {/* ===================================
              STARTING QUESTION
          =================================== */}

          {startingQuestion && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">

              <p className="text-sm text-gray-500">
                Preparing question...
              </p>

            </div>
          )}

          {/* ===================================
              ANSWER
          =================================== */}

          <div className="mt-8">

            <label className="text-sm font-medium text-gray-300">
              Your Answer
            </label>

            <textarea
              value={answer}
              onChange={(event) =>
                setAnswer(event.target.value)
              }
              placeholder="Type your answer here..."
              rows={8}
              disabled={
                loading ||
                startingQuestion ||
                !!evaluation
              }
              className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-gray-700 transition focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </div>

          {/* ===================================
              ERROR
          =================================== */}

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">

              <p className="text-sm text-red-400">
                {error}
              </p>

            </div>
          )}

          {/* ===================================
              SUBMIT BUTTON
          =================================== */}

          {!evaluation && (
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                startingQuestion
              }
              className="mt-5 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Evaluating Answer..."
                : startingQuestion
                ? "Starting Question..."
                : "Submit Answer →"}
            </button>
          )}

        </section>

        {/* =====================================
            AI EVALUATION
        ===================================== */}

        {evaluation && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            {/* Evaluation Header */}

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  AI Evaluation
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Feedback on your answer
                </h2>

              </div>

              {/* Score */}

              {evaluation.score !==
                undefined && (
                <div className="min-w-[80px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center">

                  <p className="text-2xl font-bold">
                    {evaluation.score}
                  </p>

                  <p className="text-xs text-gray-500">
                    Score
                  </p>

                </div>
              )}

            </div>

            {/* =================================
                FEEDBACK
            ================================= */}

            {evaluation.feedback && (
              <div className="mt-6">

                <p className="text-sm font-medium text-gray-300">
                  Feedback
                </p>

                <p className="mt-2 text-sm leading-7 text-gray-500">
                  {evaluation.feedback}
                </p>

              </div>
            )}

            {/* =================================
                STRENGTHS
            ================================= */}

            {evaluation.strengths?.length >
              0 && (
              <div className="mt-6">

                <p className="text-sm font-medium text-gray-300">
                  Strengths
                </p>

                <ul className="mt-3 space-y-2">

                  {evaluation.strengths.map(
                    (strength, index) => (
                      <li
                        key={index}
                        className="text-sm leading-6 text-gray-500"
                      >
                        <span className="mr-2 text-gray-300">
                          ✓
                        </span>

                        {strength}
                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

            {/* =================================
                IMPROVEMENTS
            ================================= */}

            {evaluation.improvements
              ?.length > 0 && (
              <div className="mt-6">

                <p className="text-sm font-medium text-gray-300">
                  Areas to Improve
                </p>

                <ul className="mt-3 space-y-2">

                  {evaluation.improvements.map(
                    (
                      improvement,
                      index
                    ) => (
                      <li
                        key={index}
                        className="text-sm leading-6 text-gray-500"
                      >
                        <span className="mr-2 text-gray-400">
                          •
                        </span>

                        {improvement}
                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

            {/* =================================
                NEXT QUESTION
            ================================= */}

            <button
              onClick={handleNext}
              className="mt-8 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
              {currentQuestion <
              questions.length - 1
                ? "Next Question →"
                : "Finish Interview →"}
            </button>

          </section>
        )}

      </div>

    </main>
  );
};

export default Interview;