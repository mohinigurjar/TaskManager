import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // auth still checking
    if (user === undefined) {
        return <div>Loading...</div>;
    }

    // auth checked, not logged in
    if (user === null) {
        return <Navigate to="/login" replace />;
    }
    
    //auth checked, role is not admin
    if (user.role?.toLowerCase() !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;