import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/SideDashboardLayout/DashboardLayout';
import { ProjectDirectorDashboard } from './Pages/ProjectDirector/ProjectDirectorDashboard';
import { MainDashboard } from './components/MainDashboardPage/MainDashboard';
import { Appointments } from './Pages/Appointments';
import { AnchorageKarachiGallery } from './components/AnchorageKarachiGallery';
import { PALManagement } from './components/PALManagement';
import { PAOPALManagement } from './components/PAOPALManagement';
import { NDCNOCRecords } from './components/NDCNOCRecords';
import { EstateAgents } from './components/EstateAgents';
import { Patients } from './Pages/Patients';
import { Doctors } from './Pages/Doctor';
import { MedicalRecords } from './Pages/MedicalRecords';
import { EmployeeLeaveManagement } from './components/EmployeeLeaveManagement';
import { Attendance } from './Pages/AttendancePage/Attendance';
import { ConstructionProjects } from './components/ConstructionProjects';
import { Reports } from './components/Reports';
import { Chatbot } from './components/Chatbot';
import { Settings } from './components/Settings';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const getDefaultRoute = () => {
    if (!user) return '/login';

    switch (user.role) {
      case 'transfer':
        return '/transfer-cases';
      case 'employee':
        return '/employees';
      case 'director':
        return '/project-director';
      default:
        return '/dashboard'; // admin
    }
  };

  return (
    <Router>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !user ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to={getDefaultRoute()} replace />
            )
          }
        />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />

          {/* ADMIN */}
          <Route path="dashboard" element={<MainDashboard />} />

          {/* ROLE BASED */}
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="leave-record" element={<EmployeeLeaveManagement />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="project-director" element={<ProjectDirectorDashboard />} />

          {/* COMMON / ADMIN */}
          <Route path="property-records" element={<AnchorageKarachiGallery />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="pao-management" element={<PAOPALManagement />} />
          <Route path="ndc-noc-records" element={<NDCNOCRecords />} />
          <Route path="estate-agents" element={<EstateAgents />} />
          <Route path="construction-projects" element={<ConstructionProjects />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chatbot" element={<Chatbot />} />
        </Route>
        
      </Routes>
      <ToastContainer />
    </Router>
  );
}
