import { Plus } from "lucide-react";

export function PrescriptionHeader({ onAdd }) {

  return (

    <div className="flex justify-between mb-6">

      <h1 className="text-2xl font-semibold">
        Prescriptions
      </h1>

      <button
        onClick={onAdd}
        className="flex gap-2 items-center bg-blue-900 text-white px-4 py-2 rounded"
      >
        <Plus size={16} />
        Add Prescription
      </button>

    </div>

  );

}