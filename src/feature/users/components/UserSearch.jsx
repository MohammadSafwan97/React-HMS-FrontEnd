import { Search } from "lucide-react";

export default function UserSearch({ value, onChange }) {

  return (

    <div className="relative">

      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search user by name, email, role or id..."
        className="w-full border rounded-lg pl-9 pr-4 py-2"
      />

    </div>

  );

}
