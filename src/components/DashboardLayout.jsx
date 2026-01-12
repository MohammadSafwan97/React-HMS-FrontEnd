import { Outlet, NavLink } from 'react-router';
import logo from '../assets/anchorageKarachi.jpg';
import {
  LayoutDashboard,
  FileText,
  Building,
  FileCheck,
  FileSpreadsheet,
  Shield,
  Briefcase,
  Users,
  Clock,
  Construction,
  BarChart3,
  Settings as SettingsIcon,
  Building2,
  LogOut,
  User,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/employees', icon: Users, label: 'Employees' },
  { path: '/attendance', icon: Clock, label: 'Attendance' },
  { path: '/transfer-cases', icon: FileText, label: 'Transfer Cases' },
  
  
  { path: '/pao-management', icon: FileSpreadsheet, label: 'PAL / PAO Management' },
  { path: '/ndc-noc-records', icon: Shield, label: 'NDC / NOC Records' },
  { path: '/estate-agents', icon: Briefcase, label: 'Estate Agents' },
  
  
  { path: '/construction-projects', icon: Construction, label: 'Construction Projects' },
  { path: '/property-records', icon: Building, label: 'Gallery' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/settings', icon: SettingsIcon, label: 'Settings' },
  { path: '/chatbot', icon: SettingsIcon, label: 'Help' },
];

export function DashboardLayout({ onLogout }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-15 h-15 rounded-lg flex items-center justify-center rounded-full">
              <img
                src={logo}
                alt="Anchorage Karachi"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div>
              <div className="text-sm opacity-90">Anchorage Karachi</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
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

        {/* User Profile */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm">Admin User</div>
              <div className="text-xs text-blue-300">Administrator</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
