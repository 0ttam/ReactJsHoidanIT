import axios from '../axios';

export const getAllCodeServices = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`);
}