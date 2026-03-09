export default function Summary({ label, value }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
