export function ConfidenceBar({ confidence }) {

  return (

    <div className="text-slate-900">

      <p className="font-medium mb-1">
        {confidence}%
      </p>

      <div className="w-full bg-slate-200 rounded h-2">

        <div
          className="bg-blue-600 h-2 rounded"
          style={{ width: `${confidence}%` }}
        />

      </div>

    </div>

  );

}
