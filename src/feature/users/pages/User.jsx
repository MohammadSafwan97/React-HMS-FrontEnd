import { useEffect, useState } from "react";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../services/userService";

import UserHeader from "../components/UserHeader.jsx";
import UserSearch from "../components/UserSearch.jsx";
import UserCard from "../components/UserCard.jsx";
import UserModal from "../components/UserModal.jsx";
import UserReportModal from "../components/UserReportModal.jsx";

import { notifySuccess, notifyError } from "../../../shared/utils/notification";

export function User() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* ---------------- LOAD USERS ---------------- */

  const loadUsers = async () => {

    try {

      const data = await getAllUsers();
      setUsers(data || []);

    } catch (error) {

      console.log("Error loading users", error);
      notifyError("Failed to load users");

    }

  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ---------------- FILTER USERS ---------------- */

  const filteredUsers = (users || []).filter((user) => {

    const name = user?.username || "";
    const email = user?.email || "";
    const role = user?.role || "";
    const id = user?.id ? user.id.toString() : "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      role.toLowerCase().includes(search.toLowerCase()) ||
      id.includes(search)
    );

  });

  /* ---------------- OPEN ADD ---------------- */

  const openAdd = () => {

    setMode("add");

    setFormData({
      id: null,
      name: "",
      email: "",
      role: ""
    });

    setShowModal(true);

  };

  /* ---------------- OPEN EDIT ---------------- */

  const openEdit = (user) => {

    if (!user) return;

    setMode("edit");

    setFormData({
      id: user.id,
      name: user.username || "",
      email: user.email || "",
      role: user.role || ""
    });

    setShowModal(true);

  };

  /* ---------------- FORM CHANGE ---------------- */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  /* ---------------- SAVE USER ---------------- */

  const handleSave = async () => {

    try {

      if (mode === "edit" && formData.id) {

        const updatedUser = await updateUser(
          formData.id,
          formData
        );

        setUsers(prev =>
          prev.map(u =>
            u.id === updatedUser.id ? updatedUser : u
          )
        );

        notifySuccess("User updated successfully");

      } else {

        const newUser = await createUser(formData);

        setUsers(prev => [...prev, newUser]);

        notifySuccess("User created successfully");

      }

    } catch (error) {

      console.log("Error saving user", error);
      notifyError("Failed to save user");

    }

    setShowModal(false);

  };

  /* ---------------- DELETE USER ---------------- */

  const confirmDelete = async () => {

    const id = deleteId;

    if (!id) return;

    const previous = [...users];

    try {

      setUsers(prev =>
        prev.filter(user => user.id !== id)
      );

      setShowDeleteConfirm(false);

      await deleteUser(id);

      notifySuccess("User deleted successfully");

    } catch (error) {

      console.log("Delete failed", error);

      setUsers(previous);

      notifyError("Failed to delete user");

    } finally {

      setDeleteId(null);

    }

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="p-8 text-slate-900 space-y-10">

      <UserHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      <UserSearch
        value={search}
        onChange={setSearch}
      />

      {filteredUsers.length === 0 ? (

        <div className="text-center text-slate-500 py-10">
          No users found
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredUsers.map((user) => (

            <UserCard
              key={user.id}
              user={user}
              onEdit={openEdit}
              onDelete={(id) => {
                setDeleteId(id);
                setShowDeleteConfirm(true);
              }}
            />

          ))}

        </div>

      )}

      {showModal && (

        <UserModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

      )}

      {showReport && (

        <UserReportModal
          users={users}
          onClose={() => setShowReport(false)}
        />

      )}

      {showDeleteConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[350px] space-y-4">

            <h3 className="text-lg font-semibold">
              Delete User
            </h3>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}