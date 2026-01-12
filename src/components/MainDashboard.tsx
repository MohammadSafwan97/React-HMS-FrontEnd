import {
  FileText,
  Clock,
  FileCheck,
  FileSpreadsheet,
  Users,
  Construction,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Activity,
  MessageCircle,
  Mail,
} from 'lucide-react';
import logo from '../assets/anchorageKarachi.jpg';

const stats = [
  {
    label: 'Total Transfer Cases',
    value: '248',
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    trend: '+12% this month',
  },
  {
    label: 'Pending Transfers',
    value: '34',
    icon: Clock,
    color: 'from-amber-500 to-amber-600',
    trend: '8 urgent',
  },
  {
    label: 'Active PALs',
    value: '156',
    icon: FileCheck,
    color: 'from-teal-500 to-teal-600',
    trend: '+8 this week',
  },
  {
    label: 'Issued PAOs',
    value: '89',
    icon: FileSpreadsheet,
    color: 'from-indigo-500 to-indigo-600',
    trend: '12 pending',
  },
  {
    label: 'Total Employees',
    value: '25',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    trend: '98% present today',
  },
  {
    label: 'Construction Projects',
    value: '2',
    icon: Construction,
    color: 'from-rose-500 to-rose-600',
    trend: '6 ongoing',
  },
];

const recentActivity = [
  { id: 1, type: 'Transfer Case', action: 'TC-2024-1248 approved', time: '10 minutes ago', status: 'success' },
  { id: 2, type: 'PAL', action: 'New PAL issued for Gwadar property', time: '1 hour ago', status: 'success' },
  { id: 3, type: 'Employee', action: 'New employee added - Ali Khan', time: '2 hours ago', status: 'info' },
  { id: 4, type: 'Transfer Case', action: 'TC-2024-1245 requires review', time: '3 hours ago', status: 'warning' },
  { id: 5, type: 'Construction', action: 'Project Phase 3 milestone completed', time: '5 hours ago', status: 'success' },
];

const upcomingTasks = [
  { id: 1, title: 'Review pending transfer cases', due: 'Today', priority: 'high' },
  { id: 3, title: 'Complete Transfer Case', due: 'Tomorrow', priority: 'high' },
  { id: 4, title: 'Monthly attendance report generation', due: 'In 2 days', priority: 'medium' },
  { id: 5, title: 'Review  documentation', due: 'In 3 days', priority: 'low' },
];

export function MainDashboard() {
 
  const openWhatsApp = () => {
    // Put your number here (with country code, no + sign), example: 923001234567
    const phone = '923312086162';
    const message = encodeURIComponent('Assalam o Alaikum! I need assistance regarding transfer case / PAL / PAO.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  
  const openGmail = () => {
    // Put email here
    const to = 'example@gmail.com';
    const subject = encodeURIComponent('Transfer Case / PAL / PAO - Support');
    const body = encodeURIComponent(
      'Assalam o Alaikum,\n\nI need assistance regarding transfer case / PAL / PAO.\n\nRegards'
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-slate-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-600">Welcome back!</p>
        </div>

        
        <div className="flex gap-2">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            title="Open WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>

          <button
            onClick={openGmail}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            title="Open Gmail"
          >
            <Mail className="w-4 h-4" />
            Gmail
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-slate-600 text-sm mb-1">{stat.label}</div>
              <div className="text-slate-900 mb-2">{stat.value}</div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-slate-700" />
            <h2 className="text-slate-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success'
                      ? 'bg-teal-500'
                      : activity.status === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <div className="text-sm text-slate-900">{activity.action}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {activity.type} • {activity.time}
                  </div>
                </div>
                {activity.status === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-teal-500" />
                ) : activity.status === 'warning' ? (
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-slate-900 mb-6">Upcoming Tasks</h2>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="pb-4 border-b border-slate-100 last:border-0">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-blue-900 border-slate-300 rounded focus:ring-2 focus:ring-blue-900"
                  />
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
      </div>
    </div>
  );
}
