import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import TaskRow from "../components/TaskRow";

import {
  fetchTasks,
  createTask,
  deleteTask,
  editTask,
  updateStatus,
} from "../services/task.services";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // FETCH TASKS
  const fetchingTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res?.data?.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch tasks");
      setTasks([]);
    }
  };

  // CREATE TASK
  const handleCreatingTasks = async () => {
    try {
      setError("");

      if (!newTask.trim()) {
        setError("Task cannot be empty");
        return;
      }

      const res = await createTask({ task: newTask });

      setTasks((prev) => [res.data.data, ...prev]);

      setNewTask("");
    } catch (error) {
      console.log(error);
      setError("Failed to create task");
    }
  };

  // EDIT TASK
  const handleEditTask = async (taskId, data) => {
    try {
      setError("");

      if (!data.task.trim()) {
        setError("Task cannot be empty while editing");
        return;
      }

      const currentTask = tasks.find((task) => task._id === taskId);

      if (currentTask.task === data.task) {
        setError("No changes made to task");
        return;
      }

      const res = await editTask(taskId, data);

      const updatedTask = res.data.data;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? updatedTask : task
        )
      );
    } catch (err) {
      console.log(err);
      setError("Failed to edit task");
    }
  };

  // UPDATE STATUS
  const handleEditStatus = async (taskId, currentStatus) => {
    try {
      setError("");

      const newStatus =
        currentStatus === "pending"
          ? "completed"
          : "pending";

      const res = await updateStatus(taskId, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? res.data.data : task
        )
      );
    } catch (err) {
      console.log(err);
      setError("Failed to update status");
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (taskId) => {
    try {
      setError("");

      await deleteTask(taskId);

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to delete task");
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // FETCH TASKS
  useEffect(() => {
    if (!user) return;
    fetchingTasks();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome, {user?.name}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* TASK COUNT */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Tasks ({tasks.length})
          </h2>
        </div>

        {/* CREATE TASK */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            name="newTask"
            value={newTask}
            placeholder="Create a new task..."
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleCreatingTasks}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>

        {/* TASK LIST */}
        <ul className="space-y-3">
          {tasks
            .filter(
              (task) => task?.createdBy?._id === user?._id
            )
            .map((task) => (
              <li key={task._id}>
                <TaskRow
                  task={task}
                  onEdit={handleEditTask}
                  onStatusUpdate={handleEditStatus}
                  onDelete={handleDeleteTask}
                />
              </li>
            ))}
        </ul>

        {/* EMPTY STATE */}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No tasks found
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;