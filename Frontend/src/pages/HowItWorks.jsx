import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const steps = [
  {
    number: "01",
    title: "Upload Your Resume",
    description:
      "Upload your resume and let MockMate AI understand your skills, projects, education, and experience.",
  },
  {
    number: "02",
    title: "AI Builds Your Interview",
    description:
      "MockMate creates personalized questions based on your resume, role, experience level, and interview type.",
  },
  {
    number: "03",
    title: "Practice & Get Feedback",
    description:
      "Answer realistic questions, receive AI-powered evaluation, and discover your strengths and skill gaps.",
  },
];

const HowItWorks = () => {
  return (
   <>
   
  
  <Navbar/>

    <section
      id="how-it-works"
      className="border-t border-white/10 bg-[#050505] px-6 py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            From resume to
            <span className="text-gray-500"> interview-ready.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            MockMate turns your resume into a personalized interview
            experience designed to help you improve where it matters.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  STEP
                </span>

                <span className="text-sm font-semibold text-gray-400">
                  {step.number}
                </span>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

     <Footer/>
     </>
  );
};

export default HowItWorks;