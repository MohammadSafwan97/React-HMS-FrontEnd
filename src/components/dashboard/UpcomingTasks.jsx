export default function UpcomingTasks({ upcomingTasks }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h2 className="text-slate-900 mb-6">Upcoming Tasks</h2>

      <div className="space-y-4">
        {upcomingTasks.map((task) => (
          <div key={task.id} className="pb-4 border-b border-slate-100 last:border-0">
            <div className="flex items-start gap-3">
              <input type="checkbox" className="mt-1 w-4 h-4" />
              <div className="flex-1">
                <div className="text-sm text-slate-900">{task.title}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-slate-500">{task.due}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'high'
                        ? 'bg-red-50 text-red-600'
                        : task.priority === 'medium'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
