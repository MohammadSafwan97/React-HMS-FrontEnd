import { Plus, FileText } from "lucide-react";

export default function DoctorHeader({ onAdd, onReport }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      
      <h1 className="text-lg sm:text-2xl font-semibold">
        Doctor Management
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

        <button
          onClick={onReport}
          className="
            flex items-center justify-center gap-2
            border border-slate-300
            px-4 py-2.5
            rounded-lg
            text-sm
            hover:bg-slate-50
            transition
            w-full sm:w-auto
          "
        >
          <FileText className="w-4 h-4" />
          Report
        </button>

        <button
          onClick={onAdd}
          className="
            flex items-center justify-center gap-2
            bg-blue-900 text-white
            px-4 py-2.5
            rounded-lg
            text-sm font-medium
            hover:bg-blue-800
            transition
            w-full sm:w-auto
          "
        >
          <Plus className="w-4 h-4" />
          Add Doctor
        </button>

      </div>
    </div>
  );
}