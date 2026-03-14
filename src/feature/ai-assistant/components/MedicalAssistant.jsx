import { useState } from "react";
import { analyzeSymptoms as analyzeAPI } from "../services/aiService";

export function MedicalAssistant() {

  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSymptoms = async () => {

    if (!symptoms.trim()) return;

    setLoading(true);
    setError(null);

    try {

      const result = await analyzeAPI(symptoms);

      setAnalysis(result);

    } catch (err) {

      setError("AI analysis failed. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md border text-slate-900">

      {/* HEADER */}

      <div className="border-b px-4 md:px-6 py-4">

        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          AI Consultation Assistant
        </h2>

        <p className="text-sm text-slate-500">
          Enter patient symptoms to generate AI clinical suggestions
        </p>

      </div>

      <div className="flex flex-col md:flex-row">

        {/* LEFT PANEL */}

        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r p-4 md:p-6 space-y-4">

          <p className="text-sm font-medium text-slate-900">
            Patient Symptoms
          </p>

          <textarea
            rows={6}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: fever cough sore throat for 3 days"
            className="w-full border rounded-lg p-3 text-sm"
          />

          <button
            onClick={analyzeSymptoms}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
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

        {/* RIGHT PANEL */}

        <div className="w-full md:w-1/2 p-4 md:p-6 space-y-5">

          {!analysis && !loading && (
            <p className="text-sm text-slate-500">
              AI analysis will appear here after symptoms are analyzed.
            </p>
          )}

          {analysis && (
            <>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="text-slate-500">Condition</p>
                  <p className="font-medium">{analysis.condition}</p>
                </div>

                <div>
                  <p className="text-slate-500">AI Confidence</p>
                  <p className="font-medium">{analysis.confidence}%</p>
                </div>

                <div>
                  <p className="text-slate-500">Risk Level</p>
                  <p className="font-medium">{analysis.riskLevel}</p>
                </div>

              </div>

              <div>
                <p className="text-slate-500 text-sm">Key Findings</p>
                <p className="text-sm">{analysis.findings.join(", ")}</p>
              </div>

              <div className="overflow-x-auto">

                <p className="text-slate-500 text-sm mb-2">
                  Suggested Medication
                </p>

                <table className="w-full border text-xs min-w-[500px]">

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

                    {analysis.medications.map((m, i) => (

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

              <div>

                <p className="text-slate-500 text-sm">Doctor Instructions</p>

                <textarea
                  defaultValue={analysis.instructions}
                  className="w-full border rounded-lg p-2 text-sm"
                />

              </div>

              <div>

                <p className="text-slate-500 text-sm">Medical Summary</p>
                <p className="text-sm">{analysis.summary}</p>

              </div>

              {analysis.riskLevel === "high" ? (

                <div className="bg-red-100 text-red-700 rounded-lg p-3 text-xs font-medium">
                  ⚠ Immediate doctor attention recommended
                </div>

              ) : (

                <div className="bg-green-100 text-green-700 rounded-lg p-3 text-xs font-medium">
                  No critical risk detected
                </div>

              )}

              <button className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
                Confirm & Save Consultation
              </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
}
