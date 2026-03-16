export default function DoctorModal({
  mode,
  formData,
  onChange,
  onSave,
  onClose,
}) {

  const fields = [
    ["name", "Doctor Name", "text"],
    ["email", "Email", "email"],
    ["department", "Department", "select"],
    ["specialization", "Specialization", "select"],
    ["experience", "Experience (Years)", "number"],
    ["phoneNo", "Phone", "tel"], 
  ];

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "General Medicine",
    "Emergency",
  ];

  const specializationMap = {
    Cardiology: ["Cardiologist", "Cardiac Surgeon"],
    Neurology: ["Neurologist", "Neuro Surgeon"],
    Orthopedics: ["Orthopedic Surgeon", "Spine Specialist"],
    Pediatrics: ["Pediatrician"],
    Radiology: ["Radiologist"],
    "General Medicine": ["General Physician"],
    Emergency: ["Emergency Specialist"],
  };

  const specializations =
    specializationMap[formData.department] || [];
    

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl w-full max-w-2xl p-6">

        <h2 className="text-lg font-semibold mb-6">
          {mode === "edit" ? "Edit Doctor" : "Add Doctor"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {fields.map(([name, label, type]) => (

            <div key={name} className="flex flex-col gap-1">

              <label className="text-sm font-medium text-slate-700">
                {label}
              </label>

              {type === "select" && name === "department" && (

                <select
                  required
                  name={name}
                  value={formData[name] || ""}
                  onChange={onChange}
                  className="border px-3 py-2 rounded-lg"
                >
                  <option value="">Select Department</option>

                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}

                </select>

              )}

              {type === "select" && name === "specialization" && (

                <select
                  required
                  name={name}
                  value={formData[name] || ""}
                  onChange={onChange}
                  className="border px-3 py-2 rounded-lg"
                  disabled={!formData.department}
                >
                  <option value="">
                    {formData.department
                      ? "Select Specialization"
                      : "Select Department First"}
                  </option>

                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}

                </select>

              )}

              {type !== "select" && (

                <input
                  type={type}
                  required
                  name={name}
                  value={formData[name] || ""}
                  onChange={onChange}
                  className="border px-3 py-2 rounded-lg"
                />

              )}

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