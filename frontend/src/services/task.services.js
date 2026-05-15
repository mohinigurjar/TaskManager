import { API } from "../api/axios";

export const createTask = (data) => API.post('/task/', data);
export const fetchTasks = () => API.get('/task/');
export const editTask = (taskId, data) => API.patch(`/task/${taskId}`, data);
export const deleteTask = (taskId) => API.delete(`/task/${taskId}`);
export const updateStatus = (taskId, data) => API.patch(`/task/${taskId}/status`, data);