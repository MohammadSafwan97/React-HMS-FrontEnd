import { User, Edit, Phone } from 'lucide-react';
import { getIdLabel } from '../../utils/patients/helper.js';

export default function PatientCard({ emp, onEdit }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex justify-between mb-3">
        <User className="w-8 h-8 text-blue-900" />
        <button onClick={() => onEdit(emp)}>
          <Edit className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <h3 className="font-medium">{emp.name}</h3>
      <p className="text-sm text-slate-600">Ward: {emp.designation}</p>

      <div className="text-sm mt-3 space-y-1">
        <div>{getIdLabel(emp.category)}: {emp.id}</div>
        <div>Patient Type: {emp.category}</div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-sm">
        <Phone className="w-4 h-4" /> {emp.phone}
      </div>
    </div>
  );
}
