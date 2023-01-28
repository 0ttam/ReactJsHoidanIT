import axios from '../axios';
import { stringify } from 'react-auth-wrapper/helpers';

let handleLoginApi = (email, password) => {
    return axios.post('/api/login', stringify({ email, password }));
};

export { handleLoginApi };
