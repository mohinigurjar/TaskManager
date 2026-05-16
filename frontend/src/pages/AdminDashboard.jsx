import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  adminFetchTasks,
  adminFetchUsers,
  adminUpdateUserRole,
} from "../services/admin.services";

import UserRow from "../components/UserRow";

const AdminDashboard = () => {
    const { user, logout } = useAuth();

    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [userTasks, setUserTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();

    // FETCH USERS
    const fetchUsers = async () => {
        try {
            const res = await adminFetchUsers();
            setUsers(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // FETCH TASKS
    const fetchTasks = async () => {
        try {
            const res = await adminFetchTasks();
            setTasks(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // SHOW USER TASKS
    const handleUsersTasks = (userId) => {
        const filteredTasks = tasks.filter(
            (task) => task?.createdBy?._id === userId
        );

        const currentUser = users.find(
            (user) => user._id === userId
        );

            setSelectedUser(currentUser);
            setUserTasks(filteredTasks);
    };

    // CHANGE USER ROLE
    const changeUsersRole = async (userId, newRole) => {
        try {
            await adminUpdateUserRole(userId, newRole);

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                user._id === userId
                    ? { ...user, role: newRole }
                    : user
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    // LOGOUT
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    // INITIAL FETCH
    useEffect(() => {
        fetchUsers();
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

        {/* MAIN CARD */}
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 ">

            {/* HEADER */}
            <div className="flex items-start justify-between mb-8">
                
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                    Welcome, {user?.name}
                    </p>

                    <p className="text-gray-500 mt-1">
                        Manage users and tasks
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>
            </div>

            {/* USERS SECTION */}
            <div className="mb-10">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                Users ({users.length})
                </h2>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                <UserRow
                    key={user._id}
                    user={user}
                    onFetchUserTasks={handleUsersTasks}
                    onChangeUserRole={changeUsersRole}
                />
                ))}
            </div>

            </div>

            {/* TASKS SECTION */}
            <div>

            <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                {selectedUser
                    ? `${selectedUser.name}'s Tasks`
                    : "User Tasks"}
                </h2>
            </div>

            {/* EMPTY STATE */}
            {userTasks.length === 0 ? (
                <div className="text-gray-500 text-center py-6 border border-dashed border-gray-300 rounded-xl">
                No tasks to display
                </div>
            ) : (
                <ul className="space-y-3">
                {userTasks.map((task) => (
                    <li
                        key={task._id}
                        className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                    <div>
                        <p className="text-gray-800 font-medium">
                        {task.task}
                        </p>

                        <p
                        className={`text-sm mt-1 capitalize ${
                            task.status ===
                            "completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                        >
                        {task.status}
                        </p>
                    </div>
                    </li>
                ))}
                </ul>
            )}

            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;