import StatCard from './StatCard';
import { CheckCircle, XCircle, Clock, Users } from 'lucide-react';

export default function AttendanceStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard label="Present Today" value={stats.present} icon={CheckCircle} color="teal" />
      <StatCard label="Absent Today" value={stats.absent} icon={XCircle} color="red" />
      <StatCard label="On Leave" value={stats.onLeave} icon={Clock} color="amber" />
      <StatCard label="Attendance Rate" value={`${stats.attendanceRate}%`} icon={Users} color="blue" />
    </div>
  );
}
