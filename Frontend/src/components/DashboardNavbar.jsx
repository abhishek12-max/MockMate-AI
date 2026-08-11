const DashboardNavbar = () => {
  return (
    <header className="border-b border-white/10 bg-[#050505]/80 px-6 py-5 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            Welcome back
          </p>

          <h1 className="mt-1 text-xl font-semibold">
            Dashboard
          </h1>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold">
          A
        </div>

      </div>

    </header>
  );
};

export default DashboardNavbar;