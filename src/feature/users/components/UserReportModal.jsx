import { X } from "lucide-react";

export default function UserReportModal({ users, onClose }) {

  const printReport = () => {
    window.print();
  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-full max-w-3xl">

        <div className="flex justify-between mb-4">

          <h2 className="text-lg font-semibold">
            Users Report
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>

        </div>

        <table className="w-full border">

          <thead className="bg-slate-50">

            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {users.map((u) => (

              <tr key={u.id} className="border-t">

                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  {u.active ? "Active" : "Inactive"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className="flex justify-end mt-4">

          <button
            onClick={printReport}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Print
          </button>

        </div>

      </div>

    </div>

  );

}
