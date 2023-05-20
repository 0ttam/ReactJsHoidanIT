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
const handleGetDetailInfoDoctor = (idDoctor) => {
    return axios.get(`/api/get-detail-doctor?id=${idDoctor}`);
};
const handleUpdateDetailInfoDoctor = (inputData) => {
    return axios.put('/api/put-info-doctor', stringify(inputData));
};
const handleSaveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
const handleGetScheduleByDate = (doctorId, date) => {
    return axios.get(
        `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
    );
};
const handleGetDoctorExtraInfoById = (doctorId) => {
    return axios.get(`/api/get-doctor-extra-info-by-id?doctorId=${doctorId}`);
};
const handleGetProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const handleGetExaminationPriceById = (doctorId) => {
    return axios.get(`/api/get-examination-price-by-id?doctorId=${doctorId}`);
};
const handlePostPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};
const handleVerifyBookingEmail = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};
const handleCreateNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', stringify(data));
};
const handleGetSpecialtyById = (id) => {
    return axios.get(`/api/get-specialty-by-id?id=${id}`);
};
const handleEditSpecialty = (data) => {
    return axios.put('/api/edit-specialty-by-id', stringify(data));
};
const handleDeleteSpecialty = (userId) => {
    return axios.delete(`/api/delete-specialty?id=${userId}`);
};
const handleGetListDoctorBySpecialty = (specialtyId) => {
    return axios.get(
        `/api/get-list-doctor-by-specialty-id?specialtyId=${specialtyId}`
    );
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
    handleGetDetailInfoDoctor,
    handleUpdateDetailInfoDoctor,
    handleSaveBulkScheduleDoctor,
    handleGetScheduleByDate,
    handleGetDoctorExtraInfoById,
    handleGetProfileDoctorById,
    handleGetExaminationPriceById,
    handlePostPatientBookAppointment,
    handleVerifyBookingEmail,
    handleCreateNewSpecialty,
    handleGetSpecialtyById,
    handleEditSpecialty,
    handleDeleteSpecialty,
    handleGetListDoctorBySpecialty,
};
