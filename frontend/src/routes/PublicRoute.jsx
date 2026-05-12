import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ page }) => {

    const { user } = useAuth();

    // auth checked, not logged in
    if (user === null) {
        return page;
    }

    //auth checked, role checked
    return user?.role?.toLowerCase() === "admin"
        ? <Navigate to="/admin" replace />
        : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;