import { useEffect, useState } from "react";

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

import { PrescriptionHeader } from "../components/PrescriptionHeader";
import { PrescriptionTable } from "../components/PrescriptionTable";
import { PrescriptionModal } from "../components/PrescriptionModal";

export function Prescriptions() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [mode, setMode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      setPrescriptions(pres || []);
      setPatients(pats || []);
      setDoctors(docs || []);
      setAppointments(appts || []);

    } catch (error) {

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

  const savePrescription = async () => {

    try {

      const payload = {
        diagnosis: form.diagnosis,
        patientId: form.patientId,
        doctorId: form.doctorId,
        appointmentId: form.appointmentId
      };

      let saved;

      if (mode === "edit") {
        saved = await updatePrescription(form.id, payload);
      } else {
        saved = await createPrescription(payload);
      }

      for (const item of form.items) {

        await createPrescriptionItem({
          ...item,
          prescriptionId: saved.id
        });

      }

      notifySuccess("Prescription saved");

      setIsModalOpen(false);

      loadData();

    } catch (error) {

      notifyError("Failed to save prescription");

    }

  };

  const deleteHandler = async (id) => {

    if (!window.confirm("Delete prescription?")) return;

    try {

      await deletePrescription(id);

      setPrescriptions(prev => prev.filter(p => p.id !== id));

      notifySuccess("Prescription deleted");

    } catch {

      notifyError("Failed to delete");

    }

  };

  return (

    <div className="p-8 text-slate-900">

      <PrescriptionHeader
        onAdd={() => openModal(null, "add")}
      />

      <PrescriptionTable
        prescriptions={prescriptions}
        patients={patients}
        doctors={doctors}
        onView={(p) => openModal(p, "view")}
        onEdit={(p) => openModal(p, "edit")}
        onDelete={deleteHandler}
      />

      {isModalOpen && (

        <PrescriptionModal
          form={form}
          setForm={setForm}
          patients={patients}
          doctors={doctors}
          appointments={appointments}
          mode={mode}
          onClose={() => setIsModalOpen(false)}
          onSave={savePrescription}
        />

      )}

    </div>

  );

}