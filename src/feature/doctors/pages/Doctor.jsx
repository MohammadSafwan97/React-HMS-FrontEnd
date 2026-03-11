import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllDoctors,createDoctor,updateDoctor } from "../services/doctorService.js";

import DoctorHeader from "../components/DoctorHeader.jsx";
import DoctorSearch from "../components/DoctorSearch.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import DoctorModal from "../components/DoctorModal.jsx";
import DoctorReportModal from "../components/DoctorReportModal.jsx";
import { notifySuccess, notifyError } from "../../../shared/utils/notification.js";

export function Doctors() {

  
  /* ---------------- STATE ---------------- */

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

  /* ---------------- GET ALL DOCTORS ---------------- */
   

   useEffect(()=>{
    const loadDoctors=async()=>{
    const data=await getAllDoctors();
    setDoctors(data);
   }
    loadDoctors();
   },[])
  /* ---------------- FILTERED DATA ---------------- */

  const filteredDoctors = doctors.filter((doctor) => {

  const name = doctor.name || "";
  const specialization = doctor.specialization || "";
  const id = doctor.id ? doctor.id.toString() : "";

  return (
    name.toLowerCase().includes(search.toLowerCase()) ||
    specialization.toLowerCase().includes(search.toLowerCase()) ||
    id.includes(search)
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

 const handleSave = async () => {
  try {

    if (mode === "edit") {

      const updatedDoctor = await updateDoctor(
        formData.id,
        formData
      );

      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor.id === updatedDoctor.id ? updatedDoctor : doctor
        )
      );
      notifySuccess("Doctor updated successfully");
    } else {

      const newDoctor = await createDoctor(formData);

      setDoctors((prev) => [
        ...prev,
        newDoctor
      ]);
      notifySuccess("Doctor created successfully");
    }

  } catch (error) {
    console.log("error saving doctor", error);
    notifyError("Failed to save doctor");
  }
  setShowModal(false)
};


 

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

      

      {filteredDoctors.length === 0 ? (

        <div className="text-center text-slate-500 py-10">
          No doctors found
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredDoctors.map((doctor) => (

            <DoctorCard
              key={doctor.id}
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