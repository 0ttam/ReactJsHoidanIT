import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/allCodeService';
import {
    handleCreateUser,
    handleGetAllUsers,
    handleDeleteUser,
    handleEditUser,
    handleGetTopDoctorHome,
    handleGetAllDoctor,
    handlePostDetailInfoDoctor,
    handleGetDetailInfoDoctor,
    handleUpdateDetailInfoDoctor,
    handleSaveBulkScheduleDoctor,
    handleGetProfileDoctorById,
    handleGetExaminationPriceById,
    handlePostPatientBookAppointment,
    handleVerifyBookingEmail,
    handleCreateNewSpecialty,
    handleGetSpecialtyById,
    handleEditSpecialty,
    handleDeleteSpecialty,
    handleCreateNewClinic,
    handleGetClinicById,
    handleEditClinic,
    handleDeleteClinic,
    handleLoadListPatientByDoctorTime,
} from '../../services/userService';

// Fetch Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            setTimeout(async () => {
                let res = await getAllCodeServices('GENDER');
                if (res && res.errCode === 0) {
                    dispatch(fetchGenderSuccess(res.data));
                } else {
                    dispatch(fetchGenderFailed());
                }
            }, 5000);
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

// Fetch PoPosition
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            setTimeout(async () => {
                let res = await getAllCodeServices('POSITION');
                if (res && res.errCode === 0) {
                    dispatch(fetchPositionSuccess(res.data));
                } else {
                    dispatch(fetchPositionFailed());
                }
            }, 5000);
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

// Fetch RoleId
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            setTimeout(async () => {
                let res = await getAllCodeServices('ROLE');
                if (res && res.errCode === 0) {
                    dispatch(fetchRoleSuccess(res.data));
                } else {
                    dispatch(fetchRoleFailed());
                }
            }, 5000);
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});
export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateUser(data);
            if (res && res.errCode === 0) {
                dispatch(
                    createNewUserSuccess({
                        vi: 'Tạo mới người dùng thành công',
                        en: 'Create new user successfully!',
                        errType: 'success',
                    })
                );
                dispatch(fetchAllUserStart('ALL'));
            } else {
                dispatch(
                    createNewUserFailed({
                        vi: 'Tạo mới người không thành công',
                        en: 'Create new user failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                createNewUserFailed({
                    vi: 'Tạo mới người không thành công',
                    en: 'Create new user failed!',
                    errType: 'error',
                })
            );
            console.log('create new user failed', e);
        }
    };
};
export const createNewUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data,
});
export const createNewUserFailed = (data) => ({
    type: actionTypes.CREATE_USER_FAILED,
    data: data,
});

export const fetchAllUserStart = (dataType) => {
    return async (dispatch, getState) => {
        let res = await handleGetAllUsers(dataType);
        try {
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                dispatch(
                    fetchAllUserFailed({
                        vi: 'Lấy dữ liệu người dùng không thành công',
                        en: 'Get all users failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                fetchAllUserFailed({
                    vi: 'Lấy dữ liệu người dùng không thành công',
                    en: 'Get all users failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: data,
});
export const fetchAllUserFailed = (data) => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
    data: data,
});
export const deleteUserStart = (user) => {
    return async (dispatch, getState) => {
        let res = await handleDeleteUser(user);
        try {
            if (res && res.errCode === 0) {
                dispatch(
                    deleteUserSuccess({
                        vi: 'Xóa người dùng thành công',
                        en: 'Delete user success!',
                        errType: 'success',
                    })
                );
                dispatch(fetchAllUserStart('ALL'));
            } else {
                dispatch(
                    deleteUserFailed({
                        vi: 'Xóa người dùng không thành công',
                        en: 'Delete user failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                deleteUserFailed({
                    vi: 'Xóa người dùng không thành công',
                    en: 'Delete user failed!',
                    errType: 'error',
                })
            );
            console.log('delete user redux failed', e);
        }
    };
};
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: data,
});
export const deleteUserFailed = (data) => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
    data: data,
});

export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        let res = await handleEditUser(data);
        try {
            if (res && res.errCode === 0) {
                dispatch(
                    editUserSuccess({
                        vi: 'Cập nhật dùng thành công',
                        en: 'Update user success!',
                        errType: 'success',
                    })
                );
                dispatch(fetchAllUserStart('ALL'));
            } else {
                dispatch(
                    editUserFailed({
                        vi: 'Cập nhật dùng không thành công',
                        en: 'Update user failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                editUserFailed({
                    vi: 'Cập nhật dùng không thành công',
                    en: 'Update user failed!',
                    errType: 'error',
                })
            );
            console.log('delete user redux failed', e);
        }
    };
};
export const editUserSuccess = (data) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    data: data,
});
export const editUserFailed = (data) => ({
    type: actionTypes.UPDATE_USER_FAILED,
    data: data,
});

export const fetchTopDoctorStart = (limitInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetTopDoctorHome(limitInput);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.topDoctor));
            } else {
                dispatch(
                    fetchTopDoctorFailed({
                        vi: 'Lấy dữ liệu người dùng không thành công',
                        en: 'Get all users failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                fetchTopDoctorFailed({
                    vi: 'Lấy dữ liệu người dùng không thành công',
                    en: 'Get all users failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS,
    data: data,
});
export const fetchTopDoctorFailed = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED,
    data: data,
});

export const fetchAllDoctorStart = (limitInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetAllDoctor();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.allDoctor));
            } else {
                dispatch(
                    fetchAllDoctorFailed({
                        vi: 'Lấy dữ liệu người dùng không thành công',
                        en: 'Get all users failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                fetchTopDoctorFailed({
                    vi: 'Lấy dữ liệu người dùng không thành công',
                    en: 'Get all users failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data,
});
export const fetchAllDoctorFailed = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
    data: data,
});

export const postDetailInfoDoctorStart = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            console.log('data post detail doctor', dataInput);
            let res = await handlePostDetailInfoDoctor(dataInput);
            if (res && res.errCode === 0) {
                dispatch(
                    postDetailInfoDoctorSuccess({
                        vi: 'Thêm thông tin bác sĩ thành công',
                        en: 'Add info detail doctor success!',
                        errType: 'success',
                    })
                );
            } else {
                dispatch(
                    postDetailInfoDoctorFailed({
                        vi: 'Thêm thông tin bác sĩ không thành công',
                        en: 'Add info detail doctor failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                postDetailInfoDoctorFailed({
                    vi: 'Thêm thông tin bác sĩ không thành công',
                    en: 'Add info detail doctor failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const postDetailInfoDoctorSuccess = (data) => ({
    type: actionTypes.CREATE_DETAIL_INFO_DOCTOR_SUCCESS,
    data: data,
});
export const postDetailInfoDoctorFailed = (data) => ({
    type: actionTypes.CREATE_DETAIL_INFO_DOCTOR_FAILED,
    data: data,
});

export const getDetailInfoDoctorStart = (idDoctor) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetDetailInfoDoctor(idDoctor);
            if (res && res.errCode === 0) {
                dispatch(
                    getDetailInfoDoctorSuccess({
                        vi: 'Lấy thông tin bác sĩ thành công',
                        en: 'Add info detail doctor success!',
                        errType: 'success',
                        doctor: res.data,
                    })
                );
            } else {
                dispatch(
                    getDetailInfoDoctorFailed({
                        vi: 'Lấy thông tin bác sĩ không thành công',
                        en: 'Add info detail doctor failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                getDetailInfoDoctorFailed({
                    vi: 'Lấy thông tin bác sĩ không thành công',
                    en: 'Add info detail doctor failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const getDetailInfoDoctorSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_INFO_DOCTOR_SUCCESS,
    data: data.doctor,
});
export const getDetailInfoDoctorFailed = (data) => ({
    type: actionTypes.GET_DETAIL_INFO_DOCTOR_FAILED,
    data: data,
});

export const updateDetailInfoDoctorStart = (dataInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleUpdateDetailInfoDoctor(dataInput);
            if (res && res.errCode === 0) {
                dispatch(
                    updateDetailInfoDoctorSuccess({
                        vi: 'Cập nhật thông tin bác sĩ thành công',
                        en: 'Update info detail doctor success!',
                        errType: 'success',
                        doctor: res.data,
                    })
                );
            } else {
                dispatch(
                    updateDetailInfoDoctorFailed({
                        vi: 'Cập nhật tin bác sĩ không thành công',
                        en: 'Update info detail doctor failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                updateDetailInfoDoctorFailed({
                    vi: 'Cập nhật tin bác sĩ không thành công',
                    en: 'Update info detail doctor failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const updateDetailInfoDoctorSuccess = (data) => ({
    type: actionTypes.UPDATE_DETAIL_INFO_DOCTOR_SUCCESS,
    data: data,
});
export const updateDetailInfoDoctorFailed = (data) => ({
    type: actionTypes.UPDATE_DETAIL_INFO_DOCTOR_FAILED,
    data: data,
});

export const fetchAllScheduleHourStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServices('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetchAllScheduleHourSuccess(res.data));
            } else {
                dispatch(
                    fetchAllScheduleHourFailed({
                        vi: 'Lấy dữ liệu thời gian không thành công',
                        en: 'Get all users failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                fetchAllScheduleHourFailed({
                    vi: 'Lấy dữ liệu thời gian không thành công',
                    en: 'Get all users failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const fetchAllScheduleHourSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS,
    data: data,
});
export const fetchAllScheduleHourFailed = (data) => ({
    type: actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED,
    data: data,
});

export const saveBulkScheduleDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleSaveBulkScheduleDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(
                    saveBulkScheduleDoctorSuccess({
                        vi: 'Lưu dữ liệu lịch hẹn thành công',
                        en: 'Save data schedule successfully!',
                        errType: 'success',
                    })
                );
            } else {
                dispatch(
                    saveBulkScheduleDoctorFailed({
                        vi: 'Lưu dữ liệu lịch hẹn không thành công',
                        en: 'Save data schedule failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                saveBulkScheduleDoctorFailed({
                    vi: 'Lưu dữ liệu lịch hẹn không thành công',
                    en: 'Save data schedule failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const saveBulkScheduleDoctorSuccess = (data) => ({
    type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS,
    data: data,
});
export const saveBulkScheduleDoctorFailed = (data) => ({
    type: actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED,
    data: data,
});

export const fetchPriceDoctorStart = (key) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServices(key);
            if (res && res.errCode === 0) {
                dispatch(fetchPriceDoctorSuccess(res.data));
            } else {
                dispatch(fetchPriceDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchPriceDoctorFailed());
            console.log(e);
        }
    };
};
export const fetchPriceDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_PRICE_DOCTOR_SUCCESS,
    data: data,
});
export const fetchPriceDoctorFailed = () => ({
    type: actionTypes.FETCH_PRICE_DOCTOR_FAILED,
    data: {},
});

export const fetchProvinceDoctorStart = (key) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServices(key);
            if (res && res.errCode === 0) {
                dispatch(fetchProvinceDoctorSuccess(res.data));
            } else {
                dispatch(fetchProvinceDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchProvinceDoctorFailed());
            console.log(e);
        }
    };
};
export const fetchProvinceDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_PROVINCE_DOCTOR_SUCCESS,
    data: data,
});
export const fetchProvinceDoctorFailed = () => ({
    type: actionTypes.FETCH_PROVINCE_DOCTOR_FAILED,
    data: {},
});

export const fetchPaymentDoctorStart = (key) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeServices(key);
            if (res && res.errCode === 0) {
                dispatch(fetchPaymentDoctorSuccess(res.data));
            } else {
                dispatch(fetchPaymentDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchPaymentDoctorFailed());
            console.log(e);
        }
    };
};
export const fetchPaymentDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_PAYMENT_DOCTOR_SUCCESS,
    data: data,
});
export const fetchPaymentDoctorFailed = () => ({
    type: actionTypes.FETCH_PAYMENT_DOCTOR_FAILED,
    data: {},
});

export const getProfileDoctorByIdStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetProfileDoctorById(doctorId);
            if (res && res.errCode === 0) {
                dispatch(
                    getProfileDoctorByIdSuccess({
                        vi: 'Lấy dữ liệu bác sĩ thành công',
                        en: 'Fetch data doctor successfully!',
                        errType: 'success',
                        data: res.data,
                    })
                );
            } else {
                dispatch(
                    getProfileDoctorByIdFailed({
                        vi: 'Lấy dữ liệu bác sĩ không thành công',
                        en: 'Fetch data doctor failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                getProfileDoctorByIdFailed({
                    vi: 'Lấy dữ liệu bác sĩ không thành công',
                    en: 'Fetch data doctor failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const getProfileDoctorByIdSuccess = (data) => ({
    type: actionTypes.GET_PROFILE_DOCTOR_BY_ID_SUCCESS,
    data: data,
});
export const getProfileDoctorByIdFailed = (data) => ({
    type: actionTypes.GET_PROFILE_DOCTOR_BY_ID_FAILED,
    data: data,
});

export const getExaminationPriceByIdStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetExaminationPriceById(doctorId);
            if (res && res.errCode === 0) {
                dispatch(
                    getExaminationPriceByIdSuccess({
                        vi: 'Lấy dữ liệu giá khám thành công',
                        en: 'Fetch data Examination Price successfully!',
                        errType: 'success',
                        data: res.data,
                    })
                );
            } else {
                dispatch(
                    getExaminationPriceByIdFailed({
                        vi: 'Lấy dữ liệu giá khám không thành công',
                        en: 'Fetch data Examination Price failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                getExaminationPriceByIdFailed({
                    vi: 'Lấy dữ liệu giá khám không thành công',
                    en: 'Fetch data Examination Price failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const getExaminationPriceByIdSuccess = (data) => ({
    type: actionTypes.GET_EXAMINATION_PRICE_BY_ID_SUCCESS,
    data: data,
});
export const getExaminationPriceByIdFailed = (data) => ({
    type: actionTypes.GET_EXAMINATION_PRICE_BY_ID_FAILED,
    data: data,
});

export const postPatientBookAppointmentStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handlePostPatientBookAppointment(data);
            if (res && res.errCode === 0) {
                dispatch(
                    postPatientBookAppointmentSuccess({
                        vi: res.errMessageVi,
                        en: res.errMessageEn,
                        errType: 'success',
                    })
                );
            } else {
                dispatch(
                    postPatientBookAppointmentFailed({
                        vi: 'Tạo dữ liệu đặt lịch khám không thành công',
                        en: 'Appointment data creation failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                postPatientBookAppointmentFailed({
                    vi: 'Tạo dữ liệu đặt lịch khám không thành công',
                    en: 'Appointment data creation failed!',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const postPatientBookAppointmentSuccess = (data) => ({
    type: actionTypes.POST_PATIENT_BOOK_APPOINTMENT_SUCCESS,
    data: data,
});
export const postPatientBookAppointmentFailed = (data) => ({
    type: actionTypes.POST_PATIENT_BOOK_APPOINTMENT_FAILED,
    data: data,
});

export const verifyBookingEmailStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleVerifyBookingEmail(data);
            if (res && res.errCode === 0) {
                dispatch(
                    handleVerifyBookingEmailSuccess({
                        vi: 'Xác nhận đặt lịch khám thành công',
                        en: 'Create appointment booking data successfully',
                        errType: 'success',
                    })
                );
            } else if (res && res.errCode === 2) {
                dispatch(
                    handleVerifyBookingEmailSuccess({
                        vi: 'Xác nhận đặt lịch khám thành công',
                        en: 'Create appointment booking data successfully',
                        errType: 'success',
                    })
                );
            } else {
                dispatch(
                    handleVerifyBookingEmailFailed({
                        vi: 'Đặt lịch khám thất bại. Vui lòng thử lại',
                        en: 'Appointment failed. Please try again',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                handleVerifyBookingEmailFailed({
                    vi: 'Đặt lịch khám thất bại. Vui lòng thử lại',
                    en: 'Appointment failed. Please try again',
                    errType: 'error',
                })
            );
            console.log('fetch all user redux failed', e);
        }
    };
};
export const handleVerifyBookingEmailSuccess = (data) => ({
    type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_SUCCESS,
    data: data,
});
export const handleVerifyBookingEmailFailed = (data) => ({
    type: actionTypes.POST_VERIFY_BOOK_APPOINTMENT_FAILED,
    data: data,
});

export const createNewSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateNewSpecialty(data);
            if (res && res.errCode === 0) {
                dispatch(
                    createNewSpecialtySuccess({
                        vi: 'Tạo mới chuyên khoa thành công',
                        en: 'Create new specialty successfully!',
                        errType: 'success',
                    })
                );
                dispatch(getSpecialtyByIdStart('ALL'));
            } else {
                dispatch(
                    createNewSpecialtyFailed({
                        vi: 'Tạo mới chuyên khoa thất bại',
                        en: 'Create new specialty failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                createNewSpecialtyFailed({
                    vi: 'Tạo mới chuyên khoa thất bại',
                    en: 'Create new specialty failed!',
                    errType: 'error',
                })
            );
            console.log('create new specialty failed', e);
        }
    };
};
export const createNewSpecialtySuccess = (data) => ({
    type: actionTypes.CREATE_NEW_SPECIALTY_SUCCESS,
    data: data,
});
export const createNewSpecialtyFailed = (data) => ({
    type: actionTypes.CREATE_NEW_SPECIALTY_FAILED,
    data: data,
});

export const getSpecialtyByIdStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetSpecialtyById(id);
            if (res && res.errCode === 0) {
                dispatch(
                    getSpecialtyByIdSuccess({
                        vi: 'Lấy dữ liệu chuyên khoa thành công',
                        en: 'Get all specialty successfully!',
                        errType: 'success',
                        data: res.data,
                    })
                );
            } else {
                dispatch(
                    getSpecialtyByIdFailed({
                        vi: 'Lấy dữ liệu chuyên khoa thất bại',
                        en: 'Get all specialty failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                getSpecialtyByIdFailed({
                    vi: 'Lấy dữ liệu chuyên khoa thất bại',
                    en: 'Get all specialty failed!',
                    errType: 'error',
                })
            );
            console.log('Get all specialty failed', e);
        }
    };
};
export const getSpecialtyByIdSuccess = (data) => ({
    type: actionTypes.GET_SPECIALTY_BY_ID_SUCCESS,
    data: data,
});
export const getSpecialtyByIdFailed = (data) => ({
    type: actionTypes.GET_SPECIALTY_BY_ID_FAILED,
    data: data,
});

export const editSpecialtyStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleEditSpecialty(data);
            if (res && res.errCode === 0) {
                dispatch(
                    editSpecialtySuccess({
                        vi: 'Cập nhật chuyên khoa thành công',
                        en: 'Update specialty successfully!',
                        errType: 'success',
                    })
                );
                dispatch(getSpecialtyByIdStart('ALL'));
            } else {
                dispatch(
                    editSpecialtyFailed({
                        vi: 'Cập nhật chuyên khoa thất bại',
                        en: 'Update specialty failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                editSpecialtyFailed({
                    vi: 'Cập nhật chuyên khoa thất bại',
                    en: 'Update specialty failed!',
                    errType: 'error',
                })
            );
            console.log('Update specialty failed', e);
        }
    };
};
export const editSpecialtySuccess = (data) => ({
    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
    data: data,
});
export const editSpecialtyFailed = (data) => ({
    type: actionTypes.EDIT_SPECIALTY_FAILED,
    data: data,
});

export const deleteSpecialtyStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteSpecialty(id);
            if (res && res.errCode === 0) {
                dispatch(
                    deleteSpecialtySuccess({
                        vi: 'Xóa chuyên khoa thành công',
                        en: 'Delete specialty successfully!',
                        errType: 'success',
                    })
                );
                dispatch(getSpecialtyByIdStart('ALL'));
            } else {
                dispatch(
                    deleteSpecialtyFailed({
                        vi: 'Xóa chuyên khoa thất bại',
                        en: 'Delete specialty failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                deleteSpecialtyFailed({
                    vi: 'Xóa chuyên khoa thất bại',
                    en: 'Delete specialty failed!',
                    errType: 'error',
                })
            );
            console.log('Delete specialty failed', e);
        }
    };
};
export const deleteSpecialtySuccess = (data) => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS,
    data: data,
});
export const deleteSpecialtyFailed = (data) => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED,
    data: data,
});

export const createNewClinicStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleCreateNewClinic(data);
            if (res && res.errCode === 0) {
                dispatch(
                    createNewClinicSuccess({
                        vi: 'Tạo mới phòng khám thành công',
                        en: 'Create new clinic successfully!',
                        errType: 'success',
                    })
                );
                // dispatch(getSpecialtyByIdStart('ALL'));
            } else {
                dispatch(
                    createNewClinicFailed({
                        vi: 'Tạo mới phòng khám thất bại',
                        en: 'Create new clinic failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                createNewClinicFailed({
                    vi: 'Tạo mới phòng khám thất bại',
                    en: 'Create new clinic failed!',
                    errType: 'error',
                })
            );
            console.log('create new clinic failed', e);
        }
    };
};
export const createNewClinicSuccess = (data) => ({
    type: actionTypes.CREATE_NEW_CLINIC_SUCCESS,
    data: data,
});
export const createNewClinicFailed = (data) => ({
    type: actionTypes.CREATE_NEW_CLINIC_FAILED,
    data: data,
});

export const getClinicByIdStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleGetClinicById(data);
            if (res && res.errCode === 0) {
                dispatch(
                    getClinicByIdSuccess({
                        vi: 'Lấy thông tin/danh sách phòng khám thành công',
                        en: 'Get info/list clinic successfully!',
                        errType: 'success',
                        data: res.data,
                    })
                );
            } else {
                dispatch(
                    getClinicByIdFailed({
                        vi: 'Lấy thông tin/danh sách phòng khám thất bại',
                        en: 'Get info/list clinic failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                getClinicByIdFailed({
                    vi: 'Lấy thông tin/danh sách phòng khám thất bại',
                    en: 'Get info/list clinic failed!',
                    errType: 'error',
                })
            );
            console.log('Get info/list clinic failed', e);
        }
    };
};
export const getClinicByIdSuccess = (data) => ({
    type: actionTypes.GET_CLINIC_BY_ID_SUCCESS,
    data: data,
});
export const getClinicByIdFailed = (data) => ({
    type: actionTypes.GET_CLINIC_BY_ID_FAILED,
    data: data,
});

export const editClinicStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleEditClinic(data);
            if (res && res.errCode === 0) {
                dispatch(
                    editClinicSuccess({
                        vi: 'Cập nhật phòng khám thành công',
                        en: 'Update clinic successfully!',
                        errType: 'success',
                    })
                );
                dispatch(getClinicByIdStart('ALL'));
            } else {
                dispatch(
                    editClinicFailed({
                        vi: 'Cập nhật phòng khám thất bại',
                        en: 'Update clinic failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                editClinicFailed({
                    vi: 'Cập nhật phòng khám thất bại',
                    en: 'Update clinic failed!',
                    errType: 'error',
                })
            );
            console.log('Update specialty failed', e);
        }
    };
};
export const editClinicSuccess = (data) => ({
    type: actionTypes.EDIT_CLINIC_SUCCESS,
    data: data,
});
export const editClinicFailed = (data) => ({
    type: actionTypes.EDIT_CLINIC_FAILED,
    data: data,
});

export const deleteClinicStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleDeleteClinic(id);
            if (res && res.errCode === 0) {
                dispatch(
                    deleteClinicSuccess({
                        vi: 'Xóa phòng khám thành công',
                        en: 'Delete clinic successfully!',
                        errType: 'success',
                    })
                );
                dispatch(getClinicByIdStart('ALL'));
            } else {
                dispatch(
                    deleteClinicFailed({
                        vi: 'Xóa phòng khám thất bại',
                        en: 'Delete clinic failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                deleteClinicFailed({
                    vi: 'Xóa phòng khám thất bại',
                    en: 'Delete clinic failed!',
                    errType: 'error',
                })
            );
            console.log('Delete clinic failed', e);
        }
    };
};
export const deleteClinicSuccess = (data) => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS,
    data: data,
});
export const deleteClinicFailed = (data) => ({
    type: actionTypes.DELETE_CLINIC_FAILED,
    data: data,
});

export const loadListPatientByDoctorTimeStart = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let res = await handleLoadListPatientByDoctorTime(doctorId, date);
            if (res && res.errCode === 0) {
                dispatch(
                    loadListPatientByDoctorTimeSuccess({
                        vi: 'Lấy thông tin bệnh nhân thành công',
                        en: 'Get list patient by doctor time type successfully!',
                        errType: 'success',
                        data: res.data,
                    })
                );
            } else {
                dispatch(
                    loadListPatientByDoctorTimeFailed({
                        vi: 'Lấy thông tin bệnh nhân thất bại',
                        en: 'Get list patient by doctor time type failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                loadListPatientByDoctorTimeFailed({
                    vi: 'Lấy thông tin bệnh nhân thất bại',
                    en: 'Get list patient by doctor time type failed!',
                    errType: 'error',
                })
            );
            console.log('Get list patient by doctor time type failed', e);
        }
    };
};
export const loadListPatientByDoctorTimeSuccess = (data) => ({
    type: actionTypes.GET_LIST_PATIENT_BY_DOCTOR_TIME_TYPE_SUCCESS,
    data: data,
});
export const loadListPatientByDoctorTimeFailed = (data) => ({
    type: actionTypes.GET_LIST_PATIENT_BY_DOCTOR_TIME_TYPE_FAILED,
    data: data,
});
