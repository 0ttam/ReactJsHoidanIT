import axios from '../axios';
import { stringify } from 'react-auth-wrapper/helpers';

let handleLoginApi = (email, password) => {
    return axios.post('/api/login', stringify({ email, password }));
};
let handleGetAllUsers = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
};
let handleCreateUser = (data) => {
    return axios.post('/api/create-new-user', stringify(data));
};
let handleDeleteUser = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`);
};
let handleEditUser = (data) => {
    return axios.put('/api/edit-user', stringify(data));
};
let handleGetTopDoctorHome = (limitInput = 10) => {
    return axios.get(`/api/top-doctor-home?limit=${limitInput}`);
};

export {
    handleLoginApi,
    handleGetAllUsers,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
    handleGetTopDoctorHome,
};
