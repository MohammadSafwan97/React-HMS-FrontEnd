import { useState } from "react";

export default function PatientModal({
  mode,
  formData,
  onChange,
  onSave,
  onClose,
}) {

  const [errors, setErrors] = useState({});

  const bloodGroups = [
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ];

  const patientTypes = [
    "INPATIENT",
    "OUTPATIENT",
    "EMERGENCY"
  ];

  const genders = [
    "MALE",
    "FEMALE",
    "OTHER"
  ];

  /* ---------- CLIENT VALIDATION ---------- */

  const validate = () => {

    const newErrors = {};

    if (!formData.name?.trim())
      newErrors.name = "Name is required";

    if (!formData.patientId?.trim())
      newErrors.patientId = "Patient ID is required";

    if (!formData.email?.includes("@"))
      newErrors.email = "Valid email required";

    if (!formData.phoneNumber?.match(/^\+?[0-9]{10,15}$/))
      newErrors.phoneNumber = "Invalid phone number";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth required";

    if (!formData.gender)
      newErrors.gender = "Gender required";

    if (!formData.patientType)
      newErrors.patientType = "Patient type required";

    if (!formData.bloodGroupType)
      newErrors.bloodGroupType = "Blood group required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = () => {

    if (validate()) {
      onSave();
    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[80vh] overflow-y-auto">

        <h2 className="text-lg font-semibold mb-6">
          {mode === "edit" ? "Edit Patient" : "Add Patient"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Patient ID */}

          <Field
            label="Patient ID"
            name="patientId"
            value={formData.patientId}
            onChange={onChange}
            error={errors.patientId}
          />

          {/* Name */}

          <Field
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            error={errors.name}
          />

          {/* Date of Birth */}

          <Field
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={onChange}
            error={errors.dateOfBirth}
          />

          {/* Gender */}

          <Select
            label="Gender"
            name="gender"
            options={genders}
            value={formData.gender}
            onChange={onChange}
            error={errors.gender}
          />

          {/* Blood Group */}

          <Select
            label="Blood Group"
            name="bloodGroupType"
            options={bloodGroups}
            value={formData.bloodGroupType}
            onChange={onChange}
            error={errors.bloodGroupType}
          />

          {/* Patient Type */}

          <Select
            label="Patient Type"
            name="patientType"
            options={patientTypes}
            value={formData.patientType}
            onChange={onChange}
            error={errors.patientType}
          />

          {/* Email */}

          <Field
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
          />

          {/* Phone */}

          <Field
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onChange}
            error={errors.phoneNumber}
          />

          {/* Address */}

          <Field
            label="Address"
            name="address"
            value={formData.address}
            onChange={onChange}
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg"
          >
            Save Patient
          </button>

        </div>

      </div>

    </div>

  );
}

/* ---------- Reusable Field ---------- */

function Field({ label, name, value, onChange, type = "text", error }) {

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        className={`border px-3 py-2 rounded-lg text-sm ${
          error ? "border-red-500" : ""
        }`}
      />

      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}

    </div>
  );
}

/* ---------- Reusable Select ---------- */

function Select({ label, name, options, value, onChange, error }) {

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`border px-3 py-2 rounded-lg text-sm ${
          error ? "border-red-500" : ""
        }`}
      >

        <option value="">Select</option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}

      </select>

      {error && (
        <span className="text-red-500 text-xs">{error}</span>
      )}

    </div>
  );
}
