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

  /* ---------------- OPTIONS ---------------- */

  const appointmentOptions = appointments.map(a => {

    const doctor = doctors.find(d => d.id === a.doctorId);
    const patient = patients.find(p => p.id === a.patientId);

    return {
      value: a.id,
      label: `#${a.id} — ${patient?.name || "Unknown"} with ${doctor?.name || "Doctor"}`
    };

  });

  const selectedAppointment =
    appointmentOptions.find(a => a.value === form.appointmentId);

  const selectedDoctor =
    doctors.find(d => d.id === form.doctorId);

  const selectedPatient =
    patients.find(p => p.id === form.patientId);

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleAppointmentChange = (option) => {

    const appointment = appointments.find(a => a.id === option.value);

    setForm(prev => ({
      ...prev,
      appointmentId: appointment.id,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId
    }));

  };

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

          {/* Appointment */}

          <div className="col-span-2">

            <label>Appointment</label>

            <Select
              value={selectedAppointment}
              options={appointmentOptions}
              onChange={handleAppointmentChange}
              isDisabled={isView}
              placeholder="Select appointment..."
            />

          </div>

          {/* Patient (readonly) */}

          <div>

            <label>Patient</label>

            <input
              value={selectedPatient?.name || ""}
              disabled
              className="border p-2 rounded w-full bg-gray-100"
            />

          </div>

          {/* Doctor (readonly) */}

          <div>

            <label>Doctor</label>

            <input
              value={selectedDoctor?.name || ""}
              disabled
              className="border p-2 rounded w-full bg-gray-100"
            />

          </div>

          {/* Diagnosis */}

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
