import { useState } from "react";
import Select from "react-select";
import { createAppointment, updateAppointment } from "../services/appointmentService";

const STATUSES = ["SCHEDULED", "COMPLETED", "CANCELLED"];

export function AppointmentModal({
  appointment,
  mode,
  doctors,
  patients,
  setSelectedAppointment,
  setAppointments,
  appointments
}) {

  const [form, setForm] = useState({
    ...appointment,
    remarks: appointment?.remarks || ""
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {

    const payload = {
      doctorId: form.doctorId,
      patientId: form.patientId,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      timeSlot: form.timeSlot,
      status: form.status,
      remarks: form.remarks,
    };
    console.log(payload)

    if (mode === "add") {
      const res = await createAppointment(payload);
      console.log(res.data)
      setAppointments([...appointments, res.data]);
    }

    if (mode === "edit") {
      const res = await updateAppointment(form.id, payload);

      setAppointments((prev) =>
        prev.map((a) => (a.id === form.id ? res.data : a))
      );
    }

    setSelectedAppointment(null);
  };

  const patientOptions = patients.map((p) => ({
    label: `${p.name} (ID:${p.id})`,
    value: p.id,
  }));

  const doctorOptions = doctors.map((d) => ({
    label: `${d.name} (ID:${d.id})`,
    value: d.id,
  }));

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl max-w-2xl w-full">

        <h2 className="font-semibold mb-4">
          {mode === "view"
            ? "View Appointment"
            : mode === "edit"
            ? "Edit Appointment"
            : "Add Appointment"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Select
            options={patientOptions}
            onChange={(o) => handleChange("patientId", o.value)}
          />

          <Select
            options={doctorOptions}
            onChange={(o) => handleChange("doctorId", o.value)}
          />

          <input
            type="date"
            value={form.appointmentDate || ""}
            onChange={(e) =>
              handleChange("appointmentDate", e.target.value)
            }
          />

          <input
            type="time"
            value={form.appointmentTime || ""}
            onChange={(e) =>
              handleChange("appointmentTime", e.target.value)
            }
          />

          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <textarea
            value={form.remarks}
            onChange={(e) => handleChange("remarks", e.target.value)}
            className="col-span-2 border p-2"
          />

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
  );
}
