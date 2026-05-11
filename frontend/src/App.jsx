import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";
import DashboardPage from "../src/pages/DashboardPage";
import AdminDashboard from "../src/pages/AdminDashboard";

import "./App.css";

function App() {

  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <LoginPage />
        }
      />

      {/* SIGNUP */}
      <Route
        path="/signup"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <SignupPage />
        }
      />

      {/* USER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          user
            ? <DashboardPage />
            : <Navigate to="/login" replace />
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          user && isAdmin
            ? <AdminDashboard />
            : <Navigate to="/dashboard" replace />
        }
      />

      {/* DEFAULT */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;