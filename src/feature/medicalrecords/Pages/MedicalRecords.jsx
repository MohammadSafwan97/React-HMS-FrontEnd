import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export function MedicalRecords() {

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    loadDummyData();
  }, []);

  const loadDummyData = () => {

    const patientsData = [
      { id: 1, name: "Ali Khan", age: 32, bloodGroup: "O+" },
      { id: 2, name: "Sara Ahmed", age: 28, bloodGroup: "A+" }
    ];

    const appointmentsData = [
      { id: 1, patientId: 1, doctor: "Dr John", date: "2024-03-10", diagnosis: "Flu" },
      { id: 2, patientId: 1, doctor: "Dr Smith", date: "2024-04-02", diagnosis: "Headache" },
      { id: 3, patientId: 2, doctor: "Dr John", date: "2024-03-12", diagnosis: "Allergy" }
    ];

    const prescriptionsData = [
      {
        id: 1,
        patientId: 1,
        medicines: ["Paracetamol 500mg", "Vitamin C 1000mg"]
      },
      {
        id: 2,
        patientId: 2,
        medicines: ["Cetirizine"]
      }
    ];

    setPatients(patientsData);
    setAppointments(appointmentsData);
    setPrescriptions(prescriptionsData);
  };

  const openRecord = (patient) => {
    setSelectedPatient(patient);
  };

  const patientAppointments = appointments.filter(
    (a) => a.patientId === selectedPatient?.id
  );

  const patientPrescriptions = prescriptions.filter(
    (p) => p.patientId === selectedPatient?.id
  );

  return (
    <div className="p-8 text-slate-900">

      <h1 className="text-2xl font-semibold mb-6">
        Medical Records
      </h1>

      {/* PATIENT LIST */}

      <div className="bg-white border rounded-xl overflow-hidden mb-8">

        <table className="w-full">

          <thead className="bg-slate-50 border-b">

            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-left">Blood Group</th>
              <th className="px-6 py-4 text-left">Record</th>
            </tr>

          </thead>

          <tbody>

            {patients.map((p) => (

              <tr key={p.id} className="border-b">

                <td className="px-6 py-4">{p.id}</td>

                <td className="px-6 py-4">{p.name}</td>

                <td className="px-6 py-4">{p.age}</td>

                <td className="px-6 py-4">{p.bloodGroup}</td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => openRecord(p)}
                    className="flex items-center gap-2 text-blue-600"
                  >
                    <Eye size={16} />
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PATIENT RECORD */}

      {selectedPatient && (

        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Medical Record — {selectedPatient.name}
          </h2>

          {/* PATIENT INFO */}

          <div className="grid grid-cols-3 gap-4 mb-6">

            <div>
              <p className="text-sm text-gray-500">Patient ID</p>
              <p className="font-medium">{selectedPatient.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{selectedPatient.age}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Blood Group</p>
              <p className="font-medium">{selectedPatient.bloodGroup}</p>
            </div>

          </div>

          {/* APPOINTMENT HISTORY */}

          <h3 className="font-semibold mb-2">
            Appointment History
          </h3>

          <div className="border rounded-lg mb-6">

            <table className="w-full">

              <thead className="bg-slate-50 border-b">

                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Doctor</th>
                  <th className="px-4 py-3 text-left">Diagnosis</th>
                </tr>

              </thead>

              <tbody>

                {patientAppointments.map((a) => (

                  <tr key={a.id} className="border-b">

                    <td className="px-4 py-3">{a.date}</td>
                    <td className="px-4 py-3">{a.doctor}</td>
                    <td className="px-4 py-3">{a.diagnosis}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* PRESCRIPTION HISTORY */}

          <h3 className="font-semibold mb-2">
            Prescriptions
          </h3>

          <div className="border rounded-lg">

            <table className="w-full">

              <thead className="bg-slate-50 border-b">

                <tr>
                  <th className="px-4 py-3 text-left">Prescription ID</th>
                  <th className="px-4 py-3 text-left">Medicines</th>
                </tr>

              </thead>

              <tbody>

                {patientPrescriptions.map((p) => (

                  <tr key={p.id} className="border-b">

                    <td className="px-4 py-3">{p.id}</td>

                    <td className="px-4 py-3">
                      {p.medicines.join(", ")}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}
