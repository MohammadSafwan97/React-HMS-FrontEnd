export function RiskAlert({ riskLevel }) {

  if (riskLevel === "high") {

    return (
      <div className="bg-red-100 text-red-700 rounded-lg p-3 text-xs font-medium">
        ⚠ Immediate doctor attention recommended
      </div>
    );

  }

  return (
    <div className="bg-green-100 text-green-700 rounded-lg p-3 text-xs font-medium">
      No critical risk detected
    </div>
  );

}
