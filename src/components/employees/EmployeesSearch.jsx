import { Search } from 'lucide-react';

export default function EmployeesSearch({ value, onChange }) {
  return (
    <div className="relative mb-6 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, designation or ID..."
        className="w-full pl-9 pr-4 py-2 border rounded-lg"
      />
    </div>
  );
}
