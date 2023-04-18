import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import './DoctorSchedule.scss';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: '',
            allDays: [],
            allScheduleByDate: [],
        };
    }
    componentDidMount() {
        this.setDay(this.props.languages);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.languages !== this.props.languages) {
            this.setDay(this.props.languages);
        }
        if (prevProps.scheduleByDateRedux !== this.props.scheduleByDateRedux) {
            this.setState({
                allScheduleByDate: this.props.scheduleByDateRedux.data,
            });
        }
    }
    setDay = (languages) => {
        let arrDate = [];
        // console.log(
        //     'moment en:',
        //     moment(new Date()).locale('en').format('dddd - DD/MM')
        // );
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (languages === LANGUAGES.VI) {
                console.log('label viet');
                let labelVi = moment(new Date())
                    .add(i, 'days')
                    .format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi);
            } else {
                console.log('label anh');
                object.label = moment(new Date())
                    .add(i, 'days')
                    .locale('en')
                    .format('dddd - DD/MM');
            }
            object.value = moment(new Date())
                .add(i, 'days')
                .startOf('day')
                .valueOf();
            arrDate.push(object);
        }
        this.setState({ allDays: arrDate });
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    handleOnChangeDate = async (event) => {
        if (
            // get doctor id from Prop
            this.props.detailDoctorFromParent &&
            this.props.detailDoctorFromParent.id
        ) {
            let doctorId = this.props.detailDoctorFromParent.id;
            let date = event.target.value;
            await this.props.loadScheduleByDate(doctorId, date);
        }
    };
    render() {
        let { allDays, allScheduleByDate } = this.state;
        let languages = this.props.languages;
        return (
            <Fragment>
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
                                <span>Lịch Khám</span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allScheduleByDate &&
                            allScheduleByDate &&
                            allScheduleByDate.length > 0 ? (
                                allScheduleByDate.map((item, index) => {
                                    let availableTime =
                                        languages === LANGUAGES.VI
                                            ? item.availableTime.valueVi
                                            : item.availableTime.valueEn;
                                    return (
                                        <button key={index}>
                                            <b>{availableTime}</b>
                                        </button>
                                    );
                                })
                            ) : (
                                <b>Bác sĩ không có lịch khám vào ngày này</b>
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
