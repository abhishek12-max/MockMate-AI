const ProductPreview = () => {
  return (
    <section className="px-6 pb-28">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            See MockMate in Action
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Your AI-powered interview room.
          </h2>

          <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base">
            Practice realistic questions, manage your time, and receive
            instant AI feedback — all in one place.
          </p>
        </div>

        {/* Product Mockup */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl">

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
                M
              </div>

              <div>
                <p className="text-sm font-semibold">
                  MockMate AI
                </p>

                <p className="text-xs text-gray-500">
                  MERN Stack Developer Interview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />

              <span className="text-xs text-gray-400">
                04:32
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_260px]">

            {/* Question */}
            <div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Question 3 of 5
                </span>

                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                  Medium
                </span>
              </div>

              <h3 className="mt-7 max-w-3xl text-xl font-semibold leading-8 sm:text-2xl">
                In your StockPilot project, how did you implement JWT
                authentication and refresh tokens?
              </h3>

              {/* Answer Box */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs text-gray-500">
                  Your answer
                </p>

                <p className="mt-4 text-sm leading-6 text-gray-400">
                  Explain your approach, token lifecycle, cookie handling,
                  and how protected routes were implemented.
                </p>
              </div>

              {/* Button */}
              <div className="mt-5 flex justify-end">
                <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                  Submit Answer
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-4">

              {/* AI Evaluation */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  AI Evaluation
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-bold">
                    8.5
                  </span>

                  <span className="pb-1 text-sm text-gray-500">
                    / 10
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  Strong understanding of authentication flow and token
                  management.
                </p>
              </div>

              {/* Skill Gap */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Skill Analysis
                </p>

                <div className="mt-5 space-y-4">

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">
                        Authentication
                      </span>

                      <span className="text-gray-500">
                        Strong
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 w-[88%] rounded-full bg-white" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">
                        MongoDB
                      </span>

                      <span className="text-gray-500">
                        Good
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 w-[72%] rounded-full bg-white" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">
                        System Design
                      </span>

                      <span className="text-gray-500">
                        Improve
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div className="h-1.5 w-[48%] rounded-full bg-white" />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;