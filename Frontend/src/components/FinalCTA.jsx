import {Link} from "react-router-dom"
const FinalCTA = () => {
  return (
    <section className="border-t border-white/10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center sm:px-10">

          {/* Background Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl" />

          <div className="relative">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
              Start Preparing
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Your next interview
              <span className="text-gray-500"> starts here.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
              Practice with AI, understand your weaknesses, and walk into
              your next interview with confidence.
            </p>

             
          </div>

          <div className="mt-4">
             <Link
                to="/register"
                className="w-full rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-200 sm:w-auto mt-10"
              >
                Start Practicing
              </Link>
          </div>
         
        </div>

        
      </div>
    </section>
  );
};

export default FinalCTA;