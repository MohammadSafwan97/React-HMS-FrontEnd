import { useState } from 'react';

import { employeesMock } from '../../mocks/employeemock.js';
import { tabCategoryMap } from '../../utils/employees/helper.js';

import EmployeesHeader from '../../components/employees/EmployeesHeader';
import EmployeesSearch from '../../components/employees/EmployeesSearch';
import EmployeeCard from '../../components/employees/EmployeeCard';
import EmployeeModal from '../../components/employees/EmployeeModal';
import EmployeeReportModal from '../../components/employees/EmployeeReportModal';

export function Employees() {
  /* ---------------- STATE ---------------- */
  const [employees, setEmployees] = useState(employeesMock);
  const [activeTab, setActiveTab] = useState('uniform');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [mode, setMode] = useState('add');
  const [formData, setFormData] = useState({});

  /* -------- NEW FEATURE STATE -------- */
  const [leaves, setLeaves] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [leaveForm, setLeaveForm] = useState({
    empId: '',
    type: 'Casual',
    from: '',
    to: '',
  });

  const [transferForm, setTransferForm] = useState({
    empId: '',
    fromUnit: '',
    toUnit: '',
    date: '',
  });

  /* ---------------- DERIVED DATA ---------------- */

  const filteredEmployees = employees.filter((emp) => {
    const matchesTab = tabCategoryMap[activeTab].includes(emp.category);
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const grouped = {
    uniform: employees.filter((e) =>
      ['PN CPO', 'Sailor'].includes(e.category)
    ),
    civilian: employees.filter((e) => e.category === 'PN Civilian'),
    contract: employees.filter((e) => e.category === 'Contract Employee'),
  };

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode('add');
    setFormData({});
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setMode('edit');
    setFormData(emp);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEmployees((prev) =>
      mode === 'edit'
        ? prev.map((e) => (e.uid === formData.uid ? formData : e))
        : [...prev, { ...formData, uid: Date.now().toString() }]
    );
    setShowModal(false);
  };

  /* ---------------- LEAVE HANDLERS ---------------- */

  const addLeave = (e) => {
    e.preventDefault();
    setLeaves([...leaves, { ...leaveForm, id: Date.now().toString() }]);
    setLeaveForm({ empId: '', type: 'Casual', from: '', to: '' });
  };

  /* ---------------- TRANSFER HANDLERS ---------------- */

  const addTransfer = (e) => {
    e.preventDefault();
    setTransfers([...transfers, { ...transferForm, id: Date.now().toString() }]);
    setTransferForm({ empId: '', fromUnit: '', toUnit: '', date: '' });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 text-slate-900 space-y-10">

      <EmployeesHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          ['uniform', 'PN Uniform Personnel'],
          ['civilian', 'PN Civilians'],
          ['contract', 'Contract Employees'],
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

      <EmployeesSearch value={search} onChange={setSearch} />

      {/* Employees */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <EmployeeCard key={emp.uid} emp={emp} onEdit={openEdit} />
        ))}
      </div>

      {/* -------- LEAVE MANAGEMENT -------- */}
      <section className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Leave Management</h2>

        <form onSubmit={addLeave} className="grid md:grid-cols-5 gap-3 text-sm mb-4">
          <input
            placeholder="O No/P No"
            className="border px-3 py-2 rounded"
            value={leaveForm.empId}
            onChange={(e) => setLeaveForm({ ...leaveForm, empId: e.target.value })}
          />
          <select
            className="border px-3 py-2 rounded"
            value={leaveForm.type}
            onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
          >
            <option>Casual</option>
            <option>LFP</option>
            <option>Other</option>
          </select>
          <input type="date" className="border px-3 py-2 rounded"
            value={leaveForm.from}
            onChange={(e) => setLeaveForm({ ...leaveForm, from: e.target.value })}
          />
          <input type="date" className="border px-3 py-2 rounded"
            value={leaveForm.to}
            onChange={(e) => setLeaveForm({ ...leaveForm, to: e.target.value })}
          />
          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Add Leave
          </button>
        </form>

        {leaves.map((l) => (
          <div key={l.id} className="text-sm border-b py-2">
            {l.empId} — {l.type} ({l.from} → {l.to})
          </div>
        ))}
      </section>

      {/* -------- TRANSFER MANAGEMENT -------- */}
      <section className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Transfer Management</h2>

        <form onSubmit={addTransfer} className="grid md:grid-cols-5 gap-3 text-sm mb-4">
          <input
            placeholder="Employee ID"
            className="border px-3 py-2 rounded"
            value={transferForm.empId}
            onChange={(e) => setTransferForm({ ...transferForm, empId: e.target.value })}
          />
          <input
            placeholder="From Unit"
            className="border px-3 py-2 rounded"
            value={transferForm.fromUnit}
            onChange={(e) => setTransferForm({ ...transferForm, fromUnit: e.target.value })}
          />
          <input
            placeholder="To Unit"
            className="border px-3 py-2 rounded"
            value={transferForm.toUnit}
            onChange={(e) => setTransferForm({ ...transferForm, toUnit: e.target.value })}
          />
          <input type="date" className="border px-3 py-2 rounded"
            value={transferForm.date}
            onChange={(e) => setTransferForm({ ...transferForm, date: e.target.value })}
          />
          <button className="bg-blue-900 text-white rounded px-4 py-2">
            Add Transfer
          </button>
        </form>

        {transfers.map((t) => (
          <div key={t.id} className="text-sm border-b py-2">
            {t.empId} — {t.fromUnit} → {t.toUnit} ({t.date})
          </div>
        ))}
      </section>

      {/* Modals */}
      {showModal && (
        <EmployeeModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {showReport && (
        <EmployeeReportModal
          employees={employees}
          grouped={grouped}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}
