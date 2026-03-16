import { Plus } from "lucide-react";

export function AppointmentHeader({ openAddAppointment }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      
      <h1 className="text-lg sm:text-xl font-semibold">
        Appointments
      </h1>

      <button
        onClick={openAddAppointment}
        className="
          flex items-center justify-center gap-2
          w-full sm:w-auto
          bg-blue-900 text-white
          px-4 py-2.5
          rounded-lg
          text-sm font-medium
          hover:bg-blue-800
          transition
        "
      >
        <Plus size={16} />
        Add Appointment
      </button>

    </div>
  );
}