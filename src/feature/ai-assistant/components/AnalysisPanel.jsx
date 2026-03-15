import { ConfidenceBar } from "./ConfidenceBar";
import { MedicationTable } from "./MedicationTable";
import { RiskAlert } from "./RiskAlert";
import { AIDisclaimer } from "./AIDisclaimer";

export function AnalysisPanel({ analysis, loading }) {

  return (

    <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8 space-y-5">

      {!analysis && !loading && (
        <p className="text-sm text-slate-500">
          AI analysis will appear here after symptoms are analyzed.
        </p>
      )}

      {analysis && (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <div>

              <p className="text-slate-500">Condition</p>
              <p className="font-medium">{analysis.condition}</p>

            </div>

            <div>

              <p className="text-slate-500">AI Confidence</p>
              <ConfidenceBar confidence={analysis.confidence} />

            </div>

            <div>

              <p className="text-slate-500">Risk Level</p>
              <RiskAlert riskLevel={analysis.riskLevel} />

            </div>

          </div>

          <div>

            <p className="text-slate-500 text-sm">Key Findings</p>
            <p className="text-sm">
              {analysis.findings.join(", ")}
            </p>

          </div>

          <MedicationTable medications={analysis.medications} />

          <div>

            <p className="text-slate-500 text-sm">
              Doctor Instructions
            </p>

            <textarea
              defaultValue={analysis.instructions}
              className="w-full border rounded-lg p-2 text-sm"
            />

          </div>

          <div>

            <p className="text-slate-500 text-sm">
              Medical Summary
            </p>

            <p className="text-sm">
              {analysis.summary}
            </p>

          </div>

          <RiskAlert riskLevel={analysis.riskLevel} />
          <AIDisclaimer />

        </>
      )}

    </div>

  );

}
