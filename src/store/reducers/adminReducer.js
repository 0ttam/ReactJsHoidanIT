import actionTypes from '../actions/actionTypes';

const initialState = {
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
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
