export function AssistantHeader() {

  return (

    <div className="border-b px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-slate-900">

      <div>

        <h2 className="text-lg md:text-xl font-semibold">
          AI Consultation Assistant
        </h2>

        <p className="text-sm text-slate-500">
          Enter patient symptoms to generate AI clinical suggestions
        </p>

      </div>

      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
        AI Powered
      </span>

    </div>

  );

}
