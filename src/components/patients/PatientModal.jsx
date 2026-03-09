import { getIdLabel } from '../../utils/patients/helper.js';

export default function PatientModal({
  mode,
  formData,
  onChange,
  onSave,
  onClose,
}) {

  const fields = [
    ['name', 'Full Name'],
    ['patientId', 'Patient ID'],
    ['ward', 'Ward'],
    ['department', 'Department'],
    ['patientType', 'Patient Type'],
    ['admissionDate', 'Admission Date'],
    ['cnic', 'CNIC'],
    ['bloodGroup', 'Blood Group'],
    ['phone', 'Phone'],
    ['medicalRecordNumber', 'Medical Record No'],
    ['emergencyContactName', 'Emergency Contact Name'],
    ['emergencyContactPhone', 'Emergency Contact Phone'],
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-3xl p-6">

        <h2 className="text-lg font-semibold mb-6">
          {mode === 'edit' ? 'Edit Patient' : 'Add Patient'}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          {fields.map(([name, label]) => (

            <div key={name} className="flex flex-col gap-1">

              <label className="text-sm font-medium text-slate-700">
                {name === 'patientId'
                  ? getIdLabel(formData.patientType)
                  : label}
              </label>

              <input
                name={name}
                type={name === 'admissionDate' ? 'date' : 'text'}
                value={formData[name] || ''}
                onChange={onChange}
                className="border px-3 py-2 rounded-lg text-sm"
              />

            </div>

          ))}

        </div>

        <div className="flex justify-end gap-3 mt-8">

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
            Save Patient
          </button>

        </div>

      </div>

    </div>
  );
}