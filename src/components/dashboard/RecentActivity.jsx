import { CheckCircle, AlertCircle, Activity } from 'lucide-react';

export default function RecentActivity({ recentActivity = [] }) {

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-teal-500";
      case "warning":
        return "bg-amber-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">

      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-slate-700" />
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">

        {recentActivity.map((activity) => (

          <div
            key={activity.id}
            className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0"
          >

            <div
              className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`}
            />

            <div className="flex-1">
              <div className="text-sm text-slate-900">
                {activity.action}
              </div>

              <div className="text-xs text-slate-500 mt-1">
                {activity.type} • {activity.time}
              </div>
            </div>

            {activity.status === "success" && (
              <CheckCircle className="w-4 h-4 text-teal-500" />
            )}

            {activity.status === "warning" && (
              <AlertCircle className="w-4 h-4 text-amber-500" />
            )}

          </div>

        ))}

      </div>

    </div>
  );
}