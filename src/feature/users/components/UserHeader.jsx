import { Plus, FileText } from "lucide-react";

export default function UserHeader({ onAdd, onReport }) {

  return (

    <div className="flex justify-between items-center">

      <div>

        <h1 className="text-2xl font-semibold">
          Users
        </h1>

        <p className="text-sm text-slate-500">
          Manage system users and roles
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={onReport}
          className="border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-100"
        >
          <FileText size={16} />
          Report
        </button>

        <button
          onClick={onAdd}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={16} />
          Add User
        </button>

      </div>

    </div>

  );

}
