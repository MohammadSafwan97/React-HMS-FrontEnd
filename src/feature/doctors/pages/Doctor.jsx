import { useEffect, useState } from "react";
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from "../services/doctorService.js";

import DoctorHeader from "../components/DoctorHeader.jsx";
import DoctorSearch from "../components/DoctorSearch.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import DoctorModal from "../components/DoctorModal.jsx";
import DoctorReportModal from "../components/DoctorReportModal.jsx";

import { notifySuccess, notifyError } from "../../../shared/utils/notification.js";

export function Doctors() {

  /* ---------------- STATE ---------------- */

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [loading, setLoading] = useState(true);

  /* ---------------- SPECIALIZATION → DEPARTMENT MAP ---------------- */

  const specializationToDepartment = {

    Cardiologist: "Cardiology",
    "Cardiac Surgeon": "Cardiology",

    Neurologist: "Neurology",
    "Neuro Surgeon": "Neurology",

    "Orthopedic Surgeon": "Orthopedics",
    "Spine Specialist": "Orthopedics",

    Pediatrician: "Pediatrics",

    Radiologist: "Radiology",

    "General Physician": "General Medicine",

    "Emergency Specialist": "Emergency",

  };

  /* ---------------- LOAD DOCTORS ---------------- */

  const loadDoctors = async () => {

    try {

      setLoading(true);

      const data = await getAllDoctors();

      setDoctors(data || []);

    } catch (error) {

      console.error("Failed to load doctors:", error);

      notifyError(error?.message || "Failed to load doctors");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadDoctors();
  }, []);

  /* ---------------- FILTER ---------------- */

  const filteredDoctors = doctors.filter((doctor) => {

    const name = doctor.name || "";
    const specialization = doctor.specialization || "";
    const id = doctor.id ? doctor.id.toString() : "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      specialization.toLowerCase().includes(search.toLowerCase()) ||
      id.includes(search)
    );

  });

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {

    setMode("add");
    setFormData({});
    setShowModal(true);

  };

  const openEdit = (doctor) => {

    const department =
      specializationToDepartment[doctor.specialization] || "";

    setMode("edit");

    setFormData({
      ...doctor,
      department: department
    });

    setShowModal(true);

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { specialization: "" })
    }));

  };

  /* ---------------- VALIDATION ---------------- */

  const validateDoctor = () => {

    const name = String(formData.name || "").trim();
    const specialization = String(formData.specialization || "").trim();
    const phone = String(formData.phoneNo || "").trim();
    const email = String(formData.email || "").trim();

    if (!name) {
      notifyError("Doctor name is required");
      return false;
    }

    if (!specialization) {
      notifyError("Specialization is required");
      return false;
    }

    if (!phone) {
      notifyError("Phone number is required");
      return false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;

    if (!phoneRegex.test(phone)) {
      notifyError("Enter a valid phone number");
      return false;
    }

    if (!email) {
      notifyError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      notifyError("Enter a valid email address");
      return false;
    }

    const duplicate = doctors.find(
      d =>
        d.email?.toLowerCase() === email.toLowerCase() &&
        d.id !== formData.id
    );

    if (duplicate) {
      notifyError("Email already exists for another doctor");
      return false;
    }

    return true;

  };

  /* ---------------- SAVE DOCTOR ---------------- */

  const handleSave = async () => {

    try {

      if (!validateDoctor()) return;

      if (mode === "edit") {

        const updatedDoctor = await updateDoctor(
          formData.id,
          formData
        );

        setDoctors(prev =>
          prev.map(d =>
            d.id === updatedDoctor.id ? updatedDoctor : d
          )
        );

        notifySuccess("Doctor updated successfully");

      } else {

        const newDoctor = await createDoctor(formData);

        setDoctors(prev => [...prev, newDoctor]);

        notifySuccess("Doctor created successfully");

      }

      setShowModal(false);

    } catch (error) {

      console.error("Error saving doctor:", error);

      if (typeof error === "string") {
        notifyError(error);
      } else {
        notifyError(error?.message || "Failed to save doctor");
      }

    }

  };

  /* ---------------- DELETE ---------------- */

  const confirmDelete = async () => {

    const id = deleteDoctorId;

    if (!id) return;

    const previousDoctors = [...doctors];

    try {

      setDoctors(prev => prev.filter(d => d.id !== id));

      setShowDeleteConfirm(false);

      await deleteDoctor(id);

      notifySuccess("Doctor deleted successfully");

    } catch (err) {

      console.error("Delete failed:", err);

      setDoctors(previousDoctors);

      notifyError(err?.message || "Failed to delete doctor");

    } finally {

      setDeleteDoctorId(null);

    }

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="p-8 text-slate-900 space-y-10">

      <DoctorHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      <DoctorSearch
        value={search}
        onChange={setSearch}
      />

      {loading && (
        <div className="text-center text-gray-500">
          Loading doctors...
        </div>
      )}

      {!loading && filteredDoctors.length === 0 && (

        <div className="text-center text-slate-500 py-10">
          No doctors found
        </div>

      )}

      {!loading && filteredDoctors.length > 0 && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredDoctors.map((doctor) => (

            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onEdit={openEdit}
              onDelete={(id) => {
                setDeleteDoctorId(id);
                setShowDeleteConfirm(true);
              }}
            />

          ))}

        </div>

      )}

      {showModal && (

        <DoctorModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

      )}

      {showReport && (

        <DoctorReportModal
          doctors={doctors}
          onClose={() => setShowReport(false)}
        />

      )}

      {showDeleteConfirm && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white rounded-xl p-6 w-[350px] space-y-4">

            <h3 className="text-lg font-semibold">
              Delete Doctor
            </h3>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this doctor?
              This action cannot be undone.
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