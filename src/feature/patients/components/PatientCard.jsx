import { User, Edit, Phone, Mail, Trash2 } from "lucide-react";

export default function PatientCard({ patient, onEdit, onDelete }) {

  if (!patient) return null;

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between mb-3">

        <User className="w-8 h-8 text-blue-900" />

        <div className="flex gap-2">

          <button onClick={() => onEdit(patient)}>
            <Edit className="w-4 h-4 text-slate-600 hover:text-blue-900" />
          </button>

          <button
            onClick={() => onDelete(patient.id)}
          >
            <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
          </button>

        </div>

      </div>

      <h3 className="font-semibold text-lg">
        {patient?.name || "Unknown Patient"}
      </h3>

      <p className="text-sm text-slate-600">
        Blood Group: {patient?.bloodGroupType || "N/A"}
      </p>

      <div className="text-sm mt-3 space-y-1">

        <div>
          Patient ID: {patient?.patientId || "N/A"}
        </div>

        <div>
          Type: {patient?.patientType || "N/A"}
        </div>

        <div>
          Gender: {patient?.gender || "N/A"}
        </div>

      </div>

      <div className="flex items-center gap-2 mt-3 text-sm">

        <Phone className="w-4 h-4" />
        {patient?.phoneNumber || "N/A"}

      </div>

      <div className="flex items-center gap-2 mt-2 text-sm">

        <Mail className="w-4 h-4" />
        {patient?.email || "N/A"}

      </div>

    </div>

  );
}