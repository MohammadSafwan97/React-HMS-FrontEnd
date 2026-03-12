import { User, Mail, Shield, Edit } from "lucide-react";

export default function UserCard({ user, onEdit }) {

  if (!user) return null;

  return (

    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between mb-3">

        <User className="w-8 h-8 text-blue-900" />

        <button onClick={() => onEdit(user)}>
          <Edit className="w-4 h-4 text-slate-600 hover:text-blue-900" />
        </button>

      </div>

      <h3 className="font-semibold text-lg">
        {user?.name || "Unknown User"}
      </h3>

      <div className="flex items-center gap-2 mt-2 text-sm">

        <Mail className="w-4 h-4" />
        {user?.email || "N/A"}

      </div>

      <div className="flex items-center gap-2 mt-2 text-sm">

        <Shield className="w-4 h-4" />
        {user?.role || "N/A"}

      </div>

      <div className="text-sm mt-3">

        Status:

        <span
          className={`ml-2 font-medium ${
            user?.active ? "text-green-600" : "text-red-600"
          }`}
        >
          {user?.active ? "Active" : "Inactive"}
        </span>

      </div>

    </div>

  );

}
