import { Stethoscope, Phone, Mail, Edit, Trash2 } from "lucide-react";

export default function DoctorCard({ doctor, onEdit, onDelete }) {

  if (!doctor) return null;

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      {/* Header */}
      <div className="flex justify-between mb-3">

        <Stethoscope className="w-8 h-8 text-blue-900" />

        <div className="flex gap-2">

          <button onClick={() => onEdit(doctor)}>
            <Edit className="w-4 h-4 text-slate-600 hover:text-blue-900" />
          </button>

          <button onClick={() => onDelete(doctor.id)}>
            <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
          </button>

        </div>

      </div>

      <h3 className="font-semibold text-lg">
        {doctor?.name || "Unknown Doctor"}
      </h3>

      <p className="text-sm text-slate-600">
        {doctor?.specialization || "N/A"}
      </p>

      <div className="text-sm mt-3 space-y-1">

        

        <div>
          Experience: {doctor?.experience ?? 0} years
        </div>

      </div>

      {/* Contact */}
      <div className="flex items-center gap-2 mt-3 text-sm">

        <Phone className="w-4 h-4" />
        {doctor?.phoneNo || "N/A"}

      </div>

      <div className="flex items-center gap-2 mt-2 text-sm">

        <Mail className="w-4 h-4" />
        {doctor?.email || "N/A"}

      </div>

    </div>

  );
}
