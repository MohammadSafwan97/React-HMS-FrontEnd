import { useState } from 'react';
import { Plus, Eye, Edit } from 'lucide-react';

/* ---------------- CONSTANTS ---------------- */

const EXECUTION_TYPES = ['Full', 'Partial'];
const CATEGORIES = ['Service', 'Bl','Gift','Death Case','Installment'];
const LOCATIONS = ['Karachi', 'Islamabad', 'Gwadar', 'PN Farms'];
const STATUSES = ['Forwarded', 'Action Awaited'];

/* ---------------- MOCK DATA ---------------- */

const initialCases = [
  {
    id: 'TC-2024-001',
    date: '2024-12-15',
    fileNo: 'FILE-7789',
    sizeSqYd: '500',
    sellerName: 'Ahmed Hassan',
    purchaserName: 'Khalid Mehmood',
    location: 'Karachi',
    estateAgent: 'Al-Habib Property',
    status: 'Completed',
    cnic: '42101-1234567-1',
    executedOfficeName: 'Registrar Office Karachi',
    executionType: 'Full',
    authority: 'Sindh Board of Revenue',
    propertyDealer: 'Al-Habib Property',
    rateMillions: '12.5',
    remarks: 'All documents verified.',
    documents: null,
    sellerImage: null,
    purchaserImage: null,
  },
  {
    id: 'TC-2024-002',
    date: '2024-11-28',
    fileNo: 'FILE-8891',
    sizeSqYd: '300',
    sellerName: 'Naba Imran',
    purchaserName: 'Usman Ali',
    location: 'Islamabad',
    estateAgent: 'Prime Estate',
    status: 'Pending',
    cnic: '42201-9876543-2',
    executedOfficeName: 'Islamabad Land Office',
    executionType: 'Partial',
    authority: 'CDA',
    propertyDealer: 'Prime Estate',
    rateMillions: '8.2',
    remarks: 'Partial transfer.',
    documents: null,
    sellerImage: null,
    purchaserImage: null,
  },
  {
    id: 'TC-2024-003',
    date: '2024-10-05',
    fileNo: 'FILE-9912',
    sizeSqYd: '1000',
    sellerName: 'Shahzeb Khan',
    purchaserName: 'Adeel Raza',
    location: 'Gwadar',
    estateAgent: 'Gwadar Properties',
    status: 'Completed',
    cnic: '42301-4567890-3',
    executedOfficeName: 'Gwadar Development Authority',
    executionType: 'Full',
    authority: 'GDA',
    propertyDealer: 'Gwadar Properties',
    rateMillions: '20',
    remarks: 'Commercial plot.',
    documents: null,
    sellerImage: null,
    purchaserImage: null,
  },
  {
    id: 'TC-2024-004',
    date: '2024-09-18',
    fileNo: 'FILE-5567',
    sizeSqYd: '250',
    sellerName: 'Bilal Ahmed',
    purchaserName: 'Hamza Iqbal',
    location: 'PN Farms',
    estateAgent: 'City Estate',
    status: 'Hold',
    cnic: '42401-1112223-4',
    executedOfficeName: 'Lahore Registry',
    executionType: 'Full',
    authority: 'LDA',
    propertyDealer: 'City Estate',
    rateMillions: '6.5',
    remarks: 'On hold due to verification.',
    documents: null,
    sellerImage: null,
    purchaserImage: null,
  },
];

/* ---------------- COMPONENT ---------------- */

export function TransferCases() {
  const [cases, setCases] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState(null);
  const [mode, setMode] = useState(null);

  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [agentFilter, setAgentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const emptyCase = {
    id: '',
    date: '',
    fileNo: '',
    sizeSqYd: '',
    sellerName: '',
    purchaserName: '',
    location: '',
    estateAgent: '',
    status: 'Completed',
    cnic: '',
    executedOfficeName: '',
    executionType: '',
    authority: '',
    propertyDealer: '',
    rateMillions: '',
    remarks: '',
    documents: null,
    sellerImage: null,
    purchaserImage: null,
  };

  /* ---------- FILTER ---------- */

  const filteredCases = cases.filter(tc => {
    const q = search.toLowerCase();

    const matchesSearch =
      tc.id.toLowerCase().includes(q) ||
      tc.sellerName.toLowerCase().includes(q) ||
      tc.purchaserName.toLowerCase().includes(q);

    const matchesLocation =
      locationFilter === 'All' || tc.location === locationFilter;

    const matchesAgent =
      agentFilter === 'All' || tc.estateAgent === agentFilter;

    const matchesStatus =
      statusFilter === 'All' || tc.status === statusFilter;

    return matchesSearch && matchesLocation && matchesAgent && matchesStatus;
  });

  /* ---------- ACTIONS ---------- */

  const openModal = (tc, type) => {
    setSelectedCase({ ...tc });
    setMode(type);
  };

  const openAddCase = () => {
    setSelectedCase({ ...emptyCase });
    setMode('add');
  };

  const handleChange = (field, value) => {
    setSelectedCase(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    if (mode === 'edit') {
      setCases(prev =>
        prev.map(tc => (tc.id === selectedCase.id ? selectedCase : tc))
      );
    }
    if (mode === 'add') {
      setCases(prev => [...prev, { ...selectedCase, id: `TC-${Date.now()}` }]);
    }
    setSelectedCase(null);
    setMode(null);
  };

  return (
    <div className="p-8 text-slate-900">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Transfer Cases</h1>
        <button
          onClick={openAddCase}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg flex gap-2"
        >
          <Plus className="w-4 h-4" /> Add Case
        </button>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          placeholder="Search Case / Seller / Purchaser"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <select onChange={e => setLocationFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="All">All Locations</option>
          {LOCATIONS.map(l => <option key={l}>{l}</option>)}
        </select>

        <select onChange={e => setAgentFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="All">All Agents</option>
          {[...new Set(cases.map(c => c.estateAgent))].map(a => (
            <option key={a}>{a}</option>
          ))}
        </select>

        <select onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Case No</th>
              <th className="px-6 py-4 text-left">Seller</th>
              <th className="px-6 py-4 text-left">Purchaser</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Estate Agent</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map(tc => (
              <tr key={tc.id} className="border-b">
                <td className="px-6 py-4">{tc.id}</td>
                <td className="px-6 py-4">{tc.sellerName}</td>
                <td className="px-6 py-4">{tc.purchaserName}</td>
                <td className="px-6 py-4">{tc.location}</td>
                <td className="px-6 py-4">{tc.estateAgent}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${
                    tc.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : tc.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {tc.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => openModal(tc, 'view')}><Eye /></button>
                  <button onClick={() => openModal(tc, 'edit')}><Edit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">

            <h2 className="font-semibold mb-4">
              {mode === 'view' ? 'View Case' : mode === 'edit' ? 'Edit Case' : 'Add Case'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <ImageField label="Seller Image" file={selectedCase.sellerImage}
                disabled={mode === 'view'}
                onChange={file => handleChange('sellerImage', file)} />

              <ImageField label="Purchaser Image" file={selectedCase.purchaserImage}
                disabled={mode === 'view'}
                onChange={file => handleChange('purchaserImage', file)} />
              <Input
  label="Inward No"
  value={selectedCase.inwardNo}
  disabled={mode === 'view'}
  onChange={v => handleChange('inwardNo', v)}
/>

<Input
  label="Inward Date"
  type="date"
  value={selectedCase.inwardDate}
  disabled={mode === 'view'}
  onChange={v => handleChange('inwardDate', v)}
/>
              
                 <SelectField
                label="Category"
                value={selectedCase.executionType}
                options={CATEGORIES}
                disabled={mode === 'view'}
                onChange={v => handleChange('executionType', v)}
              />
              <Input label="Registration No" value={selectedCase.fileNo} disabled={mode === 'view'}
                onChange={v => handleChange('fileNo', v)} />

              

              <Input label="Seller" value={selectedCase.sellerName} disabled={mode === 'view'}
                onChange={v => handleChange('sellerName', v)} />

              <Input label="Purchaser" value={selectedCase.purchaserName} disabled={mode === 'view'}
                onChange={v => handleChange('purchaserName', v)} />
              <Input label="Size (Sq Yd)" value={selectedCase.sizeSqYd} disabled={mode === 'view'}
                onChange={v => handleChange('sizeSqYd', v)} />
              <Input label="CNIC No" value={selectedCase.cnic} disabled={mode === 'view'}
                onChange={v => handleChange('cnic', v)} />

              <Input label="Executed Office Name" value={selectedCase.executedOfficeName} disabled={mode === 'view'}
                onChange={v => handleChange('executedOfficeName', v)} />

              <SelectField
                label="Full / Partial"
                value={selectedCase.executionType}
                options={EXECUTION_TYPES}
                disabled={mode === 'view'}
                onChange={v => handleChange('executionType', v)}
              />
             

              <SelectField
                label="Location"
                value={selectedCase.location}
                options={LOCATIONS}
                disabled={mode === 'view'}
                onChange={v => handleChange('location', v)}
              />

              <SelectField
                label="Status"
                value={selectedCase.status}
                options={STATUSES}
                disabled={mode === 'view'}
                onChange={v => handleChange('status', v)}
              />

              <Input label="Authority" value={selectedCase.authority} disabled={mode === 'view'}
                onChange={v => handleChange('authority', v)} />

              <Input label="Estate Agent" value={selectedCase.estateAgent} disabled={mode === 'view'}
                onChange={v => handleChange('estateAgent', v)} />

              <Input label="Property Dealer" value={selectedCase.propertyDealer} disabled={mode === 'view'}
                onChange={v => handleChange('propertyDealer', v)} />

              <Input label="Rate (Rs Millions)" value={selectedCase.rateMillions} disabled={mode === 'view'}
                onChange={v => handleChange('rateMillions', v)} />

              

              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Scanned Documents (PDF)</label>
                {mode === 'view' ? (
                  selectedCase.documents ? (
                    <button
                      onClick={() => window.open(URL.createObjectURL(selectedCase.documents))}
                      className="text-blue-700 underline text-sm"
                    >
                      View Document
                    </button>
                  ) : (
                    <p className="text-sm text-slate-500">No document uploaded</p>
                  )
                ) : (
                  <input type="file" accept="application/pdf"
                    onChange={e => handleChange('documents', e.target.files[0])} />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Remarks</label>
                <textarea
                  disabled={mode === 'view'}
                  value={selectedCase.remarks}
                  onChange={e => handleChange('remarks', e.target.value)}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setSelectedCase(null)} className="border px-4 py-2 rounded-lg">
                Close
              </button>
              {mode !== 'view' && (
                <button onClick={saveChanges} className="bg-blue-900 text-white px-4 py-2 rounded-lg">
                  Save
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Input({ label, value, onChange, disabled, type = 'text' }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange, disabled }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      <select
        disabled={disabled}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full mt-1 border rounded-lg px-3 py-2"
      >
        <option value="">Select</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ImageField({ label, file, onChange, disabled }) {
  return (
    <div>
      <label className="text-sm text-slate-600">{label}</label>
      {disabled ? (
        file ? (
          <img src={URL.createObjectURL(file)} className="mt-2 h-24 rounded border" />
        ) : (
          <p className="text-sm text-slate-500 mt-1">No image uploaded</p>
        )
      ) : (
        <input type="file" accept="image/*" onChange={e => onChange(e.target.files[0])} />
      )}
    </div>
  );
}
