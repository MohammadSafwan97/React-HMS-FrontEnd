import { useState } from "react";

import { employeesMock } from "../../mocks/employeemock.js";
import { tabCategoryMap } from "../../utils/employees/helper.js";

import EmployeesHeader from "../../components/employees/EmployeesHeader";
import EmployeesSearch from "../../components/employees/EmployeesSearch";
import EmployeeCard from "../../components/employees/EmployeeCard";
import EmployeeModal from "../../components/employees/EmployeeModal";
import EmployeeReportModal from "../../components/employees/EmployeeReportModal";

export function TeamMembers() {
  /* ---------------- STATE ---------------- */

  const [members, setMembers] = useState(employeesMock);
  const [activeTab, setActiveTab] = useState("uniform");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  /* -------- TIME OFF STATE -------- */

  const [timeOffRequests, setTimeOffRequests] = useState([]);

  const [timeOffForm, setTimeOffForm] = useState({
    memberId: "",
    type: "Vacation",
    from: "",
    to: "",
  });

  /* -------- TASK ASSIGNMENT STATE -------- */

  const [taskAssignments, setTaskAssignments] = useState([]);

  const [taskForm, setTaskForm] = useState({
    memberId: "",
    project: "",
    task: "",
    dueDate: "",
  });

  /* ---------------- FILTERED DATA ---------------- */

  const filteredMembers = members.filter((member) => {
    const matchesTab = tabCategoryMap[activeTab].includes(member.category);

    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.designation.toLowerCase().includes(search.toLowerCase()) ||
      member.id.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const grouped = {
    uniform: members.filter((m) =>
      ["PN CPO", "Sailor"].includes(m.category)
    ),
    civilian: members.filter((m) => m.category === "PN Civilian"),
    contract: members.filter((m) => m.category === "Contract Employee"),
  };

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setFormData({});
    setShowModal(true);
  };

  const openEdit = (member) => {
    setMode("edit");
    setFormData(member);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setMembers((prev) =>
      mode === "edit"
        ? prev.map((m) => (m.uid === formData.uid ? formData : m))
        : [...prev, { ...formData, uid: Date.now().toString() }]
    );

    setShowModal(false);
  };

  /* ---------------- TIME OFF HANDLERS ---------------- */

  const addTimeOff = (e) => {
    e.preventDefault();

    setTimeOffRequests([
      ...timeOffRequests,
      { ...timeOffForm, id: Date.now().toString() },
    ]);

    setTimeOffForm({
      memberId: "",
      type: "Vacation",
      from: "",
      to: "",
    });
  };

  /* ---------------- TASK ASSIGNMENT HANDLERS ---------------- */

  const addTaskAssignment = (e) => {
    e.preventDefault();

    setTaskAssignments([
      ...taskAssignments,
      { ...taskForm, id: Date.now().toString() },
    ]);

    setTaskForm({
      memberId: "",
      project: "",
      task: "",
      dueDate: "",
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 text-slate-900 space-y-10">

      <EmployeesHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          ["uniform", "Engineering Team"],
          ["civilian", "Operations Team"],
          ["contract", "Contract Members"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === key
                ? "bg-blue-900 text-white"
                : "border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <EmployeesSearch value={search} onChange={setSearch} />

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <EmployeeCard key={member.uid} emp={member} onEdit={openEdit} />
        ))}
      </div>

      {/* -------- TIME OFF MANAGEMENT -------- */}
      <section className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Time Off Requests</h2>

        <form
          onSubmit={addTimeOff}
          className="grid md:grid-cols-5 gap-3 text-sm mb-4"
        >
          <input
            placeholder="Member ID"
            className="border px-3 py-2 rounded"
            value={timeOffForm.memberId}
            onChange={(e) =>
              setTimeOffForm({ ...timeOffForm, memberId: e.target.value })
            }
          />

          <select
            className="border px-3 py-2 rounded"
            value={timeOffForm.type}
            onChange={(e) =>
              setTimeOffForm({ ...timeOffForm, type: e.target.value })
            }
          >
            <option>Vacation</option>
            <option>Sick Leave</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={timeOffForm.from}
            onChange={(e) =>
              setTimeOffForm({ ...timeOffForm, from: e.target.value })
            }
          />

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={timeOffForm.to}
            onChange={(e) =>
              setTimeOffForm({ ...timeOffForm, to: e.target.value })
            }
          />

          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Add Request
          </button>
        </form>

        {timeOffRequests.map((req) => (
          <div key={req.id} className="text-sm border-b py-2">
            {req.memberId} — {req.type} ({req.from} → {req.to})
          </div>
        ))}
      </section>

      {/* -------- TASK ASSIGNMENTS -------- */}
      <section className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Task Assignments</h2>

        <form
          onSubmit={addTaskAssignment}
          className="grid md:grid-cols-5 gap-3 text-sm mb-4"
        >
          <input
            placeholder="Member ID"
            className="border px-3 py-2 rounded"
            value={taskForm.memberId}
            onChange={(e) =>
              setTaskForm({ ...taskForm, memberId: e.target.value })
            }
          />

          <input
            placeholder="Project Name"
            className="border px-3 py-2 rounded"
            value={taskForm.project}
            onChange={(e) =>
              setTaskForm({ ...taskForm, project: e.target.value })
            }
          />

          <input
            placeholder="Task Title"
            className="border px-3 py-2 rounded"
            value={taskForm.task}
            onChange={(e) =>
              setTaskForm({ ...taskForm, task: e.target.value })
            }
          />

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={taskForm.dueDate}
            onChange={(e) =>
              setTaskForm({ ...taskForm, dueDate: e.target.value })
            }
          />

          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Assign Task
          </button>
        </form>

        {taskAssignments.map((task) => (
          <div key={task.id} className="text-sm border-b py-2">
            {task.memberId} — {task.project}: {task.task} (Due {task.dueDate})
          </div>
        ))}
      </section>

      {/* Modals */}

      {showModal && (
        <EmployeeModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showReport && (
        <EmployeeReportModal
          employees={members}
          grouped={grouped}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}