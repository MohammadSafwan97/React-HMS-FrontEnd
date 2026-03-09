import { useState } from "react";

import { patientsMock } from "../mocks/patientmock.js";
import { tabCategoryMap } from "../utils/patients/helper.js";

import PatientHeader from "../components/patients/PatientHeader.jsx";
import PatientSearch from "../components/patients/PatientSearch.jsx";
import PatientCard from "../components/patients/PatientCard.jsx";
import PatientModal from "../components/patients/PatientModal.jsx";
import PatientReportModal from "../components/patients/PatientReportModal.jsx";

export function Patients() {

  /* ---------------- STATE ---------------- */

  const [patients, setPatients] = useState(patientsMock);
  const [activeTab, setActiveTab] = useState("inpatient");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  const [leaves, setLeaves] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [leaveForm, setLeaveForm] = useState({
    patientId: "",
    type: "Routine",
    from: "",
    to: "",
  });

  const [transferForm, setTransferForm] = useState({
    patientId: "",
    fromWard: "",
    toWard: "",
    date: "",
  });

  /* ---------------- DERIVED DATA ---------------- */

  const filteredPatients = patients.filter((patient) => {

    const matchesTab =
      tabCategoryMap[activeTab]?.includes(patient.patientType);

    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.ward.toLowerCase().includes(search.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

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

  const handleSave = () => {

    setPatients((prev) =>
      mode === "edit"
        ? prev.map((p) =>
            p.patientId === formData.patientId ? formData : p
          )
        : [...prev, formData]
    );

    setShowModal(false);
  };

  /* ---------------- DISCHARGE ---------------- */

  const addLeave = (e) => {
    e.preventDefault();

    setLeaves([
      ...leaves,
      { ...leaveForm, id: Date.now().toString() },
    ]);

    setLeaveForm({
      patientId: "",
      type: "Routine",
      from: "",
      to: "",
    });
  };

  /* ---------------- TRANSFER ---------------- */

  const addTransfer = (e) => {
    e.preventDefault();

    setTransfers([
      ...transfers,
      { ...transferForm, id: Date.now().toString() },
    ]);

    setTransferForm({
      patientId: "",
      fromWard: "",
      toWard: "",
      date: "",
    });
  };

  /* ---------------- UI ---------------- */

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

      {/* Patient Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredPatients.map((patient) => (

          <PatientCard
            key={patient.patientId}
            patient={patient}
            onEdit={openEdit}
          />

        ))}
      </div>

      {/* PATIENT DISCHARGE */}

      <section className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">Patient Discharge</h2>

        <form
          onSubmit={addLeave}
          className="grid md:grid-cols-5 gap-3 text-sm mb-4"
        >

          <input
            placeholder="Patient ID"
            className="border px-3 py-2 rounded"
            value={leaveForm.patientId}
            onChange={(e) =>
              setLeaveForm({
                ...leaveForm,
                patientId: e.target.value,
              })
            }
          />

          <select
            className="border px-3 py-2 rounded"
            value={leaveForm.type}
            onChange={(e) =>
              setLeaveForm({
                ...leaveForm,
                type: e.target.value,
              })
            }
          >
            <option>Routine</option>
            <option>Emergency</option>
            <option>Other</option>
          </select>

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={leaveForm.from}
            onChange={(e) =>
              setLeaveForm({
                ...leaveForm,
                from: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={leaveForm.to}
            onChange={(e) =>
              setLeaveForm({
                ...leaveForm,
                to: e.target.value,
              })
            }
          />

          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Discharge Patient
          </button>

        </form>

        {leaves.map((l) => (

          <div key={l.id} className="text-sm border-b py-2">
            {l.patientId} — {l.type} ({l.from} → {l.to})
          </div>

        ))}

      </section>

      {/* WARD TRANSFERS */}

      <section className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">Ward Transfers</h2>

        <form
          onSubmit={addTransfer}
          className="grid md:grid-cols-5 gap-3 text-sm mb-4"
        >

          <input
            placeholder="Patient ID"
            className="border px-3 py-2 rounded"
            value={transferForm.patientId}
            onChange={(e) =>
              setTransferForm({
                ...transferForm,
                patientId: e.target.value,
              })
            }
          />

          <input
            placeholder="From Ward"
            className="border px-3 py-2 rounded"
            value={transferForm.fromWard}
            onChange={(e) =>
              setTransferForm({
                ...transferForm,
                fromWard: e.target.value,
              })
            }
          />

          <input
            placeholder="To Ward"
            className="border px-3 py-2 rounded"
            value={transferForm.toWard}
            onChange={(e) =>
              setTransferForm({
                ...transferForm,
                toWard: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border px-3 py-2 rounded"
            value={transferForm.date}
            onChange={(e) =>
              setTransferForm({
                ...transferForm,
                date: e.target.value,
              })
            }
          />

          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Transfer Patient
          </button>

        </form>

      </section>

      {/* MODALS */}

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

    </div>
  );
}