import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/SideDashboardLayout/DashboardLayout';
import {ProjectDirectorDashboard} from './Pages/ProjectDirector/ProjectDirectorDashboard';
import { MainDashboard } from './components/MainDashboardPage/MainDashboard';
import { TransferCases } from './components/TransferCasePage/TransferCases';
import { AnchorageKarachiGallery } from './components/AnchorageKarachiGallery';
import { PALManagement } from './components/PALManagement';
import {PAOPALManagement} from './components/PAOPALManagement';
import { NDCNOCRecords } from './components/NDCNOCRecords';
import { EstateAgents } from './components/EstateAgents';
import { Employees } from './Pages/EmployeesPage/Employees';
import { Attendance } from './Pages/AttendancePage/Attendance';
import { ConstructionProjects } from './components/ConstructionProjects';
import { Reports } from './components/Reports';
import { Chatbot } from './components/Chatbot';
import { Settings } from './components/Settings';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <DashboardLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<MainDashboard />} />
          <Route path="transfer-cases" element={<TransferCases />} />
          <Route path="property-records" element={<AnchorageKarachiGallery />} />
          <Route path="pal-management" element={<PALManagement />} />
          <Route path="pao-management" element={<PAOPALManagement />} />
          <Route path="ndc-noc-records" element={<NDCNOCRecords />} />
          <Route path="estate-agents" element={<EstateAgents />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="construction-projects" element={<ConstructionProjects />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="project-director" element={<ProjectDirectorDashboard/>}/>
          <Route path="chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </Router>
  );
}
