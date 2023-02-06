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

export {
    handleLoginApi,
    handleGetAllUsers,
    handleCreateUser,
    handleDeleteUser,
};
