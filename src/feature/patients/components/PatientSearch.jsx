import { Search } from "lucide-react";

export default function PatientSearch({ value, onChange }) {
  return (
    <div className="relative mb-4 sm:mb-6 w-full sm:max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by patient name, ward or ID..."
        className="
          w-full
          pl-9 pr-4
          py-2.5
          text-sm
          border
          border-slate-300
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
        "
      />
    </div>
  );
}