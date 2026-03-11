import { Routes, Route, Navigate } from "react-router";

import { ProtectedRoute } from "./ProtectedRoute";
import { getDefaultRoute } from "./roleRoutes";

import { LoginPage } from "../LoginPage";
import { DashboardLayout } from "../../shared/layout/DashboardLayout";

import { MainDashboard } from "../../feature/dashboard/pages/MainDashboard";
import { Appointments } from "../../feature/appointments/pages/Appointments";
import { Patients } from "../../feature/patients/pages/Patients";
import { Doctors } from "../../feature/doctors/pages/Doctor";
import { MedicalRecords } from "../../Pages/MedicalRecords";

import { Attendance } from "../../Pages/AttendancePage/Attendance";
import { ProjectDirectorDashboard } from "../../Pages/ProjectDirector/ProjectDirectorDashboard";

import { AnchorageKarachiGallery } from "../../components/AnchorageKarachiGallery";
import { PAOPALManagement } from "../../components/PAOPALManagement";
import { NDCNOCRecords } from "../../components/NDCNOCRecords";
import { EstateAgents } from "../../components/EstateAgents";
import { EmployeeLeaveManagement } from "../../components/EmployeeLeaveManagement";
import { ConstructionProjects } from "../../components/ConstructionProjects";
import { Reports } from "../../components/Reports";
import { Chatbot } from "../../components/Chatbot";
import { Settings } from "../../components/Settings";

export function AppRoutes({ user, onLogin, onLogout }) {

  return (
    <Routes>

      {/* LOGIN */}

      <Route
        path="/login"
        element={
          !user
            ? <LoginPage onLogin={onLogin} />
            : <Navigate to={getDefaultRoute(user)} replace />
        }
      />

      {/* PROTECTED AREA */}

      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <DashboardLayout user={user} onLogout={onLogout} />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<Navigate to={getDefaultRoute(user)} replace />}
        />

        <Route path="dashboard" element={<MainDashboard />} />

        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="medical-records" element={<MedicalRecords />} />

        <Route path="leave-record" element={<EmployeeLeaveManagement />} />
        <Route path="attendance" element={<Attendance />} />

        <Route path="project-director" element={<ProjectDirectorDashboard />} />

        <Route path="property-records" element={<AnchorageKarachiGallery />} />
        <Route path="pao-management" element={<PAOPALManagement />} />
        <Route path="ndc-noc-records" element={<NDCNOCRecords />} />
        <Route path="estate-agents" element={<EstateAgents />} />
        <Route path="construction-projects" element={<ConstructionProjects />} />

        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="chatbot" element={<Chatbot />} />

      </Route>

    </Routes>
  );
}