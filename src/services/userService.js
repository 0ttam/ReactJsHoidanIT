import axios from '../axios';
import { stringify } from 'react-auth-wrapper/helpers';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', stringify({ email, password }));
};
const handleGetAllUsers = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
};
const handleCreateUser = (data) => {
    return axios.post('/api/create-new-user', stringify(data));
};
const handleDeleteUser = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`);
};
const handleEditUser = (data) => {
    return axios.put('/api/edit-user', stringify(data));
};
const handleGetTopDoctorHome = (limitInput = 10) => {
    return axios.get(`/api/top-doctor-home?limit=${limitInput}`);
};
const handleGetAllDoctor = () => {
    return axios.get('/api/get-all-doctor');
};
const handlePostDetailInfoDoctor = (inputData) => {
    return axios.post('/api/post-info-doctor', stringify(inputData));
};

export {
    handleLoginApi,
    handleGetAllUsers,
    handleCreateUser,
    handleDeleteUser,
    handleEditUser,
    handleGetTopDoctorHome,
    handleGetAllDoctor,
    handlePostDetailInfoDoctor,
};
