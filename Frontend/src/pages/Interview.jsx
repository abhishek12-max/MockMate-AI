import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const Interview = () => {
  const { interviewId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ==========================================
  // QUESTIONS
  // ==========================================

  const questions = location.state?.questions || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [startingQuestion, setStartingQuestion] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // VOICE STATES
  // ==========================================

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ==========================================
  // VOICE REFS
  // ==========================================

  const recognitionRef = useRef(null);

  const shouldKeepListeningRef = useRef(false);

  const transcriptRef = useRef("");

  const restartTimeoutRef = useRef(null);

  // ==========================================
  // CURRENT QUESTION
  // ==========================================

  const question = questions[currentQuestion];

  // ==========================================
  // QUESTION ID
  // ==========================================

  const getQuestionId = () => {
    if (!question) {
      return null;
    }

    return (
      question?._id ||
      question?.id ||
      question?.questionId ||
      null
    );
  };

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
  // SPEECH RECOGNITION
  // ==========================================

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  const speechSupported = !!SpeechRecognition;

  // ==========================================
  // START QUESTION
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
  // STOP SPEAKING
  // ==========================================

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  // ==========================================
  // SPEAK QUESTION
  // ==========================================

  const speakQuestion = () => {
    if (!("speechSynthesis" in window)) {
      setError(
        "Voice playback is not supported in this browser."
      );

      return;
    }

    stopSpeaking();

    const utterance =
      new SpeechSynthesisUtterance(questionText);

    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // ==========================================
  // AUTO SPEAK QUESTION
  // ==========================================

  useEffect(() => {
    if (!questionText) {
      return;
    }

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const timer = setTimeout(() => {
      const utterance =
        new SpeechSynthesisUtterance(questionText);

      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }, 300);

    return () => {
      clearTimeout(timer);

      window.speechSynthesis.cancel();

      setIsSpeaking(false);
    };
  }, [currentQuestion, questionText]);

  // ==========================================
  // START RECOGNITION INSTANCE
  // ==========================================

  const startRecognition = () => {
    if (!speechSupported) {
      setError(
        "Voice input is not supported in this browser. Please use Chrome or Edge."
      );

      return;
    }

    if (!shouldKeepListeningRef.current) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    // ========================================
    // RECOGNITION START
    // ========================================

    recognition.onstart = () => {
      setIsListening(true);

      setError("");

      console.log("VOICE LISTENING STARTED");
    };

    // ========================================
    // RECOGNITION RESULT
    // ========================================

    recognition.onresult = (event) => {
      let finalTranscript = "";

      let interimTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const transcript =
          event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // ======================================
      // APPEND FINAL TEXT
      // ======================================

      if (finalTranscript.trim()) {
        transcriptRef.current =
          `${transcriptRef.current} ${finalTranscript}`.trim();
      }

      // ======================================
      // SHOW FINAL + CURRENT INTERIM TEXT
      // ======================================

      setAnswer(
        `${transcriptRef.current} ${interimTranscript}`.trim()
      );
    };

    // ========================================
    // RECOGNITION ERROR
    // ========================================

    recognition.onerror = (event) => {
      console.error(
        "VOICE INPUT ERROR:",
        event.error
      );

      // --------------------------------------
      // Ignore errors caused by automatic
      // browser restart
      // --------------------------------------

      if (
        event.error === "aborted" ||
        event.error === "no-speech"
      ) {
        return;
      }

      if (event.error === "not-allowed") {
        shouldKeepListeningRef.current = false;

        setIsListening(false);

        setError(
          "Microphone permission was denied. Please allow microphone access."
        );

        return;
      }

      if (event.error === "audio-capture") {
        setError(
          "Microphone could not be accessed. Please check your microphone."
        );

        return;
      }

      setError(
        "Unable to capture your voice. Please try again."
      );
    };

    // ========================================
    // RECOGNITION END
    // ========================================

    recognition.onend = () => {
      console.log("VOICE LISTENING ENDED");

      recognitionRef.current = null;

      // ======================================
      // IMPORTANT
      //
      // Browser can automatically stop
      // recognition after silence.
      //
      // If user still wants voice mode,
      // automatically restart it.
      // ======================================

      if (shouldKeepListeningRef.current) {
        restartTimeoutRef.current =
          setTimeout(() => {
            startRecognition();
          }, 150);
      } else {
        setIsListening(false);
      }
    };

    // ========================================
    // START
    // ========================================

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "RECOGNITION START ERROR:",
        error
      );

      recognitionRef.current = null;

      if (
        shouldKeepListeningRef.current
      ) {
        restartTimeoutRef.current =
          setTimeout(() => {
            startRecognition();
          }, 300);
      }
    }
  };

  // ==========================================
  // START CONTINUOUS VOICE INPUT
  // ==========================================

  const startListening = () => {
    if (!speechSupported) {
      setError(
        "Voice input is not supported in this browser. Please use Chrome or Edge."
      );

      return;
    }

    if (loading || startingQuestion || evaluation) {
      return;
    }

    stopSpeaking();

    setError("");

    // ========================================
    // CLEAR PREVIOUS ANSWER
    // ========================================

    transcriptRef.current = "";

    setAnswer("");

    // ========================================
    // KEEP LISTENING
    // ========================================

    shouldKeepListeningRef.current = true;

    // ========================================
    // START
    // ========================================

    startRecognition();
  };

  // ==========================================
  // STOP CONTINUOUS VOICE INPUT
  // ==========================================

  const stopListening = () => {
    console.log("STOPPING VOICE INPUT");

    // ========================================
    // IMPORTANT
    // Don't restart after this.
    // ========================================

    shouldKeepListeningRef.current = false;

    // ========================================
    // Clear pending restart
    // ========================================

    if (restartTimeoutRef.current) {
      clearTimeout(
        restartTimeoutRef.current
      );

      restartTimeoutRef.current = null;
    }

    // ========================================
    // Stop recognition
    // ========================================

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error(
          "STOP RECOGNITION ERROR:",
          error
        );
      }

      recognitionRef.current = null;
    }

    setIsListening(false);
  };

  // ==========================================
  // TOGGLE VOICE
  // ==========================================

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // ==========================================
  // SUBMIT ANSWER
  // ==========================================

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError(
        "Please enter or speak your answer."
      );

      return;
    }

    stopListening();

    stopSpeaking();

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
        "QUESTION ID:",
        questionId
      );

      console.log(
        "ANSWER:",
        answer
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
    stopListening();

    stopSpeaking();

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) => previous + 1
      );

      setAnswer("");

      transcriptRef.current = "";

      setEvaluation(null);

      setError("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    // ========================================
    // COMPLETE INTERVIEW
    // ========================================

    try {
      setLoading(true);

      setError("");

      console.log(
        "COMPLETING INTERVIEW..."
      );

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
  // CLEANUP
  // ==========================================

  useEffect(() => {
    return () => {
      shouldKeepListeningRef.current = false;

      if (restartTimeoutRef.current) {
        clearTimeout(
          restartTimeoutRef.current
        );
      }

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error(error);
        }
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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
  // UI
  // ==========================================

  return (
    <main className="min-h-screen bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-4xl">

        {/* ====================================
            HEADER
        ==================================== */}

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

        {/* ====================================
            PROGRESS BAR
        ==================================== */}

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

        {/* ====================================
            QUESTION CARD
        ==================================== */}

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
            Question {currentQuestion + 1}
          </p>

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

          {/* ==================================
              QUESTION VOICE
          ================================== */}

          <div className="mt-6 flex flex-wrap items-center gap-3">

            <button
              type="button"
              onClick={speakQuestion}
              disabled={startingQuestion}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-gray-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >

              <span>
                {isSpeaking
                  ? "🔊"
                  : "🔈"}
              </span>

              {isSpeaking
                ? "Speaking..."
                : "Hear Question"}

            </button>

            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-500 transition hover:border-white/20 hover:text-white"
              >
                Stop
              </button>
            )}

          </div>

          {/* ==================================
              STARTING QUESTION
          ================================== */}

          {startingQuestion && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">

              <p className="text-sm text-gray-500">
                Preparing question...
              </p>

            </div>
          )}

          {/* ==================================
              ANSWER
          ================================== */}

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <label className="text-sm font-medium text-gray-300">
                Your Answer
              </label>

              {speechSupported && (
                <span className="text-xs text-gray-600">
                  Voice input available
                </span>
              )}

            </div>

            <textarea
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value);

                // If user manually types,
                // keep transcript in sync.
                if (!isListening) {
                  transcriptRef.current =
                    event.target.value;
                }
              }}
              placeholder={
                isListening
                  ? "Listening... speak your answer"
                  : "Type your answer or use the microphone..."
              }
              rows={8}
              disabled={
                loading ||
                startingQuestion ||
                !!evaluation
              }
              className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-6 text-white outline-none placeholder:text-gray-700 transition focus:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
            />

          </div>

          {/* ==================================
              VOICE INPUT
          ================================== */}

          {!evaluation && (
            <div className="mt-4">

              <button
                type="button"
                onClick={toggleListening}
                disabled={
                  loading ||
                  startingQuestion
                }
                className={`flex w-full items-center justify-center gap-3 rounded-xl border px-6 py-3.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                  isListening
                    ? "border-white/30 bg-white text-black"
                    : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/20 hover:text-white"
                }`}
              >

                <span className="text-lg">
                  {isListening
                    ? "⏹"
                    : "🎤"}
                </span>

                {isListening
                  ? "Stop Listening"
                  : "Answer with Voice"}

              </button>

              {!speechSupported && (
                <p className="mt-2 text-center text-xs text-gray-600">
                  Voice input works best in Chrome or Edge.
                </p>
              )}

              {isListening && (
                <p className="mt-3 text-center text-xs text-gray-500">
                  Listening continuously... You can pause while speaking.
                </p>
              )}

            </div>
          )}

          {/* ==================================
              ERROR
          ================================== */}

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">

              <p className="text-sm text-red-400">
                {error}
              </p>

            </div>
          )}

          {/* ==================================
              SUBMIT
          ================================== */}

          {!evaluation && (
            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                startingQuestion ||
                isListening
              }
              className="mt-5 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {loading
                ? "Evaluating Answer..."
                : startingQuestion
                ? "Starting Question..."
                : isListening
                ? "Stop Listening to Submit"
                : "Submit Answer →"}

            </button>
          )}

        </section>

        {/* ====================================
            AI EVALUATION
        ==================================== */}

        {evaluation && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  AI Evaluation
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Feedback on your answer
                </h2>

              </div>

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

            {/* Feedback */}

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

            {/* Strengths */}

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

            {/* Improvements */}

            {evaluation.improvements?.length >
              0 && (
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

            {/* Next */}

            <button
              onClick={handleNext}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
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