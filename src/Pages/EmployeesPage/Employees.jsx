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

  /* ---------------- UI ---------------- */

  return (
    <div className="p-8 text-slate-900">
      {/* Header */}
      <EmployeesHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
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
                : 'border text-slate-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <EmployeesSearch value={search} onChange={setSearch} />

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <EmployeeCard
            key={emp.uid}
            emp={emp}
            onEdit={openEdit}
          />
        ))}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <EmployeeModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Report Modal */}
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
