export function SymptomsPanel({
  symptoms,
  setSymptoms,
  analyzeSymptoms,
  loading,
  error,
}) {

  return (

    <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r p-4 sm:p-6 lg:p-8 space-y-4">

      <p className="text-sm font-medium text-slate-900">
        Patient Symptoms
      </p>

      <textarea
        rows={6}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Example: fever cough sore throat for 3 days"
        className="w-full border rounded-lg p-3 text-sm resize-y"
      />

      <button
        onClick={analyzeSymptoms}
        disabled={!symptoms.trim()}
        className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        Analyze Symptoms
      </button>

      {loading && (
        <p className="text-xs text-slate-500 italic">
          AI analyzing symptoms...
        </p>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}

    </div>

  );

}
