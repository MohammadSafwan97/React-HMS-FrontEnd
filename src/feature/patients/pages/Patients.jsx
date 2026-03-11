import { useEffect, useState } from "react";

import { getAllPatients, createPatient, updatePatient } from "../services/patientService.js";

import PatientHeader from "../components/PatientHeader.jsx";
import PatientSearch from "../components/PatientSearch.jsx";
import PatientCard from "../components/PatientCard.jsx";
import PatientModal from "../components/PatientModal.jsx";
import PatientReportModal from "../components/PatientReportModal.jsx";

import { notifySuccess, notifyError } from "../../../shared/utils/notification.js";

export function Patients() {

  /* ---------------- STATE ---------------- */

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

  /* ---------------- LOAD PATIENTS ---------------- */

  const loadPatients = async () => {

    try {

      setLoading(true);

      const data = await getAllPatients();

      setPatients(data || []);

    } catch (err) {

      console.error("Failed to load patients:", err);

      setError("Failed to load patients.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadPatients();
  }, []);

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

      (patient.patientId || "")
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

  const handleSave = async () => {

    try {

      if (mode === "edit") {

        const updatedPatient = await updatePatient(
          formData.id,
          formData
        );

        setPatients((prev) =>
          prev.map((p) =>
            p.patientId === updatedPatient.patientId
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

      notifyError("Failed to save patient");

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

      {/* ---------------- LOADING ---------------- */}

      {loading && (
        <div className="text-center text-gray-500">
          Loading patients...
        </div>
      )}

      {/* ---------------- ERROR ---------------- */}

      {error && (
        <div className="text-center text-red-500">
          {error}
        </div>
      )}

      {/* ---------------- PATIENT GRID ---------------- */}

      {!loading && !error && (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredPatients.map((patient) => (

            <PatientCard
              key={patient.patientId}
              patient={patient}
              onEdit={openEdit}
            />

          ))}

        </div>

      )}

      {/* ---------------- PATIENT MODAL ---------------- */}

      {showModal && (

        <PatientModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

      )}

      {/* ---------------- REPORT MODAL ---------------- */}

      {showReport && (

        <PatientReportModal
          patients={patients}
          grouped={grouped}
          onClose={() => setShowReport(false)}
        />

      )}

    </div>

  );

}