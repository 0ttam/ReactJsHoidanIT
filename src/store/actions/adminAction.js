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
                fetchTopDoctorFailed({
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
