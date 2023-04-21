import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import _ from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { dateFormat } from '../../../utils/constant';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArray: '',
            selectedDoctor: '',
            currentDate: new Date(),
            allScheduleTimeData: '',
            scheduleDoctorNotifications: '',
        };
    }
    componentDidMount() {
        this.props.loadAllDoctor();
        this.props.loadAllScheduleTimeData();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let arrDoctor = this.handleConvertInputSelection(
                this.props.allDoctorRedux
            );
            this.setState({
                doctorArray: arrDoctor,
            });
        }
        if (
            prevProps.allScheduleTimeDataRedux !==
            this.props.allScheduleTimeDataRedux
        ) {
            let arrScheduleTimeData = this.props.allScheduleTimeDataRedux;
            if (arrScheduleTimeData && arrScheduleTimeData.length > 0) {
                arrScheduleTimeData = arrScheduleTimeData.map((item) => ({
                    ...item,
                    isSelected: false,
                }));
            }
            this.setState({
                allScheduleTimeData: arrScheduleTimeData,
            });
            console.log('arrScheduleTimeData', this.state.allScheduleTimeData);
        }
        if (
            prevProps.scheduleDoctorNotificationsRedux !==
            this.props.scheduleDoctorNotificationsRedux
        ) {
            this.setState({
                scheduleDoctorNotifications:
                    this.props.scheduleDoctorNotificationsRedux,
            });
        }
    }
    handleConvertInputSelection = (dataInput) => {
        let result = [];
        let language = this.props.language;
        if (dataInput && dataInput.length > 0) {
            // eslint-disable-next-line array-callback-return
            dataInput.map((item, index) => {
                let Object = {};
                let nameVi = `${item.lastName} ${item.firstName}`;
                let nameEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGES.EN ? nameEn : nameVi;
                Object.id = item.id;
                result.push(Object);
            });
        }
        return result;
    };
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleOnChangeDate = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };
    handleOnClickBtnSchedule = (time) => {
        let { allScheduleTimeData } = this.state;
        if (allScheduleTimeData && allScheduleTimeData.length > 0) {
            allScheduleTimeData = allScheduleTimeData.map((item) => {
                if (item.id === time.id) item.isSelected = !time.isSelected;
                return item;
            });
        }

        this.setState({
            allScheduleTimeData: allScheduleTimeData,
        });
    };
    handleOnClickSave = async () => {
        let { currentDate, selectedDoctor, allScheduleTimeData } = this.state;
        let result = [];
        if (!currentDate) {
            this.notify('Bạn chưa chọn ngày', 'error');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            this.notify('Bạn chưa chọn bác sĩ', 'error');
            return;
        }
        let formatDate = new Date(currentDate).getTime();
        if (allScheduleTimeData && allScheduleTimeData.length > 0) {
            let selectedTime = allScheduleTimeData.filter(
                (item) => item.isSelected === true
            );
            if (formatDate === 'Invalid date') {
                this.notify(
                    'Vui lòng chọn ngày khám từ ngày mai trở đi',
                    'error'
                );
            } else if (selectedTime && selectedTime.length > 0) {
                // eslint-disable-next-line array-callback-return
                selectedTime.map((schedule) => {
                    let Object = {};
                    Object.doctorId = selectedDoctor.id;
                    Object.date = formatDate;
                    Object.timeType = schedule.keyMap;
                    result.push(Object);
                });
            } else {
                this.notify('Bạn chưa chọn giờ khám', 'error');
            }
        }
        await this.props.saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.id,
            date: formatDate,
        });
        this.notify(
            this.state.scheduleDoctorNotifications.vi,
            this.state.scheduleDoctorNotifications.errType
        );
    };

    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        let _currentDate = new Date();
        let { allScheduleTimeData, currentDate } = this.state;
        let { language } = this.props;
        console.log('allScheduleTimeData', this.state.allScheduleTimeData);
        return (
            <Fragment>
                <ToastContainer />
                <div className='manage-schedule-container'>
                    <div className='manage-schedule-title title'>
                        <FormattedMessage id='manage-schedule.title' />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='manage-schedule.choose-doctor' />
                                </label>
                                <Select
                                    options={this.state.doctorArray}
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='manage-schedule.choose-date' />
                                </label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnChangeDate}
                                    minDate={_currentDate.setDate(
                                        _currentDate.getDate() - 1
                                    )}
                                    value={currentDate}
                                />
                            </div>
                            <label>
                                <FormattedMessage id='manage-schedule.choose-time' />
                            </label>
                            <div className='col-12 pick-hour-container'>
                                {allScheduleTimeData &&
                                    allScheduleTimeData.length > 0 &&
                                    allScheduleTimeData.map((item, index) => {
                                        return (
                                            <button
                                                key={index}
                                                className={
                                                    item.isSelected === true
                                                        ? 'btn btn-schedule active'
                                                        : 'btn btn-schedule'
                                                }
                                                onClick={() => {
                                                    this.handleOnClickBtnSchedule(
                                                        item
                                                    );
                                                }}
                                            >
                                                {language === LANGUAGES.VI
                                                    ? `${item.valueVi}`
                                                    : `${item.valueEn}`}
                                            </button>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary mt-2'
                                onClick={() => {
                                    this.handleOnClickSave();
                                }}
                            >
                                <FormattedMessage id='manage-schedule.save' />
                            </button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        allDoctorRedux: state.admin.allDoctor,
        allScheduleTimeDataRedux: state.admin.allScheduleTimeData,
        scheduleDoctorNotificationsRedux:
            state.admin.scheduleDoctorNotifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        loadAllScheduleTimeData: () =>
            dispatch(actions.fetchAllScheduleHourStart()),
        saveBulkScheduleDoctor: (data) =>
            dispatch(actions.saveBulkScheduleDoctorStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
