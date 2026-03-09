import { Printer } from "lucide-react";

export default function DoctorReportModal({ doctors, onClose }) {

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-4xl p-6">

        <div className="flex justify-between mb-4">

          <h2 className="font-semibold text-lg">
            Doctor Report
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <button
          onClick={() => window.print()}
          className="border px-4 py-2 rounded-lg mb-4"
        >
          <Printer className="w-4 h-4 inline mr-2" />
          Print
        </button>

        <table className="w-full border">

          <thead className="bg-slate-100">

            <tr>
              {["Name", "Specialization", "Department", "Experience", "Phone"].map(
                (h) => (
                  <th key={h} className="border px-3 py-2 text-left">
                    {h}
                  </th>
                )
              )}
            </tr>

          </thead>

          <tbody>

            {doctors.map((d) => (

              <tr key={d.doctorId}>

                <td className="border px-3 py-2">
                  {d.name}
                </td>

                <td className="border px-3 py-2">
                  {d.specialization}
                </td>

                <td className="border px-3 py-2">
                  {d.department}
                </td>

                <td className="border px-3 py-2">
                  {d.experience}
                </td>

                <td className="border px-3 py-2">
                  {d.phone}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}