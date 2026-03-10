import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Printer,
} from "lucide-react";

/* ---------------- SHIFT TYPES ---------------- */

const SHIFTS = ["Morning", "Evening", "Night"];

/* ---------------- DATA ---------------- */

const initialStaff = [
  {
    staffId: "DOC-001",
    name: "Dr Sara Ali",
    role: "Cardiologist",
    department: "Cardiology",
    shift: "Morning",
    shiftStart: "08:00 AM",
    shiftEnd: "02:00 PM",
    status: "On Duty",
  },
  {
    staffId: "NUR-002",
    name: "Aisha Khan",
    role: "Nurse",
    department: "Emergency",
    shift: "Night",
    shiftStart: "08:00 PM",
    shiftEnd: "08:00 AM",
    status: "On Duty",
  },
  {
    staffId: "ADM-003",
    name: "Usman Ali",
    role: "Receptionist",
    department: "Administration",
    shift: "Morning",
    shiftStart: "09:00 AM",
    shiftEnd: "05:00 PM",
    status: "On Duty",
  },
  {
    staffId: "LAB-004",
    name: "Bilal Ahmed",
    role: "Lab Technician",
    department: "Laboratory",
    shift: "Evening",
    shiftStart: "02:00 PM",
    shiftEnd: "08:00 PM",
    status: "Off Duty",
  },
];

export function Attendance() {
  const [staff, setStaff] = useState(initialStaff);
  const [selectedDate, setSelectedDate] = useState("2026-03-09");
  const [showReport, setShowReport] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  /* ---------- Stats ---------- */

  const onDuty = staff.filter((s) => s.status === "On Duty");
  const offDuty = staff.filter((s) => s.status === "Off Duty");

  const stats = {
    onDuty: onDuty.length,
    offDuty: offDuty.length,
    total: staff.length,
    rate: Math.round((onDuty.length / staff.length) * 100),
  };

  const saveEdit = () => {
    setStaff((prev) =>
      prev.map((r) => (r.staffId === editRecord.staffId ? editRecord : r))
    );
    setEditRecord(null);
  };

  return (
    <div className="p-8 text-slate-900">

      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Staff Shift Management
        </h1>
        <p className="text-slate-700">
          Manage hospital staff attendance and shift schedules
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <StatCard label="On Duty" value={stats.onDuty} icon={CheckCircle} color="teal" />
        <StatCard label="Off Duty" value={stats.offDuty} icon={XCircle} color="red" />
        <StatCard label="Total Staff" value={stats.total} icon={Users} color="blue" />
        <StatCard label="Attendance Rate" value={`${stats.rate}%`} icon={Clock} color="amber" />

      </div>

      {/* DATE SELECTOR */}

      <div className="bg-white rounded-xl border p-6 mb-6 flex items-center gap-4">

        <CalendarIcon className="w-5 h-5 text-slate-700" />

        <label className="text-slate-800 font-medium">
          Select Date:
        </label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg text-slate-900"
        />

        <button
          onClick={() => setShowReport(true)}
          className="ml-auto px-6 py-2 bg-blue-900 text-white rounded-lg flex gap-2 items-center"
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50 border-b">
            <tr>
              {[
                "Staff ID",
                "Name",
                "Role",
                "Department",
                "Shift",
                "Shift Start",
                "Shift End",
                "Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-6 py-4 text-left text-slate-800 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            {staff.map((r) => (

              <tr key={r.staffId} className="border-b hover:bg-slate-50">

                <td className="px-6 py-4 font-medium">{r.staffId}</td>
                <td className="px-6 py-4">{r.name}</td>
                <td className="px-6 py-4">{r.role}</td>
                <td className="px-6 py-4">{r.department}</td>

                {/* SHIFT BADGE */}

                <td className="px-6 py-4">

                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    r.shift === "Morning"
                      ? "bg-blue-100 text-blue-700"
                      : r.shift === "Evening"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}>
                    {r.shift}
                  </span>

                </td>

                <td className="px-6 py-4">{r.shiftStart}</td>
                <td className="px-6 py-4">{r.shiftEnd}</td>

                {/* STATUS BADGE */}

                <td className="px-6 py-4">

                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    r.status === "On Duty"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {r.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => setEditRecord({ ...r })}
                    className="px-4 py-2 text-sm border rounded-lg"
                  >
                    Edit
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* EDIT MODAL */}

      {editRecord && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white rounded-xl p-6 w-full max-w-xl">

            <h2 className="font-semibold text-slate-900 mb-4">
              Edit Staff Shift
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Input label="Staff ID" value={editRecord.staffId} disabled />

              <Input
                label="Name"
                value={editRecord.name}
                onChange={(v) => setEditRecord((p) => ({ ...p, name: v }))}
              />

              <Input
                label="Role"
                value={editRecord.role}
                onChange={(v) => setEditRecord((p) => ({ ...p, role: v }))}
              />

              <Input
                label="Department"
                value={editRecord.department}
                onChange={(v) => setEditRecord((p) => ({ ...p, department: v }))}
              />

              <div>
                <label className="text-sm text-slate-700">Shift</label>
                <select
                  value={editRecord.shift}
                  onChange={(e) =>
                    setEditRecord((p) => ({ ...p, shift: e.target.value }))
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                >
                  {SHIFTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <Input
                label="Shift Start"
                value={editRecord.shiftStart}
                onChange={(v) =>
                  setEditRecord((p) => ({ ...p, shiftStart: v }))
                }
              />

              <Input
                label="Shift End"
                value={editRecord.shiftEnd}
                onChange={(v) =>
                  setEditRecord((p) => ({ ...p, shiftEnd: v }))
                }
              />

              <div className="md:col-span-2">
                <label className="text-sm text-slate-700">Status</label>

                <select
                  value={editRecord.status}
                  onChange={(e) =>
                    setEditRecord((p) => ({
                      ...p,
                      status: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                >
                  <option>On Duty</option>
                  <option>Off Duty</option>
                  <option>On Leave</option>
                </select>

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setEditRecord(null)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl border p-6">

      <div className={`w-10 h-10 bg-${color}-600 rounded-lg flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5 text-white" />
      </div>

      <div className="text-sm text-slate-700 font-medium">{label}</div>
      <div className="text-xl font-bold text-slate-900">{value}</div>

    </div>
  );
}

function Input({ label, value, onChange, disabled }) {
  return (
    <div>
      <label className="text-sm text-slate-700">{label}</label>

      <input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2 text-slate-900"
      />
    </div>
  );
}