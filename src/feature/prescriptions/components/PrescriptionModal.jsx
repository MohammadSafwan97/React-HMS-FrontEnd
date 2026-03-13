import Select from "react-select";
import { MedicineRows } from "./MedicineRows";

export function PrescriptionModal({
  form,
  setForm,
  patients,
  doctors,
  appointments,
  mode,
  onClose,
  onSave
}) {

  const isView = mode === "view";

  const patientOptions = patients.map(p => ({ label: p.name, value: p.id }));
  const doctorOptions = doctors.map(d => ({ label: d.name, value: d.id }));
  const appointmentOptions = appointments.map(a => ({ label: `Appointment ${a.id}`, value: a.id }));

  const selectedPatient = patientOptions.find(p => p.value === form.patientId);
  const selectedDoctor = doctorOptions.find(d => d.value === form.doctorId);
  const selectedAppointment = appointmentOptions.find(a => a.value === form.appointmentId);

  const handleChange = (field,value)=>{
    setForm(prev=>({...prev,[field]:value}));
  };

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">

        <h2 className="text-lg font-semibold mb-4">

          {mode==="edit" && "Edit Prescription"}
          {mode==="add" && "Add Prescription"}
          {mode==="view" && "View Prescription"}

        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <label>Patient</label>

            <Select
              value={selectedPatient}
              options={patientOptions}
              onChange={o=>handleChange("patientId",o.value)}
              isDisabled={isView}
            />

          </div>

          <div>

            <label>Doctor</label>

            <Select
              value={selectedDoctor}
              options={doctorOptions}
              onChange={o=>handleChange("doctorId",o.value)}
              isDisabled={isView}
            />

          </div>

          <div className="col-span-2">

            <label>Appointment</label>

            <Select
              value={selectedAppointment}
              options={appointmentOptions}
              onChange={o=>handleChange("appointmentId",o.value)}
              isDisabled={isView}
            />

          </div>

          <div className="col-span-2">

            <label>Diagnosis</label>

            <textarea
              value={form.diagnosis}
              disabled={isView}
              onChange={e=>handleChange("diagnosis",e.target.value)}
              className="border p-2 rounded w-full"
            />

          </div>

        </div>

        <h3 className="mt-6 font-semibold">
          Medicines
        </h3>

        <MedicineRows
          items={form.items}
          setForm={setForm}
          isView={isView}
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Close
          </button>

          {!isView && (

            <button
              onClick={onSave}
              className="bg-blue-900 text-white px-4 py-2 rounded"
            >
              Save
            </button>

          )}

        </div>

      </div>

    </div>

  );

}