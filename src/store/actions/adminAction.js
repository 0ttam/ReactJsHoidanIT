import actionTypes from './actionTypes';
import { getAllCodeServices } from '../../services/allCodeService';

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
            dispatch(fetchPositionFailed())
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
