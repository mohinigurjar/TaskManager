import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"

const DashboardPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        await logout();
        navigate("/login");
    }
  return (
    <div>
        <div>DashboardPage</div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default DashboardPage