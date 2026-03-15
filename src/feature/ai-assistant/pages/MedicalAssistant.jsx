import { useState } from "react";
import { analyzeSymptoms as analyzeAPI } from "../services/aiService";

import { AssistantHeader } from "../components/AssistantHeader";
import { SymptomsPanel } from "../components/SymptomsPanel";
import { AnalysisPanel } from "../components/AnalysisPanel";

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

    } catch {

      setError("AI analysis failed. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md border text-slate-900">

      <AssistantHeader />

      <div className="flex flex-col md:flex-row">

        <SymptomsPanel
          symptoms={symptoms}
          setSymptoms={setSymptoms}
          analyzeSymptoms={analyzeSymptoms}
          loading={loading}
          error={error}
        />

        <AnalysisPanel
          analysis={analysis}
          loading={loading}
        />

      </div>

    </div>

  );

}
