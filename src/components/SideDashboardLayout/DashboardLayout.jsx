import { Outlet, NavLink } from 'react-router';
import logo from '../../assets/anchorageKarachi.jpg';
import {
  LayoutDashboard,
  UserPlus,
  Stethoscope,
  Clock,
  CalendarCheck,
  CalendarOff,
  FileText,
  ShieldCheck,
  Building2,
  BarChart3,
  Settings as SettingsIcon,
  MessageCircle,
  LogOut,
  User,
} from 'lucide-react';
/* ---------------- NAV ITEMS ---------------- */

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Hospital Dashboard' },
  { path: '/patients', icon: UserPlus, label: 'Patients' },
  { path: '/doctors', icon: Clock, label: 'Doctors' },
  { path: '/appointments', icon: CalendarCheck, label: 'Appointments' },
  { path: '/attendance', icon: Clock, label: 'Staff Attendance' },
  { path: '/leave-record', icon: CalendarOff, label: 'Staff Leave' },
  { path: '/medical-records', icon: FileText, label: 'Medical Records' },
  { path: '/ndc-noc-records', icon: ShieldCheck, label: 'Compliance Records' },
  { path: '/estate-agents', icon: Stethoscope, label: 'Doctors' },
  { path: '/construction-projects', icon: Building2, label: 'Departments' },
  { path: '/property-records', icon: Building2, label: 'Hospital Gallery' },
  { path: '/reports', icon: BarChart3, label: 'Hospital Reports' },
  { path: '/settings', icon: SettingsIcon, label: 'System Settings' },
  { path: '/chatbot', icon: MessageCircle, label: 'Help Assistant' },
  { path: '/project-director', icon: User, label: 'Hospital Director' },
];

/* ---------------- ROLE → NAV MAP ---------------- */

const NAV_BY_ROLE = {
  admin: navItems.map(i => i.path), // full access

  transfer: navItems
    .map(i => i.path)
    .filter(
      path =>
        path !== '/employees' &&
        path !== '/attendance' &&
        path !== '/project-director' &&
        path !== '/settings'
    ),

  employee: ['/employees', '/attendance','/leave-record'],

  director: ['/project-director'],
};



/* ---------------- COMPONENT ---------------- */

export function DashboardLayout({ user, onLogout }) {
  // 🛡 SAFETY GUARD
  if (!user || !user.role) {
    return null; 
  }

  const allowedPaths = NAV_BY_ROLE[user.role] || [];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">
        
        {/* LOGO */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Hospital Management"
              className="w-16 h-16 rounded-full"
            />
            <div className="text-sm opacity-90">Hospital Management</div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navItems
              .filter(item => allowedPaths.includes(item.path))
              .map(item => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-white/10 text-white shadow-lg'
                          : 'text-blue-200 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </NavLink>
                );
              })}
          </div>
        </nav>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm">{user.email}</div>
              <div className="text-xs text-blue-300 capitalize">
                {user.role}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 
                       bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
