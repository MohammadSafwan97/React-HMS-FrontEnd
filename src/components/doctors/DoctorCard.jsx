import { Stethoscope, Phone, Edit } from "lucide-react";

export default function DoctorCard({ doctor, onEdit }) {

  if (!doctor) return null;

  return (

    <div className="bg-white border rounded-xl p-6">

      <div className="flex justify-between mb-3">

        <Stethoscope className="w-8 h-8 text-blue-900" />

        <button onClick={() => onEdit(doctor)}>
          <Edit className="w-4 h-4 text-slate-600" />
        </button>

      </div>

      <h3 className="font-medium text-lg">
        {doctor.name}
      </h3>

      <p className="text-sm text-slate-600">
        {doctor.specialization}
      </p>

      <div className="text-sm mt-3 space-y-1">

        <div>
          Doctor ID: {doctor.doctorId}
        </div>

        <div>
          Department: {doctor.department}
        </div>

        <div>
          Experience: {doctor.experience}
        </div>

      </div>

      <div className="flex items-center gap-2 mt-3 text-sm">

        <Phone className="w-4 h-4" />

        {doctor.phone}

      </div>

    </div>

  );
}