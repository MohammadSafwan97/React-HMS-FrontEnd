import { useState } from "react";

export function ProjectDirectorDashboard() {
  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Project Director Dashboard
        </h1>
        <p className="text-slate-600">
          High-level operational overview
        </p>
      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <KpiCard title="Total Employees" value="40" />
        <KpiCard title="Employees on Leave" value="5" />
        <KpiCard title="Transfers (This Month)" value="5" />
        <KpiCard title="Transfers (This Week)" value="2" />
        <KpiCard title="Revenue (Millions)" value="Rs 10" />
      </div>

      {/* PROJECT STATUS */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4 text-slate-800">
          Anchorage Karachi Project Status
        </h2>

        <ProjectRow
          name="Anchorage Phase-I"
          status="On Track"
          progress={78}
        />

        <p className="mt-4 text-sm text-slate-600">
          Construction activities are progressing as planned with
          infrastructure milestones achieved.
        </p>
      </div>

      {/* PD TASK MANAGER */}
      <TaskManager />

    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function KpiCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="text-2xl font-semibold text-slate-800">{value}</div>
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
        <span className="font-medium text-slate-800">{name}</span>
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

/* ---------- PROFESSIONAL TASK MANAGER ---------- */

function TaskManager() {
  const [tasks, setTasks] = useState([
    {
      title: "Review transfer cases",
      description: "Monthly completed transfers review",
      priority: "High",
      status: "Pending",
    },
    {
      title: "Anchorage site meeting",
      description: "Weekly coordination with contractors",
      priority: "Medium",
      status: "Completed",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
  });

  function handleAddTask(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    setTasks([...tasks, form]);
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
    });
  }

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <h2 className="text-lg font-semibold text-slate-800">
        Director Task Management
      </h2>

      {/* ADD TASK FORM */}
      <form
        onSubmit={handleAddTask}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm"
      >
        <input
          className="border rounded-lg px-3 py-2 text-slate-800"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="border rounded-lg px-3 py-2 text-slate-800"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="border rounded-lg px-3 py-2 text-slate-800"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2 text-slate-800"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

        <button
          type="submit"
          className="bg-blue-900 text-white rounded-lg px-4 py-2"
        >
          Add Task
        </button>
      </form>

      {/* TASK LIST */}
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 flex justify-between items-start"
          >
            <div className="space-y-1">
              <div className="font-medium text-slate-800">
                {task.title}
              </div>
              <div className="text-sm text-slate-600">
                {task.description}
              </div>

              <div className="flex gap-2 text-xs mt-2">
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {task.priority}
                </span>

                <span
                  className={`px-2 py-0.5 rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
