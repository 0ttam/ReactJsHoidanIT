import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/allCodeService';
import {
    handleCreateUser,
    handleGetAllUsers,
    handleDeleteUser,
    handleEditUser,
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
                        vi: 'T???o m???i ng?????i d??ng th??nh c??ng',
                        en: 'Create new user successfully!',
                        errType: 'success',
                    })
                );
                dispatch(fetchAllUserStart('ALL'));
            } else {
                dispatch(
                    createNewUserFailed({
                        vi: 'T???o m???i ng?????i kh??ng th??nh c??ng',
                        en: 'Create new user failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                createNewUserFailed({
                    vi: 'T???o m???i ng?????i kh??ng th??nh c??ng',
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
                        vi: 'L???y d??? li???u ng?????i d??ng kh??ng th??nh c??ng',
                        en: 'Get all users failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                fetchAllUserFailed({
                    vi: 'L???y d??? li???u ng?????i d??ng kh??ng th??nh c??ng',
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
                        vi: 'X??a ng?????i d??ng th??nh c??ng',
                        en: 'Delete user success!',
                        errType: 'success',
                    })
                );
                dispatch(fetchAllUserStart('ALL'));
            } else {
                dispatch(
                    deleteUserFailed({
                        vi: 'X??a ng?????i d??ng kh??ng th??nh c??ng',
                        en: 'Delete user failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                deleteUserFailed({
                    vi: 'X??a ng?????i d??ng kh??ng th??nh c??ng',
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
                        vi: 'C???p nh???t d??ng th??nh c??ng',
                        en: 'Update user success!',
                        errType: 'success',
                    })
                );
                dispatch(fetchAllUserStart('ALL'));
            } else {
                console.log('cn2');
                dispatch(
                    editUserFailed({
                        vi: 'C???p nh???t d??ng kh??ng th??nh c??ng',
                        en: 'Update user failed!',
                        errType: 'error',
                    })
                );
            }
        } catch (e) {
            dispatch(
                editUserFailed({
                    vi: 'C???p nh???t d??ng kh??ng th??nh c??ng',
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
