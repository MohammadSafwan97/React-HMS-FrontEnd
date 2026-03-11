import { useState } from "react";
import Select from "react-select";
import { createAppointment, updateAppointment } from "../services/appointmentService";
import { notifySuccess, notifyError } from "../../../shared/utils/notification";

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

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    id: appointment?.id || null,
    doctorId: appointment?.doctorId || "",
    patientId: appointment?.patientId || "",
    appointmentDate: appointment?.appointmentDate || "",
    appointmentTime: appointment?.appointmentTime || "",
    status: appointment?.status || "SCHEDULED",
    remarks: appointment?.remarks || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {

    const newErrors = {};

    if (!form.patientId) newErrors.patientId = "Patient is required";
    if (!form.doctorId) newErrors.doctorId = "Doctor is required";

    if (!form.appointmentDate) {
      newErrors.appointmentDate = "Appointment date is required";
    } else if (form.appointmentDate < today) {
      newErrors.appointmentDate = "Date cannot be in the past";
    }

    if (!form.appointmentTime)
      newErrors.appointmentTime = "Appointment time is required";

    if (!form.status)
      newErrors.status = "Status is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveChanges = async () => {

    if (!validateForm()) return;

    const payload = {
      doctorId: Number(form.doctorId),
      patientId: Number(form.patientId),
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      status: form.status,
      remarks: form.remarks,
    };

    try {

      if (mode === "add") {

        const res = await createAppointment(payload);

        if (res?.data) {
          setAppointments((prev) => [...prev, res.data]);
          notifySuccess("Appointment created successfully");
        }

      }

      if (mode === "edit") {

        const res = await updateAppointment(form.id, payload);

        if (res?.data) {
          setAppointments((prev) =>
            prev.map((a) => (a.id === form.id ? res.data : a))
          );

          notifySuccess("Appointment updated successfully");
        }
      }

      setSelectedAppointment(null);

    } catch (error) {

      console.error(error);

      notifyError(
        error.response?.data?.message || "Failed to save appointment"
      );
    }
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

      <div className="bg-white p-6 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">

        <h2 className="text-lg font-semibold mb-4">
          {mode === "view"
            ? "View Appointment"
            : mode === "edit"
            ? "Edit Appointment"
            : "Add Appointment"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {/* Patient */}
          <div>
            <label className="text-sm font-medium">Patient</label>
            <Select
              options={patientOptions}
              value={patientOptions.find((p) => p.value === form.patientId)}
              onChange={(o) => handleChange("patientId", o.value)}
              isDisabled={mode === "view"}
            />
            {errors.patientId && (
              <p className="text-red-500 text-sm">{errors.patientId}</p>
            )}
          </div>

          {/* Doctor */}
          <div>
            <label className="text-sm font-medium">Doctor</label>
            <Select
              options={doctorOptions}
              value={doctorOptions.find((d) => d.value === form.doctorId)}
              onChange={(o) => handleChange("doctorId", o.value)}
              isDisabled={mode === "view"}
            />
            {errors.doctorId && (
              <p className="text-red-500 text-sm">{errors.doctorId}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium">Appointment Date</label>
            <input
              type="date"
              min={today}
              value={form.appointmentDate}
              onChange={(e) =>
                handleChange("appointmentDate", e.target.value)
              }
              className="border p-2 rounded w-full"
              disabled={mode === "view"}
            />
            {errors.appointmentDate && (
              <p className="text-red-500 text-sm">{errors.appointmentDate}</p>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="text-sm font-medium">Appointment Time</label>
            <input
              type="time"
              value={form.appointmentTime}
              onChange={(e) =>
                handleChange("appointmentTime", e.target.value)
              }
              className="border p-2 rounded w-full"
              disabled={mode === "view"}
            />
            {errors.appointmentTime && (
              <p className="text-red-500 text-sm">{errors.appointmentTime}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={mode === "view"}
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Remarks */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Remarks</label>
            <textarea
              value={form.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={mode === "view"}
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
  );
}
