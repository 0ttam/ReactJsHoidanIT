import actionTypes from '../actions/actionTypes';

const initialState = {
    arrUsers: [],
    getUserNotifications: {},
    createUserNotifications: {},
    deleteUserNotifications: {},
    updateUserNotifications: {},
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_START:
            state.isLoadingPosition = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = false;
            return {
                ...state,
            };

        case actionTypes.FETCH_ROLE_START:
            state.isLoadingRole = true;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingRole = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = false;
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_SUCCESS:
            state.updateUserNotifications = action.data;
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAILED:
            state.updateUserNotifications = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.arrUsers = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.getUserNotifications = action.data;
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_SUCCESS:
            state.deleteUserNotifications = action.data;
            return {
                ...state,
            };
        case actionTypes.DELETE_USER_FAILED:
            state.deleteUserNotifications = action.data;
            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            state.updateUserNotifications = action.data;
            return { ...state };
        case actionTypes.UPDATE_USER_FAILED:
            state.updateUserNotifications = action.data;
            return { ...state };
        default:
            return state;
    }
};

export default adminReducer;
