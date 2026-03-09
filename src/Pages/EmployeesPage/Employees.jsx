import { useState } from 'react';

import { patientsMock } from '../../mocks/patientmock.js';

import PatientHeader from '../../components/patients/PatientHeader.jsx'
import PatientSearch from '../../components/patients/PatientHeader.jsx'
import PatientCard from '../../components/patients/PatientCard';
import PatientModal from '../../components/patients/PatientModal';
import PatientReportModal from '../../components/patients/PatientReportModal';

export function patients() {

  /* ---------------- STATE ---------------- */

  const [patients, setPatients] = useState(patientsMock);
  const [activeTab, setActiveTab] = useState('Inpatient');
  const [search, setSearch] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState('add');
  const [formData, setFormData] = useState({});

  /* -------- DISCHARGE + TRANSFER STATE -------- */

  const [leaves, setLeaves] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [leaveForm, setLeaveForm] = useState({
    patientId: '',
    type: 'Routine',
    from: '',
    to: '',
  });

  const [transferForm, setTransferForm] = useState({
    patientId: '',
    fromWard: '',
    toWard: '',
    date: '',
  });

  /* ---------------- DERIVED DATA ---------------- */

  const filteredPatients = patients.filter((patient) => {

    const matchesTab = activeTab
      ? patient.patientType === activeTab
      : true;

    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.ward.toLowerCase().includes(search.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;

  });

  const grouped = {
    inpatient: patients.filter(p => p.patientType === 'Inpatient'),
    outpatient: patients.filter(p => p.patientType === 'Outpatient'),
    emergency: patients.filter(p => p.patientType === 'Emergency'),
  };

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode('add');
    setFormData({});
    setShowModal(true);
  };

  const openEdit = (patient) => {
    setMode('edit');
    setFormData(patient);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {

    setPatients(prev =>
      mode === 'edit'
        ? prev.map(p =>
            p.patientId === formData.patientId ? formData : p
          )
        : [...prev, formData]
    );

    setShowModal(false);
  };

  /* ---------------- PATIENT DISCHARGE ---------------- */

  const addLeave = (e) => {

    e.preventDefault();

    setLeaves([
      ...leaves,
      { ...leaveForm, id: Date.now().toString() }
    ]);

    setLeaveForm({
      patientId: '',
      type: 'Routine',
      from: '',
      to: '',
    });

  };

  /* ---------------- WARD TRANSFER ---------------- */

  const addTransfer = (e) => {

    e.preventDefault();

    setTransfers([
      ...transfers,
      { ...transferForm, id: Date.now().toString() }
    ]);

    setTransferForm({
      patientId: '',
      fromWard: '',
      toWard: '',
      date: '',
    });

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="p-8 text-slate-900 space-y-10">

      <patientsHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* PATIENT TYPE TABS */}

      <div className="flex gap-2">

        {[
          ['Inpatient', 'Inpatients'],
          ['Outpatient', 'Outpatients'],
          ['Emergency', 'Emergency Patients'],
        ].map(([key, label]) => (

          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === key
                ? 'bg-blue-900 text-white'
                : 'border'
            }`}
          >
            {label}
          </button>

        ))}

      </div>

      <patientsSearch value={search} onChange={setSearch} />

      {/* PATIENT GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredPatients.map((patient) => (

          <patientCard
            key={patient.patientId}
            emp={patient}
            onEdit={openEdit}
          />

        ))}

      </div>

      {/* -------- PATIENT DISCHARGE -------- */}

      <section className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Patient Discharge
        </h2>

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
                patientId: e.target.value
              })
            }
          />

          <select
            className="border px-3 py-2 rounded"
            value={leaveForm.type}
            onChange={(e) =>
              setLeaveForm({
                ...leaveForm,
                type: e.target.value
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
                from: e.target.value
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
                to: e.target.value
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

      {/* -------- WARD TRANSFER -------- */}

      <section className="bg-white border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Ward Transfers
        </h2>

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
                patientId: e.target.value
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
                fromWard: e.target.value
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
                toWard: e.target.value
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
                date: e.target.value
              })
            }
          />

          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Transfer Patient
          </button>

        </form>

        {transfers.map((t) => (

          <div key={t.id} className="text-sm border-b py-2">
            {t.patientId} — {t.fromWard} → {t.toWard} ({t.date})
          </div>

        ))}

      </section>

      {/* MODALS */}

      {showModal && (

        <patientModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

      )}

      {showReport && (

        <patientReportModal
          patients={patients}
          grouped={grouped}
          onClose={() => setShowReport(false)}
        />

      )}

    </div>

  );
}