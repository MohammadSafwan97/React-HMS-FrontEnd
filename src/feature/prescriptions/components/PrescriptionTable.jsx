import { Eye, Edit, Printer, Trash2 } from "lucide-react";

export function PrescriptionTable({
  prescriptions,
  patients,
  doctors,
  onView,
  onEdit,
  onDelete
}) {

  return (

    <div className="bg-white border rounded-xl overflow-hidden">

      <div className="max-h-[65vh] overflow-y-auto">

        <table className="w-full">

          <thead className="bg-slate-50 border-b sticky top-0">

            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Doctor</th>
              <th className="p-4 text-left">Diagnosis</th>
              <th className="p-4 text-left">Medicines</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {prescriptions.map(p => {

              const patient = patients.find(pt => pt.id === p.patientId);
              const doctor = doctors.find(d => d.id === p.doctorId);

              return (

                <tr key={p.id} className="border-b">

                  <td className="p-4">{p.id}</td>
                  <td className="p-4">{patient?.name}</td>
                  <td className="p-4">{doctor?.name}</td>
                  <td className="p-4">{p.diagnosis}</td>

                  <td className="p-4">
                    {(p.items || []).map(i => i.medicine).join(", ")}
                  </td>

                  <td className="p-4 flex gap-3">

                    <button onClick={() => onView(p)}>
                      <Eye size={16} />
                    </button>

                    <button onClick={() => onEdit(p)}>
                      <Edit size={16} />
                    </button>

                    <button onClick={() => onDelete(p.id)}>
                      <Trash2 size={16} />
                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

}