import { useEffect, useState } from "react";
// import { getAllUsers, createUser, updateUser } from "../services/userService.js";

import UserHeader from "../components/UserHeader.jsx";
import UserSearch from "../components/UserSearch.jsx";
import UserCard from "../components/UserCard.jsx";
import UserModal from "../components/UserModal.jsx";
import UserReportModal from "../components/UserReportModal.jsx";

import { notifySuccess, notifyError } from "../../../shared/utils/notification.js";

export function User() {

  /* ---------------- STATE ---------------- */

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  /* ---------------- LOAD USERS ---------------- */

  useEffect(() => {

    const loadUsers = async () => {

      try {

        const data = await getAllUsers();
        setUsers(data);

      } catch (error) {

        console.log("Error loading users", error);
        notifyError("Failed to load users");

      }

    };

    loadUsers();

  }, []);

  /* ---------------- FILTER USERS ---------------- */

  const filteredUsers = users.filter((user) => {

    const name = user.name || "";
    const email = user.email || "";
    const role = user.role || "";
    const id = user.id ? user.id.toString() : "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      role.toLowerCase().includes(search.toLowerCase()) ||
      id.includes(search)
    );

  });

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {

    setMode("add");
    setFormData({});
    setShowModal(true);

  };

  const openEdit = (user) => {

    setMode("edit");
    setFormData(user);
    setShowModal(true);

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /* ---------------- SAVE USER ---------------- */

  const handleSave = async () => {

    try {

      if (mode === "edit") {

        const updatedUser = await updateUser(
          formData.id,
          formData
        );

        setUsers((prev) =>
          prev.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );

        notifySuccess("User updated successfully");

      } else {

        const newUser = await createUser(formData);

        setUsers((prev) => [
          ...prev,
          newUser
        ]);

        notifySuccess("User created successfully");

      }

    } catch (error) {

      console.log("Error saving user", error);
      notifyError("Failed to save user");

    }

    setShowModal(false);

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="p-8 text-slate-900 space-y-10">

      {/* HEADER */}

      <UserHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* SEARCH */}

      <UserSearch
        value={search}
        onChange={setSearch}
      />

      {/* USERS GRID */}

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
            />

          ))}

        </div>

      )}

      {/* MODALS */}

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

    </div>

  );

}
