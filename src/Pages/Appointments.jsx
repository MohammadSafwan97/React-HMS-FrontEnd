import { useState, useEffect } from "react";
import { getAppointments } from "../services/appointmentService";
import { getAllDoctors } from "../services/doctorService";
import { getAllPatients } from "../services/patientService";

import { AppointmentHeader } from "../components/appointments/AppointmentHeader";
import { AppointmentTable } from "../components/appointments/AppointmentTable";
import { AppointmentModal } from "../components/appointments/AppointmentModal";

export function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [mode, setMode] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const appts = await getAppointments();
    const docs = await getAllDoctors();
    const pats = await getAllPatients();

    setAppointments(appts || []);
    setDoctors(docs || []);
    setPatients(pats || []);
  };

  const filteredAppointments = appointments.filter((a) => {
    const q = search.toLowerCase();

    const patient = patients.find((p) => p.id === a.patientId);
    const doctor = doctors.find((d) => d.id === a.doctorId);

    return (
      a.id?.toString().includes(q) ||
      patient?.name?.toLowerCase().includes(q) ||
      doctor?.name?.toLowerCase().includes(q)
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
      />

      {selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          mode={mode}
          doctors={doctors}
          patients={patients}
          setSelectedAppointment={setSelectedAppointment}
          setAppointments={setAppointments}
          appointments={appointments}
        />
      )}

    </div>
  );
}
