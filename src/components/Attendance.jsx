import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Printer,
} from 'lucide-react';

/* ---------------- DATA ---------------- */

const initialAttendance = [
  {
    employeeId: 'EMP-009',
    employeeName: 'Safwan',
    department: 'Administration (LDC)',
    status: 'Present',
    checkIn: '09:05 AM',
    checkOut: '05:30 PM',
  },
  {
    employeeId: 'EMP-010',
    employeeName: 'Shahzeb',
    department: 'Data Entry Operator (DEO)',
    status: 'Present',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
  },
  {
    employeeId: 'EMP-011',
    employeeName: 'Shahzeb',
    department: 'Transfer Office (TOR)',
    status: 'Present',
    checkIn: '09:20 AM',
  },
  {
    employeeId: 'EMP-012',
    employeeName: 'Sammar',
    department: 'Data Entry Office (DEO)',
    status: 'Absent',
  },
];

const attendanceStats = {
  present: 3,
  absent: 1,
  onLeave: 0,
  total: 4,
  attendanceRate: 75,
};

/* ---------------- COMPONENT ---------------- */

export function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedDate, setSelectedDate] = useState('2024-12-29');
  const [showReport, setShowReport] = useState(false);
  const [showDailyState, setShowDailyState] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  /* ---------- Late Logic (08:15 AM) ---------- */
  const isLate = (checkIn) => {
    if (!checkIn) return false;
    const [time, meridian] = checkIn.split(' ');
    let [h, m] = time.split(':').map(Number);
    if (meridian === 'PM' && h !== 12) h += 12;
    if (meridian === 'AM' && h === 12) h = 0;
    return h > 8 || (h === 8 && m > 15);
  };

  const present = attendance.filter(a => a.status === 'Present');
  const absent = attendance.filter(a => a.status === 'Absent');
  const late = present.filter(a => isLate(a.checkIn));

  const saveEdit = () => {
    setAttendance(prev =>
      prev.map(r =>
        r.employeeId === editRecord.employeeId ? editRecord : r
      )
    );
    setEditRecord(null);
  };

  return (
    <div className="p-8">
      <style>{`
  @media print {
    body {
      background: white !important;
      color: #000 !important;
    }

    .print-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 16px !important;
      break-inside: avoid;
    }

    table {
      font-size: 12px;
      border-collapse: collapse;
    }

    th {
      background-color: #f1f5f9 !important;
      color: #000 !important;
      font-weight: 600;
    }

    td {
      color: #000 !important;
    }

    h2, h3 {
      color: #000 !important;
    }
  }
`}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2">Attendance Management</h1>
        <p className="text-slate-600">
          Track and manage daily employee attendance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard label="Present Today" value={attendanceStats.present} icon={CheckCircle} color="teal" />
        <StatCard label="Absent Today" value={attendanceStats.absent} icon={XCircle} color="red" />
        <StatCard label="On Leave" value={attendanceStats.onLeave} icon={Clock} color="amber" />
        <StatCard label="Attendance Rate" value={`${attendanceStats.attendanceRate}%`} icon={Users} color="blue" />
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-xl border p-6 mb-6 flex items-center gap-4">
        <CalendarIcon className="w-5 h-5 text-slate-500" />
        <label className="text-slate-700">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg text-slate-900"
        />

        <button
          onClick={() => setShowReport(true)}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Generate Report
        </button>

        <button
          onClick={() => setShowDailyState(true)}
          className="px-6 py-2 bg-gradient-to-r from-emerald-900 to-teal-700 text-white rounded-lg"
        >
          Daily State
        </button>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              {['Employee ID','Employee Name','Department','Check In','Check Out','Status','Actions']
                .map(h => (
                  <th key={h} className="px-6 py-4 text-left text-slate-700">
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {attendance.map((r) => (
              <tr key={r.employeeId} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 text-slate-900 ">{r.employeeId}</td>
                <td className="px-6 py-4 text-slate-900">{r.employeeName}</td>
                <td className="px-6 py-4 text-slate-900">{r.department}</td>
                <td className="px-6 py-4 text-slate-900">{r.checkIn || '-'}</td>
                <td className="px-6 py-4 text-slate-900">{r.checkOut || '-'}</td>
                <td className="px-6 py-4 text-slate-900">{r.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setEditRecord({ ...r })}
                    className="px-4 py-2 text-sm border rounded-lg text-slate-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL (Added functionality) ================= */}
      {editRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-slate-900 rounded-xl shadow-xl p-6 w-full max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Edit Attendance Record</h2>
              <button
                onClick={() => setEditRecord(null)}
                className="text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Employee ID</label>
                <input
                  value={editRecord.employeeId}
                  disabled
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Employee Name</label>
                <input
                  value={editRecord.employeeName}
                  onChange={(e) =>
                    setEditRecord((p) => ({ ...p, employeeName: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Department</label>
                <input
                  value={editRecord.department}
                  onChange={(e) =>
                    setEditRecord((p) => ({ ...p, department: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Check In</label>
                <input
                  value={editRecord.checkIn || ''}
                  onChange={(e) =>
                    setEditRecord((p) => ({ ...p, checkIn: e.target.value }))
                  }
                  placeholder="09:00 AM"
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="text-sm text-slate-600">Check Out</label>
                <input
                  value={editRecord.checkOut || ''}
                  onChange={(e) =>
                    setEditRecord((p) => ({ ...p, checkOut: e.target.value }))
                  }
                  placeholder="06:00 PM"
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-slate-600">Status</label>
                <select
                  value={editRecord.status}
                  onChange={(e) =>
                    setEditRecord((p) => ({ ...p, status: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 border rounded-lg text-slate-900"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditRecord(null)}
                className="px-5 py-2 border rounded-lg text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-5 py-2 bg-gradient-to-r from-blue-900 to-teal-700 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DAILY STATE REPORT ================= */}
      {showDailyState && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-slate-900 rounded-xl shadow-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold tracking-wide text-slate-900">
                Daily State CPO / Sailor Civilians — Dated {selectedDate}
              </h2>

              <button
                onClick={() => setShowDailyState(false)}
                className="text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-slate-900"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>

            {/* ================= TABLE 1 ================= */}
            <h1 className="font-semibold mb-2 text-slate-900">
              Daily State Summary
            </h1>

            <table className="w-full border mb-8 text-slate-900">
              <thead className="bg-slate-100">
                <tr>
                  {[
                    'Category','Born','Present','Away','AK DET',
                    'AK Office','Leave','TY','Absent','Admit'
                  ].map(h => (
                    <th key={h} className="border px-3 py-2 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: 'G/Navy', data: [15, 5, 3, 2, 1, 1, 0, 3, 0] },
                  { cat: 'Marines', data: [15, 5, 2, 1, 1, 0, 0, 1, 0] },
                  { cat: 'Civilians', data: [15, 2, 1, 1, 1, 1, 0, 1, 0] },
                  { cat: 'Total', data: [20, 10, 6, 4, 3, 2, 0, 5, 0] },
                ].map(row => (
                  <tr key={row.cat}>
                    <td className="border px-3 py-2 font-medium">
                      {row.cat}
                    </td>
                    {row.data.map((v,i) => (
                      <td key={i} className="border px-3 py-2 text-center">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= TABLE 2 ================= */}
            <h3 className="font-semibold mb-2 text-slate-900">AK DET</h3>
            <table className="w-full border mb-8 text-slate-900">
              <thead className="bg-slate-100">
                <tr>
                  {['S.No','PJO/O No','Name','Rank/Rate','W.E.F'].map(h => (
                    <th key={h} className="border px-3 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { no: 1, pjo: '202311', name: 'Ahmed Raza', rank: 'PMT-I' },
                  { no: 2, pjo: '202312', name: 'Bilal Khan', rank: 'LPMT' },
                ].map(r => (
                  <tr key={r.no}>
                    <td className="border px-3 py-2 text-slate-900">{r.no}</td>
                    <td className="border px-3 py-2 text-slate-900">{r.pjo}</td>
                    <td className="border px-3 py-2">{r.name}</td>
                    <td className="border px-3 py-2">{r.rank}</td>
                    <td className="border px-3 py-2">{selectedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= TABLE 3 & 4 ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print-grid">
              {/* Uniform */}
              <div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  AK Office Uniform Personnel
                </h3>
                <table className="w-full border text-slate-900">
                  <thead className="bg-slate-100">
                    <tr>
                      {['S.No','PJO/O.No','Name','Rank/Rate','Remarks'].map(h => (
                        <th key={h} className="border px-3 py-2 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">1</td>
                      <td className="border px-3 py-2">202401</td>
                      <td className="border px-3 py-2">Usman Ali</td>
                      <td className="border px-3 py-2">MGT-I</td>
                      <td className="border px-3 py-2">On Duty</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Civilians */}
              <div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  AK Office Civilians
                </h3>
                <table className="w-full border text-slate-900">
                  <thead className="bg-slate-100">
                    <tr>
                      {['S.No','P.No','Name','Desig','Remarks'].map(h => (
                        <th key={h} className="border px-3 py-2 text-left">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-3 py-2">1</td>
                      <td className="border px-3 py-2">C-019</td>
                      <td className="border px-3 py-2">Safwan</td>
                      <td className="border px-3 py-2">DEO</td>
                      <td className="border px-3 py-2">Present</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= TABLE 5 ================= */}
            <h3 className="font-semibold mb-2 text-slate-900">Leave</h3>
            <table className="w-full border border-slate-300 rounded-lg overflow-hidden text-slate-900">
              <thead className="bg-slate-100">
                <tr>
                  {['S.No','O.No','Name','Rank/Rate','Days','W.E.F','UPTO'].map(h => (
                    <th key={h} className="border px-3 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">1</td>
                  <td className="border px-3 py-2">203311</td>
                  <td className="border px-3 py-2">Shahzeb</td>
                  <td className="border px-3 py-2">PMT-I</td>
                  <td className="border px-3 py-2">3</td>
                  <td className="border px-3 py-2">{selectedDate}</td>
                  <td className="border px-3 py-2">2024-12-31</td>
                </tr>
              </tbody>
            </table>

            {/* ================= TABLE 6 ================= */}
            <h3 className="font-semibold mb-2 text-slate-900">TY</h3>
            <table className="w-full border text-slate-900">
              <thead className="bg-slate-100">
                <tr>
                  {['S.No','Name','Rank/Rate','W.E.F','Remarks'].map(h => (
                    <th key={h} className="border px-3 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">1</td>
                  <td className="border px-3 py-2">Bilal Khan</td>
                  <td className="border px-3 py-2">LPMT</td>
                  <td className="border px-3 py-2">{selectedDate}</td>
                  <td className="border px-3 py-2">Temporary Duty</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl border p-6">
      <div className={`w-10 h-10 bg-${color}-600 rounded-lg flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}

function SimpleTable({ headers }) {
  return (
    <table className="w-full border mb-6">
      <thead className="bg-slate-100">
        <tr>
          {headers.map(h => (
            <th key={h} className="border px-3 py-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {headers.map((_,i) => (
            <td key={i} className="border px-3 py-2">—</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
