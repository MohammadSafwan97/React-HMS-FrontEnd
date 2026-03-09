import { useState } from "react";
import { Plus, Eye, Edit } from "lucide-react";

/* ---------------- CONSTANTS ---------------- */

const DEPARTMENTS = [
  "Cardiology",
  "Dermatology",
  "Orthopedics",
  "Emergency",
];

const STATUSES = [
  "Scheduled",
  "Completed",
  "Cancelled",
];

/* ---------------- MOCK DATA ---------------- */

const initialAppointments = [
  {
    id: "AP-2026-001",
    patientName: "Ahmed Raza",
    doctorName: "Dr. Sara Ali",
    department: "Cardiology",
    date: "2026-03-12",
    time: "10:30",
    status: "Scheduled",
    remarks: "Routine heart checkup",
  },
  {
    id: "AP-2026-002",
    patientName: "Fatima Khan",
    doctorName: "Dr. Ahmed Khan",
    department: "Dermatology",
    date: "2026-03-13",
    time: "11:45",
    status: "Completed",
    remarks: "Skin allergy treatment",
  },
  {
    id: "AP-2026-003",
    patientName: "Usman Ali",
    doctorName: "Dr. Tariq Mahmood",
    department: "Orthopedics",
    date: "2026-03-14",
    time: "09:00",
    status: "Scheduled",
    remarks: "Knee pain consultation",
  },
];

/* ---------------- COMPONENT ---------------- */

export function TransferCases() {

  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [mode, setMode] = useState(null);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const emptyAppointment = {
    id: "",
    patientName: "",
    doctorName: "",
    department: "",
    date: "",
    time: "",
    status: "Scheduled",
    remarks: "",
  };

  /* ---------- FILTER ---------- */

  const filteredAppointments = appointments.filter((a) => {

    const q = search.toLowerCase();

    const matchesSearch =
      a.id.toLowerCase().includes(q) ||
      a.patientName.toLowerCase().includes(q) ||
      a.doctorName.toLowerCase().includes(q);

    const matchesDepartment =
      departmentFilter === "All" || a.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All" || a.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  /* ---------- ACTIONS ---------- */

  const openModal = (appointment, type) => {
    setSelectedAppointment({ ...appointment });
    setMode(type);
  };

  const openAddAppointment = () => {
    setSelectedAppointment({ ...emptyAppointment });
    setMode("add");
  };

  const handleChange = (field, value) => {
    setSelectedAppointment((prev) => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {

    if (mode === "edit") {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id ? selectedAppointment : a
        )
      );
    }

    if (mode === "add") {
      setAppointments((prev) => [
        ...prev,
        { ...selectedAppointment, id: `AP-${Date.now()}` },
      ]);
    }

    setSelectedAppointment(null);
    setMode(null);
  };

  return (
    <div className="p-8 text-slate-900">

      {/* HEADER */}

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Appointments</h1>

        <button
          onClick={openAddAppointment}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus className="w-4 h-4" /> Add Appointment
        </button>
      </div>

      {/* FILTERS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <input
          placeholder="Search Appointment / Patient / Doctor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <select
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All Departments</option>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All Status</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

      </div>

      {/* TABLE */}

      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Appointment ID</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredAppointments.map((a) => (

              <tr key={a.id} className="border-b">

                <td className="px-6 py-4">{a.id}</td>
                <td className="px-6 py-4">{a.patientName}</td>
                <td className="px-6 py-4">{a.doctorName}</td>
                <td className="px-6 py-4">{a.department}</td>
                <td className="px-6 py-4">{a.date}</td>
                <td className="px-6 py-4">{a.time}</td>

                <td className="px-6 py-4">

                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      a.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : a.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.status}
                  </span>

                </td>

                <td className="px-6 py-4 flex gap-2">

                  <button onClick={() => openModal(a, "view")}>
                    <Eye />
                  </button>

                  <button onClick={() => openModal(a, "edit")}>
                    <Edit />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {selectedAppointment && (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4">

            <h2 className="font-semibold mb-4">

              {mode === "view"
                ? "View Appointment"
                : mode === "edit"
                ? "Edit Appointment"
                : "Add Appointment"}

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input
                label="Patient Name"
                value={selectedAppointment.patientName}
                disabled={mode === "view"}
                onChange={(v) => handleChange("patientName", v)}
              />

              <Input
                label="Doctor Name"
                value={selectedAppointment.doctorName}
                disabled={mode === "view"}
                onChange={(v) => handleChange("doctorName", v)}
              />

              <SelectField
                label="Department"
                value={selectedAppointment.department}
                options={DEPARTMENTS}
                disabled={mode === "view"}
                onChange={(v) => handleChange("department", v)}
              />

              <Input
                type="date"
                label="Appointment Date"
                value={selectedAppointment.date}
                disabled={mode === "view"}
                onChange={(v) => handleChange("date", v)}
              />

              <Input
                type="time"
                label="Appointment Time"
                value={selectedAppointment.time}
                disabled={mode === "view"}
                onChange={(v) => handleChange("time", v)}
              />

              <SelectField
                label="Status"
                value={selectedAppointment.status}
                options={STATUSES}
                disabled={mode === "view"}
                onChange={(v) => handleChange("status", v)}
              />

              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Remarks</label>

                <textarea
                  disabled={mode === "view"}
                  value={selectedAppointment.remarks}
                  onChange={(e) =>
                    handleChange("remarks", e.target.value)
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setSelectedAppointment(null)}
                className="border px-4 py-2 rounded-lg"
              >
                Close
              </button>

              {mode !== "view" && (

                <button
                  onClick={saveChanges}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Input({ label, value, onChange, disabled, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange, disabled }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>

      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      >
        <option value="">Select</option>

        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}

      </select>
    </div>
  );
}