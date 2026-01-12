import { useState } from 'react';
import {
  Plus,
  Eye,
  MapPin,
  Calendar,
  FileCheck,
  Search,
  FileText,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';

/* ---------------- MOCK DATA ---------------- */

// PAL (Provisional Allotment Letter)
const initialPALs = [
  {
    id: '1',
    palNumber: 'PAL-2024-0156',
    caseId: 'TC-2024-1248',
    propertyLocation: 'Gwadar',
    issueDate: '2024-12-15',
    status: 'Issued',
    applicantName: 'Ahmed Hassan',
  },
  {
    id: '2',
    palNumber: 'PAL-2024-0155',
    caseId: 'TC-2024-1245',
    propertyLocation: 'Karachi',
    issueDate: '2024-12-10',
    status: 'Pending',
    applicantName: 'Sara Malik',
  },
  {
    id: '3',
    palNumber: 'PAL-2024-0154',
    caseId: 'TC-2024-1243',
    propertyLocation: 'PN Farms',
    issueDate: '2024-12-08',
    status: 'Issued',
    applicantName: 'Hina Tariq',
  },
];

// PAO (Provisional Allotment Order)
const initialPAOs = [
  {
    id: '1',
    paoNumber: 'PAO-2024-0089',
    caseId: 'TC-2024-1245',
    relatedPAL: 'PAL-2024-0155',
    propertyLocation: 'Karachi',
    issueDate: '2024-12-20',
    status: 'Issued',
    applicantName: 'Sara Malik',
  },
  {
    id: '2',
    paoNumber: 'PAO-2024-0088',
    caseId: 'TC-2024-1241',
    relatedPAL: 'PAL-2024-0153',
    propertyLocation: 'Gwadar',
    issueDate: '2024-12-18',
    status: 'Finalized',
    applicantName: 'Hina Tariq',
  },
  {
    id: '3',
    paoNumber: 'PAO-2024-0087',
    caseId: 'TC-2024-1238',
    relatedPAL: 'PAL-2024-0150',
    propertyLocation: 'Islamabad',
    issueDate: '2024-12-12',
    status: 'Issued',
    applicantName: 'Kamran Sheikh',
  },
  {
    id: '4',
    paoNumber: 'PAO-2024-0086',
    caseId: 'TC-2024-1235',
    relatedPAL: 'PAL-2024-0148',
    propertyLocation: 'Karachi',
    issueDate: '2024-12-08',
    status: 'Finalized',
    applicantName: 'Nadia Hussain',
  },
  {
    id: '5',
    paoNumber: 'PAO-2024-0085',
    caseId: 'TC-2024-1232',
    relatedPAL: 'PAL-2024-0145',
    propertyLocation: 'Gwadar',
    issueDate: '2024-11-30',
    status: 'Cancelled',
    applicantName: 'Faisal Ahmed',
  },
];

/* ---------------- COMPONENT ---------------- */

export function PAOPALManagement() {
  // category: PAL or PAO
  const [category, setCategory] = useState('PAL');

  // PAL state
  const [pals, setPALs] = useState(initialPALs);
  const [selectedPAL, setSelectedPAL] = useState(null);
  const [showAddPALModal, setShowAddPALModal] = useState(false);

  // PAO state
  const [paos, setPAOs] = useState(initialPAOs);
  const [selectedPAO, setSelectedPAO] = useState(null);
  const [showAddPAOModal, setShowAddPAOModal] = useState(false);

  // shared UI state
  const [showReport, setShowReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // PAL form
  const [palFormData, setPALFormData] = useState({
    palNumber: '',
    caseId: '',
    applicantName: '',
    propertyLocation: '',
    issueDate: '',
    status: 'Issued',
  });

  // PAO form
  const [paoFormData, setPAOFormData] = useState({
    paoNumber: '',
    caseId: '',
    relatedPAL: '',
    applicantName: '',
    propertyLocation: '',
    issueDate: '',
    status: 'Issued',
    approvalNotes: '',
  });

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredPALs = pals.filter(pal => {
    const matchesSearch =
      pal.palNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pal.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pal.applicantName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      filterLocation === 'All' || pal.propertyLocation === filterLocation;

    const matchesStatus =
      filterStatus === 'All' || pal.status === filterStatus;

    return matchesSearch && matchesLocation && matchesStatus;
  });

  const filteredPAOs = paos.filter(pao => {
    const matchesSearch =
      pao.paoNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pao.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pao.applicantName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      filterLocation === 'All' || pao.propertyLocation === filterLocation;

    const matchesStatus =
      filterStatus === 'All' || pao.status === filterStatus;

    return matchesSearch && matchesLocation && matchesStatus;
  });

  /* ---------------- SUMMARY ---------------- */

  const activeRows = category === 'PAL' ? filteredPALs : filteredPAOs;

  const total = activeRows.length;

  // PAL stats
  const palIssued = filteredPALs.filter(p => p.status === 'Issued').length;
  const palPending = filteredPALs.filter(p => p.status === 'Pending').length;

  // PAO stats
  const paoIssued = filteredPAOs.filter(p => p.status === 'Issued').length;
  const paoFinalized = filteredPAOs.filter(p => p.status === 'Finalized').length;
  const paoCancelled = filteredPAOs.filter(p => p.status === 'Cancelled').length;

  /* ---------------- HANDLERS ---------------- */

  const handlePALChange = (field, value) => {
    setPALFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePAOChange = (field, value) => {
    setPAOFormData(prev => ({ ...prev, [field]: value }));
  };

  const savePAL = () => {
    setPALs(prev => [
      ...prev,
      { id: Date.now().toString(), ...palFormData },
    ]);
    setShowAddPALModal(false);
    setPALFormData({
      palNumber: '',
      caseId: '',
      applicantName: '',
      propertyLocation: '',
      issueDate: '',
      status: 'Issued',
    });
  };

  const savePAO = () => {
    setPAOs(prev => [
      ...prev,
      { id: Date.now().toString(), ...paoFormData },
    ]);
    setShowAddPAOModal(false);
    setPAOFormData({
      paoNumber: '',
      caseId: '',
      relatedPAL: '',
      applicantName: '',
      propertyLocation: '',
      issueDate: '',
      status: 'Issued',
      approvalNotes: '',
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterLocation('All');
    setFilterStatus('All');
  };

  return (
    <div className="p-8 text-slate-900">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-slate-900 mb-1">
            {category === 'PAL' ? 'PAL Management' : 'PAO Management'}
          </h1>
          <p className="text-slate-600">
            {category === 'PAL'
              ? <>Total PALs: <strong>{pals.length}</strong></>
              : <>Total PAOs: <strong>{paos.length}</strong></>
            }
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          {/* Category Toggle */}
          <div className="flex items-center bg-white border rounded-lg overflow-hidden">
            <button
              onClick={() => { setCategory('PAL'); resetFilters(); }}
              className={`px-4 py-2 text-sm ${
                category === 'PAL'
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              PAL
            </button>
            <button
              onClick={() => { setCategory('PAO'); resetFilters(); }}
              className={`px-4 py-2 text-sm ${
                category === 'PAO'
                  ? 'bg-blue-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              PAO
            </button>
          </div>

          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-2 px-5 py-2 border rounded-lg text-slate-700"
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </button>

          {category === 'PAL' ? (
            <button
              onClick={() => setShowAddPALModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-blue-900 text-white rounded-lg"
            >
              <Plus className="w-4 h-4" />
              Add New PAL
            </button>
          ) : (
            <button
              onClick={() => setShowAddPAOModal(true)}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg"
            >
              <Plus className="w-4 h-4" />
              Issue New PAO
            </button>
          )}
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            placeholder={
              category === 'PAL'
                ? 'Search PAL / Case ID / Applicant'
                : 'Search PAO / Case ID / Applicant'
            }
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-slate-900"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Filter className="w-4 h-4 text-slate-500" />

          <select
            value={filterLocation}
            onChange={e => setFilterLocation(e.target.value)}
            className="px-4 py-2 border rounded-lg text-slate-900"
          >
            <option>All</option>
            <option>Gwadar</option>
            <option>Karachi</option>
            <option>Islamabad</option>
            <option>PN Farms</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg text-slate-900"
          >
            <option>All</option>
            {category === 'PAL' ? (
              <>
                <option>Issued</option>
                <option>Pending</option>
              </>
            ) : (
              <>
                <option>Issued</option>
                <option>Finalized</option>
                <option>Cancelled</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              {category === 'PAL' ? (
                <>
                  {[
                    'PAL Number',
                    'Case ID',
                    'Applicant',
                    'Location',
                    'Issue Date',
                    'Status',
                    'Actions',
                  ].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-slate-700">
                      {h}
                    </th>
                  ))}
                </>
              ) : (
                <>
                  {[
                    'PAO Number',
                    'Related Case ID',
                    'Associated PAL',
                    'Applicant Name',
                    'Property Location',
                    'Issue Date',
                    'Status',
                    'Actions',
                  ].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-slate-700">
                      {h}
                    </th>
                  ))}
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {category === 'PAL'
              ? filteredPALs.map(pal => (
                  <tr key={pal.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-teal-600" />
                      {pal.palNumber}
                    </td>
                    <td className="px-6 py-4">{pal.caseId}</td>
                    <td className="px-6 py-4">{pal.applicantName}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {pal.propertyLocation}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {pal.issueDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          pal.status === 'Issued'
                            ? 'bg-teal-50 text-teal-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {pal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedPAL(pal)}
                        className="p-2 hover:bg-blue-50 rounded-lg text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              : filteredPAOs.map(pao => (
                  <tr key={pao.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
                        <span className="text-slate-900">{pao.paoNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{pao.caseId}</td>
                    <td className="px-6 py-4 text-slate-700">{pao.relatedPAL}</td>
                    <td className="px-6 py-4 text-slate-700">{pao.applicantName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {pao.propertyLocation}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {pao.issueDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs ${
                          pao.status === 'Issued'
                            ? 'bg-blue-50 text-blue-700'
                            : pao.status === 'Finalized'
                            ? 'bg-teal-50 text-teal-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {pao.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedPAO(pao)}
                        className="p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* REPORT MODAL */}
      {showReport && (
        <Modal
          title={`${category} Report`}
          onClose={() => setShowReport(false)}
        >
          {category === 'PAL' ? (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Summary label="Total PALs" value={filteredPALs.length} />
                <Summary label="Issued" value={palIssued} />
                <Summary label="Pending" value={palPending} />
              </div>

              <table className="w-full border text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    {['PAL', 'Case', 'Applicant', 'Location', 'Status'].map(h => (
                      <th key={h} className="border px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPALs.map(p => (
                    <tr key={p.id}>
                      <td className="border px-3 py-2">{p.palNumber}</td>
                      <td className="border px-3 py-2">{p.caseId}</td>
                      <td className="border px-3 py-2">{p.applicantName}</td>
                      <td className="border px-3 py-2">{p.propertyLocation}</td>
                      <td className="border px-3 py-2">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <Summary label="Total PAOs" value={filteredPAOs.length} />
                <Summary label="Issued" value={paoIssued} />
                <Summary label="Finalized" value={paoFinalized} />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <Summary label="Cancelled" value={paoCancelled} />
                <Summary label="Filtered Total" value={filteredPAOs.length} />
                <Summary label="All PAOs" value={paos.length} />
              </div>

              <table className="w-full border text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    {['PAO', 'Case', 'Applicant', 'Location', 'Status'].map(h => (
                      <th key={h} className="border px-3 py-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPAOs.map(p => (
                    <tr key={p.id}>
                      <td className="border px-3 py-2">{p.paoNumber}</td>
                      <td className="border px-3 py-2">{p.caseId}</td>
                      <td className="border px-3 py-2">{p.applicantName}</td>
                      <td className="border px-3 py-2">{p.propertyLocation}</td>
                      <td className="border px-3 py-2">{p.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </Modal>
      )}

      {/* VIEW PAL MODAL */}
      {selectedPAL && (
        <Modal title="PAL Details" onClose={() => setSelectedPAL(null)}>
          <Detail label="PAL Number" value={selectedPAL.palNumber} />
          <Detail label="Case ID" value={selectedPAL.caseId} />
          <Detail label="Applicant" value={selectedPAL.applicantName} />
          <Detail label="Location" value={selectedPAL.propertyLocation} />
          <Detail label="Issue Date" value={selectedPAL.issueDate} />
          <Detail label="Status" value={selectedPAL.status} />
        </Modal>
      )}

      {/* VIEW PAO MODAL */}
      {selectedPAO && (
        <Modal title="PAO Details" onClose={() => setSelectedPAO(null)}>
          <Detail label="PAO Number" value={selectedPAO.paoNumber} />
          <Detail label="Case ID" value={selectedPAO.caseId} />
          <Detail label="Associated PAL" value={selectedPAO.relatedPAL} />
          <Detail label="Applicant" value={selectedPAO.applicantName} />
          <Detail label="Location" value={selectedPAO.propertyLocation} />
          <Detail label="Issue Date" value={selectedPAO.issueDate} />
          <Detail label="Status" value={selectedPAO.status} />
        </Modal>
      )}

      {/* ADD PAL MODAL */}
      {showAddPALModal && (
        <Modal title="Add New PAL" onClose={() => setShowAddPALModal(false)}>
          <Input label="PAL Number" value={palFormData.palNumber} onChange={v => handlePALChange('palNumber', v)} />
          <Input label="Case ID" value={palFormData.caseId} onChange={v => handlePALChange('caseId', v)} />
          <Input label="Applicant Name" value={palFormData.applicantName} onChange={v => handlePALChange('applicantName', v)} />
          <Input label="Property Location" value={palFormData.propertyLocation} onChange={v => handlePALChange('propertyLocation', v)} />
          <Input type="date" label="Issue Date" value={palFormData.issueDate} onChange={v => handlePALChange('issueDate', v)} />

          <select
            value={palFormData.status}
            onChange={e => handlePALChange('status', e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Issued</option>
            <option>Pending</option>
          </select>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowAddPALModal(false)} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button onClick={savePAL} className="px-4 py-2 bg-blue-900 text-white rounded-lg">
              Save PAL
            </button>
          </div>
        </Modal>
      )}

      {/* ADD PAO MODAL */}
      {showAddPAOModal && (
        <Modal title="Issue New PAO" onClose={() => setShowAddPAOModal(false)}>
          <Input label="PAO Number" value={paoFormData.paoNumber} onChange={v => handlePAOChange('paoNumber', v)} />
          <Input label="Related Transfer Case" value={paoFormData.caseId} onChange={v => handlePAOChange('caseId', v)} />
          <Input label="Associated PAL" value={paoFormData.relatedPAL} onChange={v => handlePAOChange('relatedPAL', v)} />
          <Input label="Applicant Name" value={paoFormData.applicantName} onChange={v => handlePAOChange('applicantName', v)} />
          <Input label="Property Location" value={paoFormData.propertyLocation} onChange={v => handlePAOChange('propertyLocation', v)} />
          <Input type="date" label="Issue Date" value={paoFormData.issueDate} onChange={v => handlePAOChange('issueDate', v)} />

          <select
            value={paoFormData.status}
            onChange={e => handlePAOChange('status', e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>Issued</option>
            <option>Finalized</option>
            <option>Cancelled</option>
          </select>

          <div>
            <label className="text-sm text-slate-600">Approval Notes</label>
            <textarea
              rows={3}
              value={paoFormData.approvalNotes}
              onChange={(e) => handlePAOChange('approvalNotes', e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
              placeholder="Enter approval notes and conditions..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowAddPAOModal(false)} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button onClick={savePAO} className="px-4 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg">
              Issue PAO
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 max-h-[90vh] overflow-auto">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="text-sm">
      <span className="text-slate-500">{label}:</span>{' '}
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="border rounded-lg p-4 bg-slate-50">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
