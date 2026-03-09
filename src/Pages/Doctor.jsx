import { useState } from "react";

import { doctorsMock } from "../mocks/doctormock.js";

import DoctorHeader from "..//components/doctors/DoctorHeader.jsx";
import DoctorSearch from "../components/doctors/DoctorSearch.jsx";
import DoctorCard from "../components/doctors/DoctorCard.jsx";
import DoctorModal from "..//components/doctors/DoctorModal.jsx";
import DoctorReportModal from "../components/doctors/DoctorReportModal.jsx";

export function Doctors() {

  /* ---------------- STATE ---------------- */

  const [doctors, setDoctors] = useState(doctorsMock);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  /* ---------------- FILTERED DATA ---------------- */

  const filteredDoctors = doctors.filter((doctor) => {

    return (
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doctor.doctorId.toLowerCase().includes(search.toLowerCase())
    );

  });

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setFormData({});
    setShowModal(true);
  };

  const openEdit = (doctor) => {
    setMode("edit");
    setFormData(doctor);
    setShowModal(true);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSave = () => {

    setDoctors((prev) =>
      mode === "edit"
        ? prev.map((d) =>
            d.doctorId === formData.doctorId ? formData : d
          )
        : [...prev, formData]
    );

    setShowModal(false);

  };

  /* ---------------- UI ---------------- */

  return (

    <div className="p-8 text-slate-900 space-y-10">

      <DoctorHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      <DoctorSearch
        value={search}
        onChange={setSearch}
      />

      {/* DOCTOR GRID */}

      {filteredDoctors.length === 0 ? (

        <div className="text-center text-slate-500 py-10">
          No doctors found
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredDoctors.map((doctor) => (

            <DoctorCard
              key={doctor.doctorId}
              doctor={doctor}
              onEdit={openEdit}
            />

          ))}

        </div>

      )}

      {/* MODALS */}

      {showModal && (

        <DoctorModal
          mode={mode}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />

      )}

      {showReport && (

        <DoctorReportModal
          doctors={doctors}
          onClose={() => setShowReport(false)}
        />

      )}

    </div>
  );
}