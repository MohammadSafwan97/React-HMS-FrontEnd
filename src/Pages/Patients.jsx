import { useEffect, useState } from "react";


import { tabCategoryMap } from "../utils/patients/helper.js";
import {getAllPatients,createPatient,updatePatient} from "../services/patientService.js"
import PatientHeader from "../components/patients/PatientHeader.jsx";
import PatientSearch from "../components/patients/PatientSearch.jsx";
import PatientCard from "../components/patients/PatientCard.jsx";
import PatientModal from "../components/patients/PatientModal.jsx";
import PatientReportModal from "../components/patients/PatientReportModal.jsx";

export function Patients() {

  /* ---------------- STATE ---------------- */

  const [patients, setPatients] = useState([]);
  const [activeTab, setActiveTab] = useState("inpatient");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({});

// Load Patients from DB
 const loadPatients=async()=>{
const data=await getAllPatients();
setPatients(data);
 }




 useEffect(()=>{
loadPatients();
 },[])

 

  const filteredPatients = patients.filter((patient) => {

    const matchesTab =
      tabCategoryMap[activeTab]?.includes(patient.patientType);

    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.ward.toLowerCase().includes(search.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const grouped = {
    inpatient: patients.filter((p) => p.patientType === "Inpatient"),
    outpatient: patients.filter((p) => p.patientType === "Outpatient"),
    emergency: patients.filter((p) => p.patientType === "Emergency"),
  };

  /* ---------------- HANDLERS ---------------- */

  const openAdd = () => {
    setMode("add");
    setFormData({});
    setShowModal(true);
  };

  const openEdit = (patient) => {
    setMode("edit");
    setFormData(patient);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSave=async()=>{
  if(mode=="edit"){
    const updatedPatient=await updatePatient(
      formData.patientId,formData
    );
    setPatients((prev)=>
    prev.map((p)=>p.patientId==updatedPatient.patientId
    ?updatedPatient:p
    ))
  }
  else{
    const newPatient=await createPatient(formData);
    setPatients((prev)=>([
      ...prev,newPatient
    ]))
  }
  setShowModal(false);
}




  return (
    <div className="p-8 text-slate-900 space-y-10">

      <PatientHeader
        onAdd={openAdd}
        onReport={() => setShowReport(true)}
      />

      {/* Tabs */}

      <div className="flex gap-2">

        {[
          ["inpatient", "Inpatients"],
          ["outpatient", "Outpatients"],
          ["emergency", "Emergency Patients"],
        ].map(([key, label]) => (

          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === key
                ? "bg-blue-900 text-white"
                : "border"
            }`}
          >
            {label}
          </button>

        ))}
      </div>

      <PatientSearch value={search} onChange={setSearch} />

      {/* Patient Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredPatients.map((patient) => (

          <PatientCard
            key={patient.patientId}
            patient={patient}
            onEdit={openEdit}
          />
          
        ))}
        {
          showModal&&
          <PatientModal
          onChange={handleChange}
          onSave={handleSave}
          formData={formData}
          onClose={()=>{setShowModal(false)}}
          />
        }

        {showReport && (
        <PatientReportModal
          patients={patients}
          grouped={grouped}
          onClose={() => setShowReport(false)}
        />
      )}
      </div>


    





    </div>
  );
}