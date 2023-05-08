import actionTypes from '../actions/actionTypes';

const initialState = {
    arrUsers: [],
    getUserNotifications: {},
    createUserNotifications: {},
    deleteUserNotifications: {},
    updateUserNotifications: {},
    detailInfoDoctorNotifications: {},
    updateDetailInfoDoctorNotifications: {},
    allScheduleTimeData: [],
    scheduleDoctorNotifications: {},
    scheduleByDate: {},
    doctorExtraInfo: {},
    examinationPriceById: {},
    patientBookAppointmentNotifications: {},
    verifyBookAppointmentNotifications: {},
    topDoctor: [],
    allDoctor: [],
    detailInfoDoctor: {},
    profileDoctorById: {},
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,

    listPriceDoctor: {},
    listProvinceDoctor: {},
    listPaymentDoctor: {},
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
            state.createUserNotifications = action.data;
            return {
                ...state,
            };
        case actionTypes.CREATE_USER_FAILED:
            state.createUserNotifications = action.data;
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
        case actionTypes.FETCH_TOP_DOCTOR_HOME_SUCCESS:
            state.topDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_TOP_DOCTOR_HOME_FAILED:
            state.topDoctor = [];
            return { ...state };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctor = [];
            return { ...state };
        case actionTypes.CREATE_DETAIL_INFO_DOCTOR_SUCCESS:
            state.detailInfoDoctorNotifications = action.data;
            return { ...state };
        case actionTypes.CREATE_DETAIL_INFO_DOCTOR_FAILED:
            state.detailInfoDoctorNotifications = action.data;
            return { ...state };
        case actionTypes.GET_DETAIL_INFO_DOCTOR_SUCCESS:
            state.detailInfoDoctor = action.data;
            return { ...state };
        case actionTypes.GET_DETAIL_INFO_DOCTOR_FAILED:
            state.detailInfoDoctor = action.data;
            return { ...state };

        case actionTypes.UPDATE_DETAIL_INFO_DOCTOR_SUCCESS:
            state.updateDetailInfoDoctorNotifications = action.data;
            return { ...state };
        case actionTypes.UPDATE_DETAIL_INFO_DOCTOR_FAILED:
            state.updateDetailInfoDoctorNotifications = action.data;
            return { ...state };
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTimeData = action.data;
            return { ...state };
        case actionTypes.FETCH_ALL_CODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTimeData = action.data;
            return { ...state };
        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS:
            state.scheduleDoctorNotifications = action.data;
            return { ...state };
        case actionTypes.SAVE_BULK_SCHEDULE_DOCTOR_FAILED:
            state.scheduleDoctorNotifications = action.data;
            return { ...state };

        case actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS:
            state.scheduleByDate = action.data;
            return { ...state };
        case actionTypes.GET_SCHEDULE_BY_DATE_FAILED:
            state.scheduleByDate = action.data;
            return { ...state };

        case actionTypes.FETCH_PRICE_DOCTOR_SUCCESS:
            state.listPriceDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_PRICE_DOCTOR_FAILED:
            state.listPriceDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_PROVINCE_DOCTOR_SUCCESS:
            state.listProvinceDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_PROVINCE_DOCTOR_FAILED:
            state.listProvinceDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_PAYMENT_DOCTOR_SUCCESS:
            state.listPaymentDoctor = action.data;
            return { ...state };
        case actionTypes.FETCH_PAYMENT_DOCTOR_FAILED:
            state.listPaymentDoctor = action.data;
            return { ...state };

        case actionTypes.GET_DOCTOR_EXTRA_INFO_BY_ID_SUCCESS:
            state.doctorExtraInfo = action.data;
            return { ...state };
        case actionTypes.GET_DOCTOR_EXTRA_INFO_BY_ID_FAILED:
            state.doctorExtraInfo = action.data;
            return { ...state };

        case actionTypes.GET_PROFILE_DOCTOR_BY_ID_SUCCESS:
            state.profileDoctorById = action.data;
            return { ...state };
        case actionTypes.GET_PROFILE_DOCTOR_BY_ID_FAILED:
            state.profileDoctorById = action.data;
            return { ...state };

        case actionTypes.GET_EXAMINATION_PRICE_BY_ID_SUCCESS:
            state.examinationPriceById = action.data;
            return { ...state };
        case actionTypes.GET_EXAMINATION_PRICE_BY_ID_FAILED:
            state.examinationPriceById = action.data;
            return { ...state };

        case actionTypes.POST_PATIENT_BOOK_APPOINTMENT_SUCCESS:
            state.patientBookAppointmentNotifications = action.data;
            return { ...state };
        case actionTypes.POST_PATIENT_BOOK_APPOINTMENT_FAILED:
            state.patientBookAppointmentNotifications = action.data;
            return { ...state };
        case actionTypes.POST_VERIFY_BOOK_APPOINTMENT_SUCCESS:
            state.verifyBookAppointmentNotifications = action.data;
            return { ...state };
        case actionTypes.POST_VERIFY_BOOK_APPOINTMENT_FAILED:
            state.verifyBookAppointmentNotifications = action.data;
            return { ...state };
        default:
            return state;
    }
};

export default adminReducer;
