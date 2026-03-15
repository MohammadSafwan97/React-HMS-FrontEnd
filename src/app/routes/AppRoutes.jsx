import { Routes, Route, Navigate } from "react-router";

import { ProtectedRoute } from "./ProtectedRoute";

import { LoginPage } from "../../feature/security/pages/LoginPage";
import { DashboardLayout } from "../../shared/layout/DashboardLayout";

import { MainDashboard } from "../../feature/dashboard/pages/MainDashboard";
import { Appointments } from "../../feature/appointments/pages/Appointments";
import { Patients } from "../../feature/patients/pages/Patients";
import { Doctors } from "../../feature/doctors/pages/Doctor";
import { MedicalRecords } from "../../feature/medicalrecords/Pages/MedicalRecords.jsx";
import { User } from "../../feature/users/pages/User";
import { Prescriptions } from "../../feature/prescriptions/pages/Prescriptions";
import { MedicalAssistant } from "../../feature/ai-assistant/components/MedicalAssistant";

export function AppRoutes({ user, onLogin, onLogout }) {

  return (
    <Routes>

      {/* LOGIN */}

      <Route
        path="/login"
        element={
          !user
            ? <LoginPage onLogin={onLogin} />
            : <Navigate to="/dashboard" replace />
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
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="dashboard" element={<MainDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="users" element={<User />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="medical-records" element={<MedicalRecords />} />
        <Route path="ai-assistant" element={<MedicalAssistant />} />

      </Route>

    </Routes>
  );
}
