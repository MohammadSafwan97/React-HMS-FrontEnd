import { Plus } from "lucide-react";

export function AppointmentHeader({ openAddAppointment }) {
  return (
    <div className="flex justify-between mb-4">
      <h1 className="text-xl font-semibold">Appointments</h1>

      <button
        onClick={openAddAppointment}
        className="bg-blue-900 text-white px-4 py-2 rounded-lg flex gap-2"
      >
        <Plus size={16} /> Add Appointment
      </button>
    </div>
  );
}
