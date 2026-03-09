import { User, Edit, Phone } from "lucide-react";

export default function PatientCard({ patient, onEdit }) {

  if (!patient) return null;

  return (
    <div className="bg-white border rounded-xl p-6">

      <div className="flex justify-between mb-3">
        <User className="w-8 h-8 text-blue-900" />

        <button onClick={() => onEdit(patient)}>
          <Edit className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <h3 className="font-medium">{patient.name}</h3>

      <p className="text-sm text-slate-600">
        Ward: {patient.ward}
      </p>

      <div className="text-sm mt-3 space-y-1">

        <div>
          Patient ID: {patient.patientId}
        </div>

        <div>
          Type: {patient.patientType}
        </div>

      </div>

      <div className="flex items-center gap-2 mt-3 text-sm">
        <Phone className="w-4 h-4" />
        {patient.phone}
      </div>

    </div>
  );
}