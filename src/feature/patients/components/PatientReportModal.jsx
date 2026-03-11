import { Printer } from 'lucide-react';
import Summary from './Summary';

export default function PatientReportModal({ employees, grouped, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Patient Report</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Summary label="Total" value={employees.length} />
          <Summary label="InPatient" value={grouped.uniform.length} />
          <Summary label="OutPatient" value={grouped.civilian.length} />
          <Summary label="Emergency" value={grouped.contract.length} />
        </div>

        <button onClick={() => window.print()} className="btn border mb-4">
          <Printer className="w-4 h-4" /> Print
        </button>

        <table className="w-full border">
          <thead className="bg-slate-100">
            <tr>
              {['Name','Designation','Category','ID','Phone'].map(h => (
                <th key={h} className="border px-3 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.uid}>
                <td className="border px-3 py-2">{e.name}</td>
                <td className="border px-3 py-2">{e.designation}</td>
                <td className="border px-3 py-2">{e.category}</td>
                <td className="border px-3 py-2">{e.id}</td>
                <td className="border px-3 py-2">{e.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
