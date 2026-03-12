import { useState, useEffect } from "react";
import Select from "react-select";
import { Eye, Edit, Plus, Printer, Trash2 } from "lucide-react";

export function Prescriptions() {

  const [prescriptions, setPrescriptions] = useState([]);

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);

  const [form, setForm] = useState({
    diagnosis: "",
    patientId: null,
    doctorId: null,
    appointmentId: null,
    items: [{ medicine: "", dosage: "", instruction: "" }]
  });

  useEffect(() => {
    loadDummyData();
  }, []);

  const loadDummyData = () => {

    setPatients([
      { id: 1, name: "Ali Khan" },
      { id: 2, name: "Sara Ahmed" }
    ]);

    setDoctors([
      { id: 1, name: "Dr John" },
      { id: 2, name: "Dr Smith" }
    ]);

    setAppointments([
      { id: 1 },
      { id: 2 }
    ]);

    setPrescriptions([
      {
        id: 1,
        diagnosis: "Flu",
        patient: { id: 1 },
        doctor: { id: 1 },
        items: [
          { medicine: "Paracetamol", dosage: "500mg", instruction: "Twice daily" },
          { medicine: "Vitamin C", dosage: "1000mg", instruction: "After meal" }
        ]
      }
    ]);
  };

  const openModal = (prescription, type) => {

    setMode(type);
    setIsModalOpen(true);

    if (prescription) {

      setForm({
        id: prescription.id,
        diagnosis: prescription.diagnosis,
        patientId: prescription.patient?.id,
        doctorId: prescription.doctor?.id,
        appointmentId: prescription.appointment?.id,
        items: prescription.items
      });

    } else {

      setForm({
        diagnosis: "",
        patientId: null,
        doctorId: null,
        appointmentId: null,
        items: [{ medicine: "", dosage: "", instruction: "" }]
      });

    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {

    const updated = [...form.items];
    updated[index][field] = value;

    setForm(prev => ({
      ...prev,
      items: updated
    }));
  };

  const addMedicineRow = () => {

    setForm(prev => ({
      ...prev,
      items: [...prev.items, { medicine: "", dosage: "", instruction: "" }]
    }));

  };

  const removeMedicineRow = (index) => {

    const updated = form.items.filter((_, i) => i !== index);

    setForm(prev => ({
      ...prev,
      items: updated
    }));

  };

  const savePrescription = () => {

    console.log("Prescription Payload:", form);

    setIsModalOpen(false);

  };

  const printPrescription = (p) => {

    const patient = patients.find(pt => pt.id === p.patient?.id);
    const doctor = doctors.find(d => d.id === p.doctor?.id);

    const medicines = p.items.map(
      m => `<li>${m.medicine} - ${m.dosage} (${m.instruction})</li>`
    ).join("");

    const content = `
      <h2>Hospital Prescription</h2>
      <p><b>Patient:</b> ${patient?.name || "-"}</p>
      <p><b>Doctor:</b> ${doctor?.name || "-"}</p>
      <p><b>Diagnosis:</b> ${p.diagnosis}</p>
      <h3>Medicines</h3>
      <ul>${medicines}</ul>
    `;

    const win = window.open("", "", "width=700,height=700");
    win.document.write(content);
    win.print();
  };

  const patientOptions = patients.map(p => ({ label: p.name, value: p.id }));
  const doctorOptions = doctors.map(d => ({ label: d.name, value: d.id }));
  const appointmentOptions = appointments.map(a => ({ label: `Appointment ${a.id}`, value: a.id }));

  return (
    <div className="p-8 text-slate-900">

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-semibold">Prescriptions</h1>

        <button
          onClick={() => openModal(null, "add")}
          className="flex gap-2 items-center bg-blue-900 text-white px-4 py-2 rounded"
        >
          <Plus size={16} />
          Add Prescription
        </button>

      </div>

      <div className="bg-white border rounded-xl overflow-hidden">

        <div className="max-h-[65vh] overflow-y-auto">

          <table className="w-full">

            <thead className="bg-slate-50 border-b sticky top-0">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Diagnosis</th>
                <th className="p-4 text-left">Medicines</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {prescriptions.map(p => {

                const patient = patients.find(pt => pt.id === p.patient?.id);
                const doctor = doctors.find(d => d.id === p.doctor?.id);

                return (

                  <tr key={p.id} className="border-b">

                    <td className="p-4">{p.id}</td>

                    <td className="p-4">{patient?.name || "-"}</td>

                    <td className="p-4">{doctor?.name || "-"}</td>

                    <td className="p-4">{p.diagnosis}</td>

                    <td className="p-4">
                      {p.items.map(i => i.medicine).join(", ")}
                    </td>

                    <td className="p-4 flex gap-3">

                      <button onClick={() => openModal(p, "view")}>
                        <Eye size={16} />
                      </button>

                      <button onClick={() => openModal(p, "edit")}>
                        <Edit size={16} />
                      </button>

                      <button onClick={() => printPrescription(p)}>
                        <Printer size={16} />
                      </button>

                    </td>

                  </tr>

                );
              })}

            </tbody>

          </table>

        </div>

      </div>

      {isModalOpen && (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4">
              {mode === "edit" ? "Edit Prescription" : "Add Prescription"}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label>Patient</label>
                <Select
                  options={patientOptions}
                  onChange={o => handleChange("patientId", o.value)}
                />
              </div>

              <div>
                <label>Doctor</label>
                <Select
                  options={doctorOptions}
                  onChange={o => handleChange("doctorId", o.value)}
                />
              </div>

              <div className="col-span-2">
                <label>Appointment</label>
                <Select
                  options={appointmentOptions}
                  onChange={o => handleChange("appointmentId", o.value)}
                />
              </div>

              <div className="col-span-2">
                <label>Diagnosis</label>
                <textarea
                  value={form.diagnosis}
                  onChange={e => handleChange("diagnosis", e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>

            </div>

            <h3 className="mt-6 font-semibold">Medicines</h3>

            {form.items.map((item, index) => (

              <div key={index} className="grid grid-cols-3 gap-3 mt-3">

                <input
                  placeholder="Medicine"
                  value={item.medicine}
                  onChange={e => handleItemChange(index, "medicine", e.target.value)}
                  className="border p-2 rounded"
                />

                <input
                  placeholder="Dosage"
                  value={item.dosage}
                  onChange={e => handleItemChange(index, "dosage", e.target.value)}
                  className="border p-2 rounded"
                />

                <div className="flex gap-2">

                  <input
                    placeholder="Instruction"
                    value={item.instruction}
                    onChange={e => handleItemChange(index, "instruction", e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                  <button onClick={() => removeMedicineRow(index)}>
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            ))}

            <button
              onClick={addMedicineRow}
              className="mt-3 flex items-center gap-2 text-blue-700"
            >
              <Plus size={16} />
              Add Medicine
            </button>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsModalOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Close
              </button>

              <button
                onClick={savePrescription}
                className="bg-blue-900 text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
