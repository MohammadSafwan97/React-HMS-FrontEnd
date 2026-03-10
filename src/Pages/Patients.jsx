import { useEffect, useState } from "react";

import { tabCategoryMap } from "../utils/patients/helper.js";
import { getAllPatients, createPatient, updatePatient } from "../services/patientService.js";

import PatientHeader from "../components/patients/PatientHeader.jsx";
import PatientSearch from "../components/patients/PatientSearch.jsx";
import PatientCard from "../components/patients/PatientCard.jsx";
import PatientModal from "../components/patients/PatientModal.jsx";
import PatientReportModal from "../components/patients/PatientReportModal.jsx";

export function Patients() {

  /* ---------------- STATE ---------------- */

  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("inpatient");
  const [search, setSearch] = useState("");

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
      tabCategoryMap[activeTab]?.includes(patient.patientType);

    const matchesSearch =
      (patient.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (patient.ward || "").toLowerCase().includes(search.toLowerCase()) ||
      (patient.patientId || "").toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  /* ---------------- GROUPING FOR REPORT ---------------- */

  const grouped = {
    inpatient: patients.filter((p) => p.patientType === "Inpatient"),
    outpatient: patients.filter((p) => p.patientType === "Outpatient"),
    emergency: patients.filter((p) => p.patientType === "Emergency"),
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
          formData.patientId,
          formData
        );

        setPatients((prev) =>
          prev.map((p) =>
            p.patientId === updatedPatient.patientId
              ? updatedPatient
              : p
          )
        );

      } else {

        const newPatient = await createPatient(formData);

        setPatients((prev) => [
          ...prev,
          newPatient
        ]);
      }

      setShowModal(false);

    } catch (err) {

      console.error("Failed to save patient:", err);
      alert("Failed to save patient. Please try again.");

    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="p-8 text-slate-900 space-y-10">

      <PatientHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* Tabs */}

      <div className="flex gap-2">

        {[
          ["inpatient", "Inpatients"],
          ["outpatient", "Outpatients"],
          ["emergency", "Emergency Patients"],
        ].map(([key, label]) => (

          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === key
                ? "bg-blue-900 text-white"
                : "border"
            }`}
          >
            {label}
          </button>

        ))}

      </div>

      <PatientSearch value={search} onChange={setSearch} />

      {/* Loading */}

      {loading && (
        <div className="text-center text-gray-500">
          Loading patients...
        </div>
      )}

      {/* Error */}

      {error && (
        <div className="text-center text-red-500">
          {error}
        </div>
      )}

      {/* Patient Grid */}

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

      {/* Patient Modal */}

      {showModal && (
        <PatientModal
          onChange={handleChange}
          onSave={handleSave}
          formData={formData}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Report Modal */}

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