import axios from '../axios';
import { stringify } from 'react-auth-wrapper/helpers';

let handleLoginApi = (email, password) => {
    return axios.post('/api/login', stringify({ email, password }));
};
let handleGetAllUsers = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
};

export { handleLoginApi, handleGetAllUsers };
