import { useState, useEffect } from "react";
import Select from "react-select";
import { Eye, Edit, Plus, Printer, Trash2 } from "lucide-react";

import { getAllPatients } from "../../patients/services/patientService";
import { getAllDoctors } from "../../doctors/services/doctorService";
import { getAppointments } from "../../appointments/services/appointmentService";

import {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription
} from "../services/prescriptionService";

import { createPrescriptionItem } from "../services/prescriptionItemService";

import { notifySuccess, notifyError } from "../../../shared/utils/notification";

export function Prescriptions() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(null);

  const [form, setForm] = useState({
    id: null,
    diagnosis: "",
    patientId: null,
    doctorId: null,
    appointmentId: null,
    items: [{ medicine: "", dosage: "", instruction: "" }]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const pres = await getPrescriptions();
      const pats = await getAllPatients();
      const docs = await getAllDoctors();
      const appts = await getAppointments();

      setPrescriptions(pres.data || []);
      setPatients(pats || []);
      setDoctors(docs || []);
      setAppointments(appts || []);

    } catch (error) {

      console.error(error);
      notifyError("Failed to load prescriptions");

    }

  };

  const openModal = (prescription, type) => {

    setMode(type);
    setIsModalOpen(true);

    if (prescription) {

      setForm({
        id: prescription.id,
        diagnosis: prescription.diagnosis,
        patientId: prescription.patientId,
        doctorId: prescription.doctorId,
        appointmentId: prescription.appointmentId,
        items: prescription.items || [{ medicine: "", dosage: "", instruction: "" }]
      });

    } else {

      setForm({
        id: null,
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

  const savePrescription = async () => {

    try {

      const payload = {
        diagnosis: form.diagnosis,
        patientId: form.patientId,
        doctorId: form.doctorId,
        appointmentId: form.appointmentId
      };

      let res;

      if (mode === "edit") {
        res = await updatePrescription(form.id, payload);
      } else {
        res = await createPrescription(payload);
      }

      const createdPrescription = res.data;

      for (const item of form.items) {

        await createPrescriptionItem({
          medicine: item.medicine,
          dosage: item.dosage,
          instruction: item.instruction,
          prescriptionId: createdPrescription.id
        });

      }

      notifySuccess("Prescription saved successfully");

      setIsModalOpen(false);

      loadData();

    } catch (error) {

      console.error(error);
      notifyError("Failed to save prescription");

    }

  };

  const deletePrescriptionHandler = async (id) => {

    if (!window.confirm("Delete this prescription?")) return;

    try {

      await deletePrescription(id);

      setPrescriptions(prev =>
        prev.filter(p => p.id !== id)
      );

      notifySuccess("Prescription deleted");

    } catch (error) {

      notifyError("Failed to delete prescription");

    }

  };

  const printPrescription = (p) => {

    const patient = patients.find(pt => pt.id === p.patientId);
    const doctor = doctors.find(d => d.id === p.doctorId);

    const content = `
<style>
body{font-family:Arial;padding:30px}
table{width:100%;border-collapse:collapse;margin-top:10px}
td,th{border:1px solid #ddd;padding:8px}
</style>

<h2>Hospital Prescription</h2>

<p><b>Patient:</b> ${patient?.name || "-"}</p>
<p><b>Doctor:</b> ${doctor?.name || "-"}</p>
<p><b>Diagnosis:</b> ${p.diagnosis}</p>

<table>
<tr>
<th>Medicine</th>
<th>Dosage</th>
<th>Instruction</th>
</tr>

${(p.items || []).map(m => `
<tr>
<td>${m.medicine}</td>
<td>${m.dosage}</td>
<td>${m.instruction}</td>
</tr>
`).join("")}

</table>
`;

    const win = window.open("", "", "width=700,height=700");
    win.document.write(content);
    win.print();

  };

  const patientOptions = patients.map(p => ({ label: p.name, value: p.id }));
  const doctorOptions = doctors.map(d => ({ label: d.name, value: d.id }));
  const appointmentOptions = appointments.map(a => ({ label: `Appointment ${a.id}`, value: a.id }));

  const selectedPatient = patientOptions.find(p => p.value === form.patientId);
  const selectedDoctor = doctorOptions.find(d => d.value === form.doctorId);
  const selectedAppointment = appointmentOptions.find(a => a.value === form.appointmentId);

  const isView = mode === "view";

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

                const patient = patients.find(pt => pt.id === p.patientId);
                const doctor = doctors.find(d => d.id === p.doctorId);

                return (

                  <tr key={p.id} className="border-b">

                    <td className="p-4">{p.id}</td>
                    <td className="p-4">{patient?.name || "-"}</td>
                    <td className="p-4">{doctor?.name || "-"}</td>
                    <td className="p-4">{p.diagnosis}</td>
                    <td className="p-4">
                      {(p.items || []).map(i => i.medicine).join(", ")}
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

                      <button onClick={() => deletePrescriptionHandler(p.id)}>
                        <Trash2 size={16} />
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

              {mode === "edit" && "Edit Prescription"}
              {mode === "add" && "Add Prescription"}
              {mode === "view" && "View Prescription"}

            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label>Patient</label>
                <Select
                  value={selectedPatient}
                  options={patientOptions}
                  onChange={o => handleChange("patientId", o.value)}
                  isDisabled={isView}
                />
              </div>

              <div>
                <label>Doctor</label>
                <Select
                  value={selectedDoctor}
                  options={doctorOptions}
                  onChange={o => handleChange("doctorId", o.value)}
                  isDisabled={isView}
                />
              </div>

              <div className="col-span-2">
                <label>Appointment</label>
                <Select
                  value={selectedAppointment}
                  options={appointmentOptions}
                  onChange={o => handleChange("appointmentId", o.value)}
                  isDisabled={isView}
                />
              </div>

              <div className="col-span-2">
                <label>Diagnosis</label>
                <textarea
                  value={form.diagnosis}
                  disabled={isView}
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
                  disabled={isView}
                  onChange={e => handleItemChange(index, "medicine", e.target.value)}
                  className="border p-2 rounded"
                />

                <input
                  placeholder="Dosage"
                  value={item.dosage}
                  disabled={isView}
                  onChange={e => handleItemChange(index, "dosage", e.target.value)}
                  className="border p-2 rounded"
                />

                <div className="flex gap-2">

                  <input
                    placeholder="Instruction"
                    value={item.instruction}
                    disabled={isView}
                    onChange={e => handleItemChange(index, "instruction", e.target.value)}
                    className="border p-2 rounded w-full"
                  />

                  {!isView && (
                    <button onClick={() => removeMedicineRow(index)}>
                      <Trash2 size={16} />
                    </button>
                  )}

                </div>

              </div>

            ))}

            {!isView && (
              <button
                onClick={addMedicineRow}
                className="mt-3 flex items-center gap-2 text-blue-700"
              >
                <Plus size={16} />
                Add Medicine
              </button>
            )}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setIsModalOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Close
              </button>

              {!isView && (
                <button
                  onClick={savePrescription}
                  className="bg-blue-900 text-white px-4 py-2 rounded"
                >
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