import { getIdLabel } from '../../utils/employees/helper.js';

export default function EmployeeModal({
  mode,
  formData,
  onChange,
  onSave,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6">
        <h2 className="font-semibold mb-4">
          {mode === 'edit' ? 'Edit Employee' : 'Add Employee'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {[
            ['name','Full Name'],
            ['designation','Designation'],
            ['department','Department'],
            ['category','Category'],
            ['id', getIdLabel(formData.category)],
            ['cnic','CNIC'],
            ['bloodGroup','Blood Group'],
            ['phone','Phone'],
            ['snid','SNID No'],
            ['nok','Next of Kin'],
            ['nokPhone','NOK Phone'],
          ].map(([name, label]) => (
            <input
              key={name}
              name={name}
              placeholder={label}
              value={formData[name] || ''}
              onChange={onChange}
              className="border px-3 py-2 rounded-lg"
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button onClick={onSave} className="bg-blue-900 text-white px-4 py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
