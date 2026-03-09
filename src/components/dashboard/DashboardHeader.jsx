export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-1">
          Dashboard Overview
        </h1>

        <p className="text-slate-600 text-sm">
          Welcome back!
        </p>
      </div>

      {/* Right side actions (future notifications / messages) */}
      <div className="flex items-center gap-2"></div>

    </div>
  );
}