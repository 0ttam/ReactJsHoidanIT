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
        };
    }
    componentDidMount() {
        this.setDay(this.props.languages);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.languages !== this.props.languages) {
            this.setDay(this.props.languages);
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
                object.label = moment(new Date())
                    .add(i, 'days')
                    .format('dddd - DD/MM');
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
    handleOnChangeDate = (event) => {
        if (
            this.props.detailDoctorFromParent &&
            this.props.detailDoctorFromParent.id
        ) {
            let doctorId = this.props.detailDoctorFromParent.id;
            let date = event.target.value;
            this.props.loadScheduleByDate(doctorId, date);
        }
    };
    render() {
        let { allDays } = this.state;
        console.log('arr date:', allDays);
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
                    <div className='all-available-time'></div>
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
