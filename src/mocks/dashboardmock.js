import {
  Users,
  Stethoscope,
  CalendarCheck,
  Clock,
  Building2,
  FileText,
} from 'lucide-react';

/**
 * Dashboard Stats
 */
export const dashboardStats = [
  {
    id: 'total-patients',
    label: 'Total Patients',
    value: 248,
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    trend: '+12 admitted today',
  },
  {
    id: 'appointments-today',
    label: 'Appointments Today',
    value: 34,
    icon: CalendarCheck,
    color: 'from-amber-500 to-amber-600',
    trend: '8 urgent',
  },
  {
    id: 'active-doctors',
    label: 'Doctors On Duty',
    value: 18,
    icon: Stethoscope,
    color: 'from-teal-500 to-teal-600',
    trend: '3 on leave',
  },
  {
    id: 'medical-records',
    label: 'Medical Records',
    value: 156,
    icon: FileText,
    color: 'from-indigo-500 to-indigo-600',
    trend: '+20 updated today',
  },
  {
    id: 'staff-members',
    label: 'Hospital Staff',
    value: 25,
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    trend: '98% present today',
  },
  {
    id: 'departments',
    label: 'Departments',
    value: 8,
    icon: Building2,
    color: 'from-rose-500 to-rose-600',
    trend: '2 new units',
  },
];
export const recentActivityMock = [
  {
    id: 1,
    type: 'Appointment',
    action: 'Patient appointment confirmed - John Doe',
    time: '10 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'Patient',
    action: 'New patient registered - Sarah Ahmed',
    time: '1 hour ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'Doctor',
    action: 'Dr. Ali Khan started duty',
    time: '2 hours ago',
    status: 'info',
  },
  {
    id: 4,
    type: 'Emergency',
    action: 'Emergency patient admitted',
    time: '3 hours ago',
    status: 'warning',
  },
  {
    id: 5,
    type: 'Department',
    action: 'Cardiology department meeting completed',
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
    title: 'Review today’s patient appointments',
    due: 'Today',
    priority: 'high',
  },
  {
    id: 102,
    title: 'Approve new patient registrations',
    due: 'Tomorrow',
    priority: 'high',
  },
  {
    id: 103,
    title: 'Generate weekly hospital report',
    due: 'In 2 days',
    priority: 'medium',
  },
  {
    id: 104,
    title: 'Update patient medical records',
    due: 'In 3 days',
    priority: 'low',
  },
];
