import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // auth still checking
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  // auth checked, not logged in
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // prevent admin from user dashboard
  if (user.role?.toLowerCase() === "admin") {
    return <Navigate to="/admin" replace />;
  }


  return children;
};

export default ProtectedRoute