import { TrendingUp } from 'lucide-react';

export default function StatsGrid({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >

            <div className="mb-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                {Icon && <Icon className="w-6 h-6 text-white" />}
              </div>
            </div>

            <div className="text-sm text-slate-600 mb-1">
              {stat.label}
            </div>

            <div className="text-2xl font-semibold text-slate-900 mb-2">
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