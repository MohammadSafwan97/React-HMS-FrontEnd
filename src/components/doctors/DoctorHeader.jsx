import { Plus, FileText } from "lucide-react";

export default function DoctorHeader({ onAdd, onReport }) {

  return (

    <div className="flex justify-between items-center">

      <h1 className="text-2xl font-semibold">
        Doctor Management
      </h1>

      <div className="flex gap-3">

        <button
          onClick={onReport}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg"
        >
          <FileText className="w-4 h-4" />
          Report
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Doctor
        </button>

      </div>

    </div>

  );
}