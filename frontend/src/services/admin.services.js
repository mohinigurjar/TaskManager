import { API } from "../api/axios";

export const adminFetchUsers = () => API.get('/admin/users');
export const adminFetchTasks = () => API.get('/admin/tasks');
export const adminUpdateUserRole = (userId, role) => API.patch(`/admin/users/${userId}/role`, { role })