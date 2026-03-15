import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/StatsGrid";
import RecentActivity from "../components/RecentActivity";
import UpcomingTasks from "../components/UpcomingTasks";
import { getDashboardStats } from "../services/dashboardService";

import {
  dashboardStats,
  recentActivityMock,
  upcomingTasksMock,
} from "../../../mocks/dashboardmock";

import { useEffect, useState } from "react";

import {
  Users,
  Stethoscope,
  CalendarCheck,
  Clock,
  FileText,
} from "lucide-react";

export function MainDashboard() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();

        const formattedStats = [
          {
            id: "total-patients",
            label: "Total Patients",
            value: data.totalPatients,
            icon: Users,
            color: "from-blue-500 to-blue-600",
            trend: `${data.newPatientsThisMonth} new this month`,
          },
          {
            id: "appointments-today",
            label: "Appointments Today",
            value: data.todayAppointments,
            icon: CalendarCheck,
            color: "from-amber-500 to-amber-600",
            trend: `${data.pendingAppointments} pending`,
          },
          {
            id: "active-doctors",
            label: "Doctors",
            value: data.totalDoctors,
            icon: Stethoscope,
            color: "from-teal-500 to-teal-600",
            trend: "On duty",
          },
          {
            id: "total-appointments",
            label: "Total Appointments",
            value: data.totalAppointments,
            icon: Clock,
            color: "from-indigo-500 to-indigo-600",
            trend: `${data.completedAppointments} completed`,
          },
          {
            id: "emergency",
            label: "Emergency Patients",
            value: data.emergencyPatients,
            icon: FileText,
            color: "from-red-500 to-red-600",
            trend: "Critical care",
          },
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <DashboardHeader title="Hospital Overview" />

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <RecentActivity recentActivity={recentActivityMock} />
        <UpcomingTasks upcomingTasks={upcomingTasksMock} /> */}
      </div>
    </div>
  );
}