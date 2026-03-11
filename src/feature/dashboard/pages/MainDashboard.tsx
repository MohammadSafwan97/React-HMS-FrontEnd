import DashboardHeader from '../components/DashboardHeader';
import StatsGrid from '../components/StatsGrid';
import RecentActivity from '../components/RecentActivity';
import UpcomingTasks from '../components/UpcomingTasks';

import {
  dashboardStats,
  recentActivityMock,
  upcomingTasksMock,
} from '../../../mocks/dashboardmock';


export function MainDashboard() {

  return (
    <div className="p-8">

      <DashboardHeader title="Hospital Overview" />

      <StatsGrid stats={dashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity recentActivity={recentActivityMock} />
        <UpcomingTasks upcomingTasks={upcomingTasksMock} />
      </div>

    </div>
  );
}