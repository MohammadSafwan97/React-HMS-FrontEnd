import { TrendingUp } from "lucide-react";

export default function StatsGrid({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <div className="mb-3 sm:mb-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                {Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 mb-1">
              {stat.label}
            </div>

            <div className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1 sm:mb-2">
              {stat.value}
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </div>
          </div>
        );
      })}
    </div>
  );
}