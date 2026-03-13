import { Trash2, Plus } from "lucide-react";

export function MedicineRows({
  items,
  setForm,
  isView
}) {

  const update = (index, field, value) => {

    const updated = [...items];
    updated[index][field] = value;

    setForm(prev => ({
      ...prev,
      items: updated
    }));

  };

  const add = () => {

    setForm(prev => ({
      ...prev,
      items: [...prev.items, { medicine: "", dosage: "", instruction: "" }]
    }));

  };

  const remove = (index) => {

    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));

  };

  return (

    <>

      {items.map((item, index) => (

        <div key={index} className="grid grid-cols-3 gap-3 mt-3">

          <input
            placeholder="Medicine"
            value={item.medicine}
            disabled={isView}
            onChange={e => update(index,"medicine",e.target.value)}
            className="border p-2 rounded"
          />

          <input
            placeholder="Dosage"
            value={item.dosage}
            disabled={isView}
            onChange={e => update(index,"dosage",e.target.value)}
            className="border p-2 rounded"
          />

          <div className="flex gap-2">

            <input
              placeholder="Instruction"
              value={item.instruction}
              disabled={isView}
              onChange={e => update(index,"instruction",e.target.value)}
              className="border p-2 rounded w-full"
            />

            {!isView && (
              <button onClick={()=>remove(index)}>
                <Trash2 size={16}/>
              </button>
            )}

          </div>

        </div>

      ))}

      {!isView && (
        <button
          onClick={add}
          className="flex items-center gap-2 mt-3 text-blue-700"
        >
          <Plus size={16}/>
          Add Medicine
        </button>
      )}

    </>

  );

}