import { API } from "../api/axios";

export const createUser = (data) => API.post('/auth/signup', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.post('/auth/me');
export const logoutUser = () => API.post('/auth/logout');