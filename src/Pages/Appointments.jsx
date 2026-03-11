import { useState, useEffect } from "react";
import { Plus, Eye, Edit } from "lucide-react";
import Select from "react-select";

import {
  getAppointments,
  createAppointment,
  updateAppointment,
} from "../services/appointmentService";

import { getAllDoctors } from "../services/doctorService";
import { getAllPatients } from "../services/patientService";

const STATUSES = ["SCHEDULED", "COMPLETED", "CANCELLED"];

export function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [mode, setMode] = useState(null);

  const [search, setSearch] = useState("");

  const emptyAppointment = {
    doctorId: "",
    patientId: "",
    appointmentDate: "",
    appointmentTime: "",
    timeSlot: "",
    status: "SCHEDULED",
    remarks: "",
  };

  const statusStyles = {
    SCHEDULED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const appts = await getAppointments();
    const docs = await getAllDoctors();
    const pats = await getAllPatients();

    setAppointments(appts || []);
    setDoctors(docs || []);
    setPatients(pats || []);
  };

  /* ---------------- OPTIONS ---------------- */

  const patientOptions = patients.map((p) => ({
    label: `${p.name} (ID: ${p.id})`,
    value: p.id,
  }));

  const doctorOptions = doctors.map((d) => ({
    label: `${d.name} (ID: ${d.id})`,
    value: d.id,
  }));

  /* ---------------- FILTER ---------------- */

  const filteredAppointments = (appointments || []).filter((a) => {
    if (!a) return false;

    const q = search.toLowerCase();

    const patient = patients.find((p) => p.id === a.patientId);
    const doctor = doctors.find((d) => d.id === a.doctorId);

    return (
      a.id?.toString().includes(q) ||
      patient?.name?.toLowerCase().includes(q) ||
      doctor?.name?.toLowerCase().includes(q)
    );
  });

  /* ---------------- ACTIONS ---------------- */

  const openModal = (appointment, type) => {
    setSelectedAppointment({ ...appointment });
    setMode(type);
  };

  const openAddAppointment = () => {
    setSelectedAppointment({ ...emptyAppointment });
    setMode("add");
  };

  const handleChange = (field, value) => {
    setSelectedAppointment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ---------------- SAVE ---------------- */

  const saveChanges = async () => {
    const payload = {
      doctorId: selectedAppointment.doctorId,
      patientId: selectedAppointment.patientId,
      appointmentDate: selectedAppointment.appointmentDate,
      appointmentTime: selectedAppointment.appointmentTime,
      timeSlot: selectedAppointment.timeSlot,
      status: selectedAppointment.status,
      remarks: selectedAppointment.remarks,
    };

    if (mode === "add") {
      const res = await createAppointment(payload);
      setAppointments([...appointments, res.data]);
    }

    if (mode === "edit") {
      const res = await updateAppointment(selectedAppointment.id, payload);

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id ? res.data : a
        )
      );
    }

    setSelectedAppointment(null);
    setMode(null);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 text-slate-900">
      {/* HEADER */}

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Appointments</h1>

        <button
          onClick={openAddAppointment}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus size={16} /> Add Appointment
        </button>
      </div>

      {/* SEARCH */}

      <input
        placeholder="Search Appointment / Patient / Doctor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-6"
      />

      {/* TABLE */}

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((a) => {
              const patient = patients.find((p) => p.id === a.patientId);
              const doctor = doctors.find((d) => d.id === a.doctorId);

              return (
                <tr key={a.id} className="border-b">
                  <td className="px-6 py-4">{a.id}</td>

                  <td className="px-6 py-4">
                    {patient ? `${patient.name} (ID:${patient.id})` : "-"}
                  </td>

                  <td className="px-6 py-4">
                    {doctor ? `${doctor.name} (ID:${doctor.id})` : "-"}
                  </td>

                  <td className="px-6 py-4">{a.appointmentDate}</td>

                  <td className="px-6 py-4">{a.appointmentTime}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        statusStyles[a.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => openModal(a, "view")}>
                      <Eye size={16} />
                    </button>

                    <button onClick={() => openModal(a, "edit")}>
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {selectedAppointment && (
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
                placeholder="Search Patient..."
                isDisabled={mode === "view"}
                options={patientOptions}
                value={
                  patientOptions.find(
                    (p) => p.value === selectedAppointment.patientId
                  ) || null
                }
                onChange={(option) =>
                  handleChange("patientId", option?.value)
                }
              />

              <Select
                placeholder="Search Doctor..."
                isDisabled={mode === "view"}
                options={doctorOptions}
                value={
                  doctorOptions.find(
                    (d) => d.value === selectedAppointment.doctorId
                  ) || null
                }
                onChange={(option) =>
                  handleChange("doctorId", option?.value)
                }
              />

              <Input
                label="Appointment Date"
                type="date"
                value={selectedAppointment.appointmentDate}
                disabled={mode === "view"}
                onChange={(v) => handleChange("appointmentDate", v)}
              />

              <Input
                label="Appointment Time"
                type="time"
                value={selectedAppointment.appointmentTime}
                disabled={mode === "view"}
                onChange={(v) => handleChange("appointmentTime", v)}
              />

              <Input
                label="Time Slot"
                value={selectedAppointment.timeSlot}
                disabled={mode === "view"}
                onChange={(v) => handleChange("timeSlot", v)}
              />

              <SelectField
                label="Status"
                value={selectedAppointment.status}
                options={STATUSES.map((s) => ({ label: s, value: s }))}
                disabled={mode === "view"}
                onChange={(v) => handleChange("status", v)}
              />

              <textarea
                placeholder="Remarks"
                value={selectedAppointment.remarks || ""}
                disabled={mode === "view"}
                onChange={(e) =>
                  handleChange("remarks", e.target.value)
                }
                className="col-span-2 border rounded-lg px-3 py-2"
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
        value={value || ""}
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
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}