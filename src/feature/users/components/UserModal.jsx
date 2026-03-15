export default function UserModal({
  mode,
  formData,
  onChange,
  onSave,
  onClose
}) {

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-lg font-semibold mb-4">

          {mode === "edit"
            ? "Edit User"
            : "Add User"}

        </h2>

        <div className="space-y-4">

          <input
            name="username"
            placeholder="Name"
            value={formData.username || ""}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {mode === "add" && (

            <input
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password || ""}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2"
            />

          )}

          <select
            name="role"
            value={formData.role || ""}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="DOCTOR">Doctor</option>
            <option value="RECEPTIONIST">Receptionist</option>

          </select>

          <select
            name="active"
            value={formData.active ?? true}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value={true}>Active</option>
            <option value={false}>Inactive</option>

          </select>

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
