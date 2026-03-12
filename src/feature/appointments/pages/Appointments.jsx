import { useState, useEffect } from "react";
import { getAppointments, deleteAppointment } from "../services/appointmentService";
import { getAllDoctors } from "../../doctors/services/doctorService";
import { getAllPatients } from "../../patients/services/patientService";

import { AppointmentHeader } from "../components/AppointmentHeader";
import { AppointmentTable } from "../components/AppointmentTable";
import { AppointmentModal } from "../components/AppointmentModal";

import { notifySuccess, notifyError } from "../../../shared/utils/notification";

export function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [mode, setMode] = useState(null);

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const [appts, docs, pats] = await Promise.all([
        getAppointments(),
        getAllDoctors(),
        getAllPatients()
      ]);

      setAppointments(appts || []);
      setDoctors(docs || []);
      setPatients(pats || []);

    } catch (err) {

      console.error("Failed loading data", err);
      notifyError("Failed to load appointments");

    }

  };

  const filteredAppointments = (appointments || []).filter((a) => {

    if (!a) return false;

    const q = search.toLowerCase();

    const patient = patients.find((p) => p.id === a?.patientId);
    const doctor = doctors.find((d) => d.id === a?.doctorId);

    return (
      a?.id?.toString().includes(q) ||
      patient?.name?.toLowerCase()?.includes(q) ||
      doctor?.name?.toLowerCase()?.includes(q)
    );

  });

  const openModal = (appointment, type) => {
    setSelectedAppointment(appointment);
    setMode(type);
  };

  const openAddAppointment = () => {
    setSelectedAppointment({});
    setMode("add");
  };

  const confirmDelete = async () => {

    const id = deleteId;
    if (!id) return;

    const previous = [...appointments];

    try {

      setAppointments(prev => prev.filter(a => a.id !== id));
      setShowDeleteConfirm(false);

      await deleteAppointment(id);

      notifySuccess("Appointment deleted successfully");

    } catch (err) {

      setAppointments(previous);
      notifyError("Failed to delete appointment");

    } finally {

      setDeleteId(null);

    }

  };

  return (

    <div className="p-8 text-slate-900">

      <AppointmentHeader openAddAppointment={openAddAppointment} />

      <input
        placeholder="Search Appointment / Patient / Doctor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full mb-6"
      />

      <AppointmentTable
        appointments={filteredAppointments}
        patients={patients}
        doctors={doctors}
        openModal={openModal}
        onDelete={(id) => {
          setDeleteId(id);
          setShowDeleteConfirm(true);
        }}
      />

      {selectedAppointment && (

        <AppointmentModal
          appointment={selectedAppointment}
          mode={mode}
          doctors={doctors}
          patients={patients}
          setSelectedAppointment={setSelectedAppointment}
          loadData={loadData}
        />

      )}

      {showDeleteConfirm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[350px] space-y-4">

            <h3 className="text-lg font-semibold">
              Delete Appointment
            </h3>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this appointment?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
