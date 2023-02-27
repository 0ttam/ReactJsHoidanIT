import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire action start', action);
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('fire action success', action);
            let copyState = { ...state };
            copyState.genders = action.data;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire action failed', action);
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
