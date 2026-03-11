import { Eye, Edit } from "lucide-react";

const statusStyles = {
  SCHEDULED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function AppointmentTable({ appointments, patients, doctors, openModal }) {

  return (
    <div className="bg-white border rounded-xl overflow-hidden">

      {/* Scroll container */}
      <div className="max-h-[500px] overflow-y-auto">

        <table className="w-full">

          <thead className="bg-slate-50 border-b sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {appointments?.map((a) => {

              if (!a) return null;

              const patient = patients.find((p) => p.id === a.patientId);
              const doctor = doctors.find((d) => d.id === a.doctorId);

              return (
                <tr key={a.id} className="border-b hover:bg-slate-50">

                  <td className="px-6 py-4">{a.id}</td>

                  <td className="px-6 py-4">
                    {patient ? `${patient.name} (ID:${patient.id})` : "-"}
                  </td>

                  <td className="px-6 py-4">
                    {doctor ? `${doctor.name} (ID:${doctor.id})` : "-"}
                  </td>

                  <td className="px-6 py-4">{a.appointmentDate}</td>

                  <td className="px-6 py-4">{a.appointmentTime}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        statusStyles[a.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => openModal(a, "view")}
                      className="text-slate-600 hover:text-blue-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => openModal(a, "edit")}
                      className="text-slate-600 hover:text-green-600"
                    >
                      <Edit size={16} />
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
