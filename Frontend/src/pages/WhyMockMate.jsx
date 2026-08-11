import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const differences = [
  {
    title: "Resume-Aware",
    description:
      "Questions are generated around your actual skills, projects, and experience instead of generic interview questions.",
  },
  {
    title: "Project-Focused",
    description:
      "Prepare to explain the projects that are actually listed on your resume.",
  },
  {
    title: "AI Evaluation",
    description:
      "Understand not only whether your answer is correct, but also how you can communicate it better.",
  },
  {
    title: "Personalized Improvement",
    description:
      "MockMate identifies your weaknesses and skill gaps so your preparation has a clear direction.",
  },
];

const WhyMockMate = () => {
  return (
    <>

   <Navbar/>
    <main className="min-h-screen bg-[#050505] px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Why MockMate
          </p>

          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            Practice
            <span className="text-gray-500"> differently.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Traditional interview practice gives everyone the same questions.
            MockMate builds preparation around you.
          </p>
        </div>

        {/* Comparison */}
        <div className="mt-20 overflow-hidden rounded-3xl border border-white/10">
          <div className="grid grid-cols-2 border-b border-white/10">

            <div className="p-6 text-sm font-semibold text-gray-500">
              Traditional Practice
            </div>

            <div className="border-l border-white/10 p-6 text-sm font-semibold">
              MockMate AI
            </div>

          </div>

          {[
            ["Generic questions", "Resume-based questions"],
            ["No personalized feedback", "AI-powered evaluation"],
            ["No skill analysis", "Skill-gap analysis"],
            ["Static practice", "Adaptive interview experience"],
            ["No readiness insight", "Readiness score & final report"],
          ].map(([traditional, mockmate], index) => (
            <div
              key={index}
              className="grid grid-cols-2 border-b border-white/10 last:border-b-0"
            >
              <div className="p-6 text-sm text-gray-500">
                {traditional}
              </div>

              <div className="border-l border-white/10 p-6 text-sm text-gray-300">
                {mockmate}
              </div>
            </div>
          ))}
        </div>

        {/* USP Cards */}
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          {differences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
            >
              <h2 className="text-xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
     <Footer/>
     </>
  );
};

export default WhyMockMate;