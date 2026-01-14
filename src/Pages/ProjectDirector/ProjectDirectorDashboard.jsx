export function ProjectDirectorDashboard() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Project Director Overview
        </h1>
        <p className="text-slate-600">
          Strategic insights and executive monitoring
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Total Transfer Cases" value="248" trend="+12%" />
        <KpiCard title="Pending / Delayed" value="34" trend="8 critical" highlight />
        <KpiCard title="Active Projects" value="6" trend="2 at risk" />
        <KpiCard title="Monthly Revenue" value="Rs 128M" trend="+9%" />
      </div>

      {/* RISKS + PROJECT STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RISK & ALERTS */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold mb-4 text-slate-800">
            Risks & Alerts
          </h2>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span>Delayed Transfer Cases</span>
              <span className="text-red-600 font-medium">12</span>
            </li>
            <li className="flex justify-between">
              <span>Expiring NDC / NOC</span>
              <span className="text-amber-600 font-medium">5</span>
            </li>
            <li className="flex justify-between">
              <span>High-Value Pending Cases</span>
              <span className="text-red-600 font-medium">3</span>
            </li>
            <li className="flex justify-between">
              <span>Authority Approvals Pending</span>
              <span className="text-amber-600 font-medium">7</span>
            </li>
          </ul>
        </div>

        {/* CONSTRUCTION PROJECT STATUS */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold mb-4 text-slate-800">
            Construction Projects Status
          </h2>

          <div className="space-y-4 text-sm">
            <ProjectRow name="Anchorage Phase-I" status="On Track" progress={78} />
            <ProjectRow name="Commercial Plaza" status="At Risk" progress={54} />
            <ProjectRow name="Residential Towers" status="Delayed" progress={42} />
          </div>
        </div>
      </div>

      {/* TRANSFER & COMPLIANCE SUMMARY */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4 text-slate-800">
          Transfer & Compliance Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          <SummaryItem label="PALs Issued (Month)" value="156" />
          <SummaryItem label="Pending PAOs" value="12" />
          <SummaryItem label="NDC/NOC Cleared" value="89%" />
          <SummaryItem label="Compliance Health" value="Good" />
        </div>
      </div>

      {/* EXECUTIVE ACTIONS */}
      <div className="bg-white rounded-xl border p-6 flex flex-wrap gap-4">
        <button className="px-5 py-2 bg-blue-900 text-white rounded-lg">
          Download Executive Report
        </button>
        <button className="px-5 py-2 border rounded-lg">
          View Delayed Cases
        </button>
        <button className="px-5 py-2 border rounded-lg">
          Construction Progress Report
        </button>
      </div>

    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function KpiCard({ title, value, trend, highlight }) {
  return (
    <div className={`bg-white rounded-xl border p-6 ${highlight ? "border-red-300" : ""}`}>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold text-slate-800">{value}</div>
      <div className={`text-xs mt-1 ${highlight ? "text-red-600" : "text-slate-500"}`}>
        {trend}
      </div>
    </div>
  );
}

function ProjectRow({ name, status, progress }) {
  const statusColor =
    status === "On Track"
      ? "text-green-600"
      : status === "At Risk"
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span className={statusColor}>{status}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-blue-900 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <div className="text-slate-500">{label}</div>
      <div className="font-semibold text-slate-800">{value}</div>
    </div>
  );
}
