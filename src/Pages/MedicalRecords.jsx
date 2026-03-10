import { useState } from "react";
import { Plus, Eye, Edit, Trash } from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const initialRecords = [
{
id: "MR-001",
patientName: "Ahmed Raza",
doctorName: "Dr Sara Ali",
diagnoses: ["Hypertension"],
prescriptions: ["Amlodipine 5mg"],
date: "2026-03-10",
notes: "Patient advised lifestyle changes.",
status: "Active",
},
{
id: "MR-002",
patientName: "Fatima Khan",
doctorName: "Dr Ahmed Khan",
diagnoses: ["Skin Allergy"],
prescriptions: ["Antihistamine"],
date: "2026-03-09",
notes: "Apply topical cream twice daily.",
status: "Completed",
},
];

/* ---------------- COMPONENT ---------------- */

export function MedicalRecords() {

const [records, setRecords] = useState(initialRecords);
const [selectedRecord, setSelectedRecord] = useState(null);
const [mode, setMode] = useState(null);
const [search, setSearch] = useState("");

const emptyRecord = {
id: "",
patientName: "",
doctorName: "",
diagnoses: [""],
prescriptions: [""],
date: "",
notes: "",
status: "Active",
};

/* ---------------- FILTER ---------------- */

const filteredRecords = records.filter((r) => {

const q = search.toLowerCase();

return (
r.patientName.toLowerCase().includes(q) ||
r.doctorName.toLowerCase().includes(q) ||
r.diagnoses.join(" ").toLowerCase().includes(q)
);

});

/* ---------------- ACTIONS ---------------- */

const openAdd = () => {
setSelectedRecord({ ...emptyRecord });
setMode("add");
};

const openModal = (record, type) => {
setSelectedRecord({ ...record });
setMode(type);
};

const handleChange = (field, value) => {
setSelectedRecord((prev) => ({
...prev,
[field]: value,
}));
};

const updateDiagnosis = (index, value) => {
const updated = [...selectedRecord.diagnoses];
updated[index] = value;
handleChange("diagnoses", updated);
};

const addDiagnosis = () => {
handleChange("diagnoses", [...selectedRecord.diagnoses, ""]);
};

const removeDiagnosis = (index) => {
const updated = selectedRecord.diagnoses.filter((_, i) => i !== index);
handleChange("diagnoses", updated);
};

const updatePrescription = (index, value) => {
const updated = [...selectedRecord.prescriptions];
updated[index] = value;
handleChange("prescriptions", updated);
};

const addPrescription = () => {
handleChange("prescriptions", [...selectedRecord.prescriptions, ""]);
};

const removePrescription = (index) => {
const updated = selectedRecord.prescriptions.filter((_, i) => i !== index);
handleChange("prescriptions", updated);
};

const saveRecord = () => {

if (mode === "edit") {
setRecords((prev) =>
prev.map((r) =>
r.id === selectedRecord.id ? selectedRecord : r
)
);
}

if (mode === "add") {
setRecords((prev) => [
...prev,
{ ...selectedRecord, id: `MR-${Date.now()}` },
]);
}

setSelectedRecord(null);
setMode(null);

};

/* ---------------- UI ---------------- */

return (
<div className="p-8 text-slate-900">

{/* HEADER */}

<div className="flex justify-between mb-6">

<h1 className="text-xl font-semibold">
Medical Records
</h1>

<button
onClick={openAdd}
className="bg-blue-900 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
>
<Plus className="w-4 h-4" />
Add Record
</button>

</div>

{/* SEARCH */}

<div className="mb-6 max-w-md">

<input
placeholder="Search patient, doctor or diagnosis..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="w-full border rounded-lg px-3 py-2"
/>

</div>

{/* TABLE */}

<div className="bg-white border rounded-xl overflow-hidden">

<table className="w-full">

<thead className="bg-slate-50 border-b">

<tr>
{[
"Record ID",
"Patient",
"Doctor",
"Diagnoses",
"Prescriptions",
"Date",
"Status",
"Actions",
].map((h) => (
<th
key={h}
className="px-6 py-4 text-left text-slate-800 font-semibold"
>
{h}
</th>
))}
</tr>

</thead>

<tbody>

{filteredRecords.map((r) => (

<tr key={r.id} className="border-b hover:bg-slate-50">

<td className="px-6 py-4 font-medium">
{r.id}
</td>

<td className="px-6 py-4">
{r.patientName}
</td>

<td className="px-6 py-4">
{r.doctorName}
</td>

<td className="px-6 py-4">
{r.diagnoses.join(", ")}
</td>

<td className="px-6 py-4">
{r.prescriptions.join(", ")}
</td>

<td className="px-6 py-4">
{r.date}
</td>

<td className="px-6 py-4">

<span
className={`px-2 py-1 rounded text-xs font-medium ${
r.status === "Active"
? "bg-green-100 text-green-700"
: "bg-blue-100 text-blue-700"
}`}
>
{r.status}
</span>

</td>

<td className="px-6 py-4 flex gap-2">

<button onClick={() => openModal(r,"view")}>
<Eye className="w-4 h-4"/>
</button>

<button onClick={() => openModal(r,"edit")}>
<Edit className="w-4 h-4"/>
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

{/* MODAL */}

{selectedRecord && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

<div className="bg-white p-6 rounded-xl w-full max-w-3xl">

<h2 className="font-semibold mb-4">

{mode === "view"
? "View Medical Record"
: mode === "edit"
? "Edit Medical Record"
: "Add Medical Record"}

</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<Input
label="Patient Name"
value={selectedRecord.patientName}
disabled={mode === "view"}
onChange={(v)=>handleChange("patientName",v)}
/>

<Input
label="Doctor Name"
value={selectedRecord.doctorName}
disabled={mode === "view"}
onChange={(v)=>handleChange("doctorName",v)}
/>

<Input
type="date"
label="Record Date"
value={selectedRecord.date}
disabled={mode === "view"}
onChange={(v)=>handleChange("date",v)}
/>

<div>

<label className="text-sm text-slate-700">
Status
</label>

<select
disabled={mode==="view"}
value={selectedRecord.status}
onChange={(e)=>handleChange("status",e.target.value)}
className="w-full border rounded-lg px-3 py-2 mt-1"
>
<option>Active</option>
<option>Completed</option>
</select>

</div>

</div>

{/* DIAGNOSES */}

<div className="mt-6">

<label className="text-sm font-medium text-slate-700">
Diagnoses
</label>

{selectedRecord.diagnoses.map((d,index)=>(
<div key={index} className="flex gap-2 mt-2">

<input
disabled={mode==="view"}
value={d}
onChange={(e)=>updateDiagnosis(index,e.target.value)}
className="flex-1 border rounded-lg px-3 py-2"
/>

{mode !== "view" && (

<button
onClick={()=>removeDiagnosis(index)}
className="text-red-600"
>
<Trash className="w-4 h-4"/>
</button>

)}

</div>
))}

{mode !== "view" && (

<button
onClick={addDiagnosis}
className="mt-2 text-blue-700 text-sm"
>
+ Add Diagnosis
</button>

)}

</div>

{/* PRESCRIPTIONS */}

<div className="mt-6">

<label className="text-sm font-medium text-slate-700">
Prescriptions
</label>

{selectedRecord.prescriptions.map((p,index)=>(
<div key={index} className="flex gap-2 mt-2">

<input
disabled={mode==="view"}
value={p}
onChange={(e)=>updatePrescription(index,e.target.value)}
className="flex-1 border rounded-lg px-3 py-2"
/>

{mode !== "view" && (

<button
onClick={()=>removePrescription(index)}
className="text-red-600"
>
<Trash className="w-4 h-4"/>
</button>

)}

</div>
))}

{mode !== "view" && (

<button
onClick={addPrescription}
className="mt-2 text-blue-700 text-sm"
>
+ Add Prescription
</button>

)}

</div>

{/* NOTES */}

<div className="mt-6">

<label className="text-sm text-slate-700">
Doctor Notes
</label>

<textarea
disabled={mode==="view"}
value={selectedRecord.notes}
onChange={(e)=>handleChange("notes",e.target.value)}
className="w-full border rounded-lg px-3 py-2 mt-1"
/>

</div>

<div className="flex justify-end gap-3 mt-6">

<button
onClick={()=>setSelectedRecord(null)}
className="border px-4 py-2 rounded-lg"
>
Close
</button>

{mode !== "view" && (

<button
onClick={saveRecord}
className="bg-blue-900 text-white px-4 py-2 rounded-lg"
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

/* ---------------- INPUT COMPONENT ---------------- */

function Input({label,value,onChange,disabled,type="text"}){

return(

<div>

<label className="text-sm text-slate-700">
{label}
</label>

<input
type={type}
disabled={disabled}
value={value}
onChange={(e)=>onChange?.(e.target.value)}
className="w-full mt-1 border rounded-lg px-3 py-2 text-slate-900"
/>

</div>

);

}