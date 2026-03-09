export default function DoctorModal({
  mode,
  formData,
  onChange,
  onSave,
  onClose,
}) {

  const fields = [
    ["doctorId", "Doctor ID"],
    ["name", "Doctor Name"],
    ["specialization", "Specialization"],
    ["department", "Department"],
    ["experience", "Experience"],
    ["phone", "Phone"],
  ];

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6">

        <h2 className="text-lg font-semibold mb-6">
          {mode === "edit" ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {fields.map(([name, label]) => (

            <div key={name} className="flex flex-col gap-1">

              <label className="text-sm font-medium text-slate-700">
                {label}
              </label>

              <input
                name={name}
                value={formData[name] || ""}
                onChange={onChange}
                className="border px-3 py-2 rounded-lg"
              />

            </div>

          ))}

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

    </div>

  );
}