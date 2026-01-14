import {
  FileText,
  Clock,
  FileCheck,
  FileSpreadsheet,
  Users,
  Construction,
} from 'lucide-react';

/**
 * Dashboard Stats
 */
export const dashboardStats = [
  {
    id: 'total-transfer-cases',
    label: 'Total Transfer Cases',
    value: 248,
    icon: FileText,
    color: 'from-blue-500 to-blue-600',
    trend: '+12% this month',
  },
  {
    id: 'pending-transfers',
    label: 'Pending Transfers',
    value: 34,
    icon: Clock,
    color: 'from-amber-500 to-amber-600',
    trend: '8 urgent',
  },
  {
    id: 'active-pals',
    label: 'Active PALs',
    value: 156,
    icon: FileCheck,
    color: 'from-teal-500 to-teal-600',
    trend: '+8 this week',
  },
  {
    id: 'issued-paos',
    label: 'Issued PAOs',
    value: 89,
    icon: FileSpreadsheet,
    color: 'from-indigo-500 to-indigo-600',
    trend: '12 pending',
  },
  {
    id: 'employees',
    label: 'Total Employees',
    value: 25,
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    trend: '98% present today',
  },
  {
    id: 'construction-projects',
    label: 'Construction Projects',
    value: 2,
    icon: Construction,
    color: 'from-rose-500 to-rose-600',
    trend: '6 ongoing',
  },
];

/**
 * Recent Activity Feed
 */
export const recentActivityMock = [
  {
    id: 1,
    type: 'Transfer Case',
    action: 'TC-2024-1248 approved',
    time: '10 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'PAL',
    action: 'New PAL issued for Gwadar property',
    time: '1 hour ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'Employee',
    action: 'New employee added - Ali Khan',
    time: '2 hours ago',
    status: 'info',
  },
  {
    id: 4,
    type: 'Transfer Case',
    action: 'TC-2024-1245 requires review',
    time: '3 hours ago',
    status: 'warning',
  },
  {
    id: 5,
    type: 'Construction',
    action: 'Project Phase 3 milestone completed',
    time: '5 hours ago',
    status: 'success',
  },
];

/**
 * Upcoming Tasks
 */
export const upcomingTasksMock = [
  {
    id: 101,
    title: 'Review pending transfer cases',
    due: 'Today',
    priority: 'high',
  },
  {
    id: 102,
    title: 'Complete Transfer Case',
    due: 'Tomorrow',
    priority: 'high',
  },
  {
    id: 103,
    title: 'Monthly attendance report generation',
    due: 'In 2 days',
    priority: 'medium',
  },
  {
    id: 104,
    title: 'Review documentation',
    due: 'In 3 days',
    priority: 'low',
  },
];
