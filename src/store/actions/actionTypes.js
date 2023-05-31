const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILED: 'UPDATE_USER_FAILED',

    FETCH_TOP_DOCTOR_HOME_SUCCESS: 'FETCH_TOP_DOCTOR_HOME_SUCCESS',
    FETCH_TOP_DOCTOR_HOME_FAILED: 'FETCH_TOP_DOCTOR_HOME_FAILED',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'FETCH_ALL_DOCTOR_FAILED',

    CREATE_DETAIL_INFO_DOCTOR_SUCCESS: 'CREATE_DETAIL_INFO_DOCTOR_SUCCESS',
    CREATE_DETAIL_INFO_DOCTOR_FAILED: 'CREATE_DETAIL_INFO_DOCTOR_FAILED',

    GET_DETAIL_INFO_DOCTOR_SUCCESS: 'GET_DETAIL_INFO_DOCTOR_SUCCESS',
    GET_DETAIL_INFO_DOCTOR_FAILED: 'GET_DETAIL_INFO_DOCTOR_FAILED',

    UPDATE_DETAIL_INFO_DOCTOR_SUCCESS: 'UPDATE_DETAIL_INFO_DOCTOR_SUCCESS',
    UPDATE_DETAIL_INFO_DOCTOR_FAILED: 'UPDATE_DETAIL_INFO_DOCTOR_FAILED',

    FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS:
        'FETCH_ALL_CODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALL_CODE_SCHEDULE_TIME_FAILED: 'FETCH_ALL_CODE_SCHEDULE_TIME_FAILED',

    SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS: 'SAVE_BULK_SCHEDULE_DOCTOR_SUCCESS',
    SAVE_BULK_SCHEDULE_DOCTOR_FAILED: 'SAVE_BULK_SCHEDULE_DOCTOR_FAILED',

    // fetchPriceDoctor
    FETCH_PRICE_DOCTOR_SUCCESS: 'FETCH_PRICE_DOCTOR_SUCCESS',
    FETCH_PRICE_DOCTOR_FAILED: 'FETCH_PRICE_DOCTOR_FAILED',

    FETCH_PROVINCE_DOCTOR_SUCCESS: 'FETCH_PROVINCE_DOCTOR_SUCCESS',
    FETCH_PROVINCE_DOCTOR_FAILED: 'FETCH_PROVINCE_DOCTOR_FAILED',

    FETCH_PAYMENT_DOCTOR_SUCCESS: 'FETCH_PAYMENT_DOCTOR_SUCCESS',
    FETCH_PAYMENT_DOCTOR_FAILED: 'FETCH_PAYMENT_DOCTOR_FAILED',

    GET_PROFILE_DOCTOR_BY_ID_SUCCESS: 'GET_PROFILE_DOCTOR_BY_ID_SUCCESS',
    GET_PROFILE_DOCTOR_BY_ID_FAILED: 'GET_PROFILE_DOCTOR_BY_ID_FAILED',

    GET_EXAMINATION_PRICE_BY_ID_SUCCESS: 'GET_EXAMINATION_PRICE_BY_ID_SUCCESS',
    GET_EXAMINATION_PRICE_BY_ID_FAILED: 'GET_EXAMINATION_PRICE_BY_ID_FAILED',

    POST_PATIENT_BOOK_APPOINTMENT_SUCCESS:
        'POST_PATIENT_BOOK_APPOINTMENT_SUCCESS',
    POST_PATIENT_BOOK_APPOINTMENT_FAILED:
        'POST_PATIENT_BOOK_APPOINTMENT_FAILED',

    POST_VERIFY_BOOK_APPOINTMENT_SUCCESS:
        'POST_VERIFY_BOOK_APPOINTMENT_SUCCESS',
    POST_VERIFY_BOOK_APPOINTMENT_FAILED: 'POST_VERIFY_BOOK_APPOINTMENT_FAILED',

    CREATE_NEW_SPECIALTY_SUCCESS: 'CREATE_NEW_SPECIALTY_SUCCESS',
    CREATE_NEW_SPECIALTY_FAILED: 'CREATE_NEW_SPECIALTY_FAILED',

    GET_SPECIALTY_BY_ID_SUCCESS: 'GET_SPECIALTY_BY_ID_SUCCESS',
    GET_SPECIALTY_BY_ID_FAILED: 'GET_SPECIALTY_BY_ID_FAILED',

    EDIT_SPECIALTY_SUCCESS: 'EDIT_SPECIALTY_SUCCESS',
    EDIT_SPECIALTY_FAILED: 'EDIT_SPECIALTY_FAILED',

    DELETE_SPECIALTY_SUCCESS: 'DELETE_SPECIALTY_SUCCESS',
    DELETE_SPECIALTY_FAILED: 'DELETE_SPECIALTY_FAILED',

    CREATE_NEW_CLINIC_SUCCESS: 'CREATE_NEW_CLINIC_SUCCESS',
    CREATE_NEW_CLINIC_FAILED: 'CREATE_NEW_CLINIC_FAILED',

    GET_CLINIC_BY_ID_SUCCESS: 'GET_CLINIC_BY_ID_SUCCESS',
    GET_CLINIC_BY_ID_FAILED: 'GET_CLINIC_BY_ID_FAILED',

    EDIT_CLINIC_SUCCESS: 'EDIT_CLINIC_SUCCESS',
    EDIT_CLINIC_FAILED: 'EDIT_CLINIC_FAILED',

    DELETE_CLINIC_SUCCESS: 'DELETE_CLINIC_SUCCESS',
    DELETE_CLINIC_FAILED: 'DELETE_CLINIC_FAILED',
});

export default actionTypes;
