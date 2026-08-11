import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  {
    number: "01",
    title: "Resume-Based Interviews",
    description:
      "MockMate understands your resume and creates questions around your actual skills, projects, and experience.",
  },
  {
    number: "02",
    title: "AI-Powered Evaluation",
    description:
      "Get instant feedback on your answers with scores, strengths, and specific improvements from AI.",
  },
  {
    number: "03",
    title: "Skill Gap Analysis",
    description:
      "Discover the concepts and skills you need to improve before your next real interview.",
  },
  {
    number: "04",
    title: "Real Interview Experience",
    description:
      "Practice with question difficulty, timers, voice interaction, and realistic interview flows.",
  },
  {
    number: "05",
    title: "Personalized Questions",
    description:
      "Questions adapt to your role, experience level, interview type, and projects mentioned in your resume.",
  },
  {
    number: "06",
    title: "Readiness Score",
    description:
      "Understand how prepared you are with an overall score and AI-generated interview performance report.",
  },
];

const Features = () => {
  return (
    <>
    <Navbar/>
    <section
      id="features"
      className="border-t border-white/10 bg-[#050505] px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to
            <span className="text-gray-500"> prepare better.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            A complete AI-powered interview preparation experience built
            around your skills and career goals.
          </p>
        </div>

        {/* Features */}
        {/* Features */}
<div className="mt-16 grid gap-4 overflow-hidden md:grid-cols-2 md:gap-px lg:grid-cols-3">
  {features.map((feature) => (
    <div
      key={feature.number}
      className="group rounded-2xl border border-white/10 bg-[#050505] p-8 transition duration-300 hover:bg-white/[0.03] md:rounded-none md:border-0"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest text-gray-600">
          FEATURE
        </span>

        <span className="text-sm text-gray-600">
          {feature.number}
        </span>
      </div>

      <h3 className="mt-12 text-xl font-semibold">
        {feature.title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-gray-500">
        {feature.description}
      </p>

      <div className="mt-8 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
    </div>
  ))}
</div>

           {/* Bottom CTA */}
        <div className="mt-24 rounded-3xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Prepare with purpose.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
            Stop practicing generic questions. Build your preparation around
            your actual skills and projects.
          </p>

         <Link
  to="/register"
  className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200"
>
  Start Practicing
</Link>
        </div>

      </div>
    </section>
     
    </>
    
  );
};

export default Features;