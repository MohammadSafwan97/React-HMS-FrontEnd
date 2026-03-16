import { Plus, FileText } from "lucide-react";

export default function PatientsHeader({ onAdd }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      
      <h1 className="text-lg sm:text-xl font-semibold">
        Patient Management – Hospital System
      </h1>

      <div className="flex gap-3">
        <button
          onClick={onAdd}
          className="
            inline-flex items-center justify-center gap-2
            w-full sm:w-auto
            px-4 sm:px-5
            py-2.5
            rounded-lg
            bg-blue-900
            text-white
            text-sm font-medium
            hover:bg-blue-800
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition
          "
        >
          <Plus className="w-4 h-4" />
          Add Patient
        </button>
      </div>

    </div>
  );
}