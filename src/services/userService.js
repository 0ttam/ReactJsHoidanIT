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

export { handleLoginApi, handleGetAllUsers, handleCreateUser };
