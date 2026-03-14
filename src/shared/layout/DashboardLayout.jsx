import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import logo from "../../assets/anchorageKarachi.jpg";

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarCheck,
  FileText,
  ClipboardList,
  UserCog,
  LogOut,
  User,
  Menu,
} from "lucide-react";

/* ---------------- NAV SECTIONS ---------------- */

const NAV_SECTIONS = [
  {
    title: "MAIN",
    items: [{ path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" }],
  },

  {
    title: "PATIENT CARE",
    items: [
      { path: "/patients", icon: Users, label: "Patients" },
      { path: "/appointments", icon: CalendarCheck, label: "Appointments" },
      { path: "/prescriptions", icon: FileText, label: "Prescriptions" },
      // { path: "/ai-assitant", icon: ClipboardList, label: "Doctor Assistant" },
    ],
  },

  {
    title: "ADMINISTRATION",
    items: [
      { path: "/doctors", icon: Stethoscope, label: "Doctors" },
      { path: "/users", icon: UserCog, label: "Users" },
      { path: "/ai-assistant", icon: ClipboardList, label: "Doctor Assistant" },
    ],
  },
];

/* ---------------- ROLE ACCESS ---------------- */

const NAV_BY_ROLE = {
  admin: NAV_SECTIONS.flatMap((section) => section.items.map((i) => i.path)),

  doctor: [
    "/dashboard",
    "/patients",
    "/appointments",
    "/medical-records",
    "/prescriptions",
  ],

  receptionist: ["/dashboard", "/patients", "/appointments"],
};

/* ---------------- COMPONENT ---------------- */

export function DashboardLayout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || !user.role) return null;

  const allowedPaths = NAV_BY_ROLE[user.role] || [];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* SIDEBAR */}
      <aside
        className={`
        fixed md:static z-40
        w-64 bg-gradient-to-b from-blue-900 to-blue-950 text-white flex flex-col
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* LOGO */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Hospital"
              className="w-14 h-14 rounded-full"
            />

            <div>
              <div className="font-semibold">Faris Hospital</div>

              <div className="text-xs text-blue-300">
                Management System
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {NAV_SECTIONS.map((section) => {
            const visibleItems = section.items.filter((item) =>
              allowedPaths.includes(item.path)
            );

            if (!visibleItems.length) return null;

            return (
              <div key={section.title} className="mb-6">
                <div className="text-xs text-blue-300 uppercase px-3 mb-2">
                  {section.title}
                </div>

                <div className="space-y-1">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                            isActive
                              ? "bg-white/10 shadow-md"
                              : "text-blue-200 hover:bg-white/5 hover:text-white"
                          }`
                        }
                      >
                        <Icon className="w-5 h-5" />

                        <span className="text-sm">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* USER PROFILE */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>

            <div className="flex-1">
              <div className="text-sm font-medium">{user.email}</div>

              <div className="text-xs text-blue-300 capitalize">
                {user.role}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        {/* MOBILE TOPBAR */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          <div className="font-semibold text-slate-700">
            CityCare
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}