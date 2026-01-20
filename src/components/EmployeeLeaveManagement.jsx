import { useState } from "react";

export function EmployeeLeaveManagement() {
  /* ---------------- STATE ---------------- */

  const [leaves, setLeaves] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    employeeName: "",
    designation: "",
    leaveType: "Casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLeave = (e) => {
    e.preventDefault();

    if (!form.employeeId || !form.startDate || !form.endDate) return;

    setLeaves([
      ...leaves,
      {
        ...form,
        id: Date.now().toString(),
        status: "Pending Approval",
      },
    ]);

    setForm({
      employeeId: "",
      employeeName: "",
      designation: "",
      leaveType: "Casual",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8 text-slate-800">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Employee Leave Management
        </h1>
        <p className="text-slate-600">
          Record, track, and manage employee leave applications
        </p>
      </div>

      {/* ADD LEAVE */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">
          Apply / Record Employee Leave
        </h2>

        <form
          onSubmit={handleAddLeave}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
        >
          <input
            name="employeeId"
            placeholder="P No / O No"
            className="border rounded-lg px-3 py-2 text-slate-800"
            value={form.employeeId}
            onChange={handleChange}
          />

          <input
            name="employeeName"
            placeholder="Employee Name"
            className="border rounded-lg px-3 py-2 text-slate-800"
            value={form.employeeName}
            onChange={handleChange}
          />

          <input
            name="designation"
            placeholder="Designation"
            className="border rounded-lg px-3 py-2 text-slate-800"
            value={form.designation}
            onChange={handleChange}
          />

          <select
            name="leaveType"
            className="border rounded-lg px-3 py-2 text-slate-800"
            value={form.leaveType}
            onChange={handleChange}
          >
            <option>Casual</option>
            <option>Medical</option>
            <option>Annual</option>
            <option>Emergency</option>
            <option>Without Pay</option>
          </select>

          <input
            type="date"
            name="startDate"
            className="border rounded-lg px-3 py-2 text-slate-800"
            value={form.startDate}
            onChange={handleChange}
          />

          <input
            type="date"
            name="endDate"
            className="border rounded-lg px-3 py-2 text-slate-800"
            value={form.endDate}
            onChange={handleChange}
          />

          <textarea
            name="reason"
            placeholder="Reason for leave (optional)"
            className="md:col-span-3 border rounded-lg px-3 py-2 text-slate-800"
            value={form.reason}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="md:col-span-3 bg-blue-900 text-white rounded-lg py-2"
          >
            Submit Leave Record
          </button>
        </form>
      </div>

      {/* LEAVE RECORDS */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">
          Employee Leave Records
        </h2>

        {leaves.length === 0 ? (
          <p className="text-sm text-slate-600">
            No leave records available.
          </p>
        ) : (
          <div className="space-y-4 text-sm">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div className="space-y-1">
                  <div className="font-medium text-slate-800">
                    {leave.employeeName} ({leave.employeeId})
                  </div>

                  <div className="text-slate-600">
                    {leave.designation}
                  </div>

                  <div className="text-slate-600">
                    {leave.leaveType} Leave: {leave.startDate} → {leave.endDate}
                  </div>

                  {leave.reason && (
                    <div className="text-slate-500">
                      Reason: {leave.reason}
                    </div>
                  )}
                </div>

                <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
