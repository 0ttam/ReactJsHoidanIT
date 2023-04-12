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

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArray: '',
            selectedDoctor: '',
            currentDate: new Date(),
            allScheduleTimeData: [],
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
            this.setState({
                allScheduleTimeData: this.props.allScheduleTimeDataRedux,
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
        this.setState({ selectedDoctor }, async () => {
            this.setState({
                contentMarkdown: '',
                description: '',
                isUpdate: false,
            });
            if (this.state.selectedDoctor && this.state.selectedDoctor.id) {
                let id = this.state.selectedDoctor.id;
                // await this.props.loadDetailDoctor(id);
            }
        });
    };
    handleOnChangeDate = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        let _currentDate = new Date();
        let allScheduleTimeData = this.state.allScheduleTimeData;
        let { language } = this.props;
        console.log('allScheduleTimeData', this.state.allScheduleTimeData);
        return (
            <Fragment>
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
                                    minDate={_currentDate}
                                    value={this.state.currentDate}
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
                                                className='btn btn-schedule'
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
                            <button className='btn btn-primary mt-2'>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        loadAllScheduleTimeData: () =>
            dispatch(actions.fetchAllScheduleHourStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
