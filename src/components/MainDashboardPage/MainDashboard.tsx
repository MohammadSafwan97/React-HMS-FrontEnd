import DashboardHeader from '../../components/dashboard/DashboardHeader';
import StatsGrid from '../../components/dashboard/StatsGrid';
import RecentActivity from '../../components/dashboard/RecentActivity';
import UpcomingTasks from '../../components/dashboard/UpcomingTasks';

import {
  dashboardStats,
  recentActivityMock,
  upcomingTasksMock,
} from '../../mocks/dashboardmock'

import {
  FileText,
  Clock,
  FileCheck,
  FileSpreadsheet,
  Users,
  Construction,
} from 'lucide-react';



export  function MainDashboard() {
 

  return (
    <div className="p-8">
      <DashboardHeader  />
      <StatsGrid stats={dashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity recentActivity={recentActivityMock} />
        <UpcomingTasks upcomingTasks={upcomingTasksMock} />
      </div>
    </div>
  );
}
