export function MedicationTable({ medications }) {

  return (

    <div className="overflow-x-auto">

      <p className="text-slate-500 text-sm mb-2">
        Suggested Medication
      </p>

      <table className="w-full border text-xs sm:text-sm min-w-[500px]">

        <thead className="bg-slate-100">

          <tr>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Generic</th>
            <th className="border p-2">Dose</th>
            <th className="border p-2">Frequency</th>
            <th className="border p-2">Duration</th>
          </tr>

        </thead>

        <tbody>

          {medications.map((m, i) => (

            <tr key={i}>

              <td className="border p-2">{m.name}</td>
              <td className="border p-2">{m.generic}</td>
              <td className="border p-2">{m.dosage}</td>
              <td className="border p-2">{m.frequency}</td>
              <td className="border p-2">{m.duration}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
