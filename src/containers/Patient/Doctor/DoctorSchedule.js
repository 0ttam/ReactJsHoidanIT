import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import ModalBooking from './Modal/ModalBooking';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: '',
            allDays: [],
            allScheduleByDate: [],
            isOpenModalBooking: false,
            scheduleSelected: '',
            currentDoctorId: '',
        };
    }
    componentDidMount() {
        let arrDate = this.getArrDay(this.props.languages);
        this.setState({
            allDays: arrDate,
        });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.languages !== this.props.languages) {
            let arrDate = this.getArrDay(this.props.languages);
            this.setState({
                allDays: arrDate,
            });
        }
        if (prevProps.scheduleByDateRedux !== this.props.scheduleByDateRedux) {
            this.setState({
                allScheduleByDate: this.props.scheduleByDateRedux.data,
            });
        }
        if (prevProps.currentDoctorId !== this.props.currentDoctorId) {
            this.props.loadScheduleByDate(
                this.props.currentDoctorId,
                this.state.allDays[0].value
            );
            this.setState({
                currentDoctorId: this.props.currentDoctorId,
            });
        }
    }
    getArrDay = (languages) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (languages === LANGUAGES.VI) {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`;
                    object.label = this.capitalizeFirstLetter(today);
                } else {
                    let labelVi = moment(new Date())
                        .add(i, 'days')
                        .format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let labelEn2 = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelEn2}`;
                    object.label = this.capitalizeFirstLetter(today);
                } else {
                    object.label = moment(new Date())
                        .add(i, 'days')
                        .locale('en')
                        .format('dddd - DD/MM');
                }
            }
            object.value = moment(new Date())
                .add(i, 'days')
                .startOf('day')
                .valueOf();
            arrDate.push(object);
        }
        return arrDate;
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    handleOnChangeDate = async (event) => {
        if (
            // get doctor id from Prop
            this.props.currentDoctorId
        ) {
            let doctorId = this.props.currentDoctorId;
            let date = event.target.value;
            await this.props.loadScheduleByDate(doctorId, date);
        }
    };
    handleOnclickAvailableTime = (item) => {
        this.setState({ isOpenModalBooking: true, scheduleSelected: item });
    };
    handleToggleModalBooking = () => {
        this.setState({ isOpenModalBooking: !this.state.isOpenModalBooking });
    };
    showNotification = (data) => {
        this.props.showNotification(data);
    };
    render() {
        let { allDays, allScheduleByDate } = this.state;
        let languages = this.props.languages;
        console.log('scheduleSelected', this.state.scheduleSelected);
        return (
            <Fragment>
                <ModalBooking
                    isOpen={this.state.isOpenModalBooking}
                    toggle={this.handleToggleModalBooking}
                    scheduleSelected={this.state.scheduleSelected}
                    currentDoctorId={this.state.currentDoctorId}
                    showNotification={(data) => this.showNotification(data)}
                />
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(event) => this.handleOnChangeDate(event)}
                        >
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span>
                                    <FormattedMessage id='patient.detail-doctor.schedule' />
                                </span>
                            </i>
                        </div>
                        <div className='time-content-container'>
                            {allScheduleByDate &&
                            allScheduleByDate &&
                            allScheduleByDate.length > 0 ? (
                                <Fragment>
                                    <div className='time-content'>
                                        {allScheduleByDate.map(
                                            (item, index) => {
                                                let availableTime =
                                                    languages === LANGUAGES.VI
                                                        ? item.availableTime
                                                              .valueVi
                                                        : item.availableTime
                                                              .valueEn;
                                                return (
                                                    <button
                                                        key={index}
                                                        className={
                                                            languages ===
                                                            LANGUAGES.VI
                                                                ? 'btn-vi'
                                                                : 'btn-en'
                                                        }
                                                        onClick={() =>
                                                            this.handleOnclickAvailableTime(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <b>{availableTime}</b>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                    <div className='free-book'>
                                        <FormattedMessage id='patient.detail-doctor.free-book-1' />{' '}
                                        <i class='fas fa-hand-point-up'></i>{' '}
                                        <FormattedMessage id='patient.detail-doctor.free-book-2' />
                                    </div>
                                </Fragment>
                            ) : (
                                <b>
                                    <i>
                                        <FormattedMessage id='patient.detail-doctor.non-schedule' />
                                    </i>
                                </b>
                            )}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        scheduleByDateRedux: state.admin.scheduleByDate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadScheduleByDate: (doctorId, date) =>
            dispatch(actions.getScheduleByDateStart(doctorId, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
