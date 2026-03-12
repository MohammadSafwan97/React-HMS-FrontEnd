import { useEffect, useState } from "react";

import { getAllPatients, createPatient, updatePatient ,deletePatient} from "../services/patientService.js";

import PatientHeader from "../components/PatientHeader.jsx";
import PatientSearch from "../components/PatientSearch.jsx";
import PatientCard from "../components/PatientCard.jsx";
import PatientModal from "../components/PatientModal.jsx";
import PatientReportModal from "../components/PatientReportModal.jsx";

import { notifySuccess, notifyError } from "../../../shared/utils/notification.js";

export function Patients() {

  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("INPATIENT");

  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deletePatientId, setDeletePatientId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* ---------------- LOAD PATIENTS ---------------- */

  const loadPatients = async () => {

    try {

      setLoading(true);

      const data = await getAllPatients();

      setPatients(data || []);

    } catch (err) {

      console.error("Failed to load patients:", err);

      notifyError(err?.message || "Failed to load patients");

      setError("Failed to load patients.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadPatients();
  }, []);

  /* ---------------- DELETE PATIENT ---------------- */

  const confirmDelete = async () => {

    const id = deletePatientId;

    if (!id) return;

    const previousPatients = [...patients];

    try {

      setPatients(prev => prev.filter(p => p.id !== id));

      setShowDeleteConfirm(false);

      await deletePatient(id);

      notifySuccess("Patient deleted successfully");

    } catch (err) {

      console.error("Delete failed:", err);

      setPatients(previousPatients);

      notifyError(err?.message || "Failed to delete patient");

    } finally {

      setDeletePatientId(null);

    }

  };

  /* ---------------- FILTERING ---------------- */

  const filteredPatients = patients.filter((patient) => {

    const matchesTab =
      activeTab === "ALL" ||
      patient.patientType === activeTab;

    const matchesBlood =
      !bloodFilter ||
      patient.bloodGroupType === bloodFilter;

    const matchesGender =
      !genderFilter ||
      patient.gender === genderFilter;

    const matchesSearch =

      (patient.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (patient.id || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (patient.phoneNumber || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (patient.email || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    return (
      matchesTab &&
      matchesBlood &&
      matchesGender &&
      matchesSearch
    );

  });

  /* ---------------- GROUPING FOR REPORT ---------------- */

  const grouped = {

    inpatient: patients.filter((p) => p.patientType === "INPATIENT"),
    outpatient: patients.filter((p) => p.patientType === "OUTPATIENT"),
    emergency: patients.filter((p) => p.patientType === "EMERGENCY"),

  };

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {

    setMode("add");
    setFormData({});
    setShowModal(true);

  };

  const openEdit = (patient) => {

    setMode("edit");
    setFormData(patient);
    setShowModal(true);

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value,

    });

  };

  /* ---------------- VALIDATION ---------------- */

  const validatePatient = () => {

    if (!formData.name || !formData.name.trim()) {
      notifyError("Patient name is required");
      return false;
    }

    if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
      notifyError("Phone number is required");
      return false;
    }

    if (!formData.email || !formData.email.trim()) {
      notifyError("Email is required");
      return false;
    }

    if (!formData.gender) {
      notifyError("Please select gender");
      return false;
    }

    if (!formData.bloodGroupType) {
      notifyError("Please select blood group");
      return false;
    }

    if (!formData.patientType) {
      notifyError("Please select patient type");
      return false;
    }

    return true;

  };

  /* ---------------- SAVE PATIENT ---------------- */

  const handleSave = async () => {

    try {

      if (!validatePatient()) return;

      if (mode === "edit") {

        const updatedPatient = await updatePatient(
          formData.id,
          formData
        );

        setPatients((prev) =>
          prev.map((p) =>
            p.id === updatedPatient.id
              ? updatedPatient
              : p
          )
        );

        notifySuccess("Patient updated successfully");

      } else {

        const newPatient = await createPatient(formData);

        setPatients((prev) => [
          ...prev,
          newPatient
        ]);

        notifySuccess("Patient created successfully");

      }

      setShowModal(false);

    } catch (err) {

      console.error("Failed to save patient:", err);

      if (typeof err === "string") {
        notifyError(err);
      } else {
        notifyError(err?.message || "Failed to save patient");
      }

    }

  };

  /* ---------------- RENDER ---------------- */

  return (

    <div className="p-8 text-slate-900 space-y-10">

      <PatientHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* ---------------- TABS ---------------- */}

      <div className="flex gap-2">

        {["INPATIENT", "OUTPATIENT", "EMERGENCY"].map((type) => (

          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === type
                ? "bg-blue-900 text-white"
                : "border"
            }`}
          >
            {type}
          </button>

        ))}

      </div>

      {/* ---------------- SEARCH ---------------- */}

      <PatientSearch
        value={search}
        onChange={setSearch}
      />

      {/* ---------------- EXTRA FILTERS ---------------- */}

      <div className="flex gap-4">

        <select
          value={bloodFilter}
          onChange={(e) => setBloodFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >

          <option value="">All Blood Groups</option>

          <option value="A_POSITIVE">A+</option>
          <option value="A_NEGATIVE">A-</option>
          <option value="B_POSITIVE">B+</option>
          <option value="B_NEGATIVE">B-</option>
          <option value="AB_POSITIVE">AB+</option>
          <option value="AB_NEGATIVE">AB-</option>
          <option value="O_POSITIVE">O+</option>
          <option value="O_NEGATIVE">O-</option>

        </select>

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >

          <option value="">All Genders</option>

          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>

        </select>

      </div>

      {loading && (
        <div className="text-center text-gray-500">
          Loading patients...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredPatients.map((patient) => (

            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={openEdit}
              onDelete={(id) => {
                setDeletePatientId(id);
                setShowDeleteConfirm(true);
              }}
            />

          ))}

        </div>

      )}

      {showModal && (

        <PatientModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

      )}

      {showReport && (

        <PatientReportModal
          patients={patients}
          grouped={grouped}
          onClose={() => setShowReport(false)}
        />

      )}

      {showDeleteConfirm && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white rounded-xl p-6 w-[350px] space-y-4">

            <h3 className="text-lg font-semibold">
              Delete Patient
            </h3>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this patient?
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