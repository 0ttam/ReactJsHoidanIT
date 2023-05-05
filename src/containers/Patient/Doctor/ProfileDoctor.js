import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDoctorById: {},
        };
    }
    async componentDidMount() {
        await this.props.loadProfileDoctorById(this.props.currentDoctorId);
        this.setState({ profileDoctorById: this.props.profileDoctorByIdRedux });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    renderTimeBooking = (dataTime) => {
        let languages = this.props.languages;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date =
                languages === LANGUAGES.VI
                    ? moment
                          .unix(+dataTime.date / 1000)
                          .format('dddd - DD/MM/YY')
                    : moment
                          .unix(+dataTime.date / 1000)
                          .locale('en')
                          .format('dddd - MM/DD/YY');
            let time =
                languages === LANGUAGES.VI
                    ? dataTime.availableTime.valueVi
                    : dataTime.availableTime.valueEn;
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id='patient.profile-doctor.free-book' />
                    </div>
                </>
            );
        }
        return <></>;
    };

    render() {
        let { profileDoctorById } = this.state;
        let { languages, scheduleSelected, isOpenDescription } = this.props;
        let nameVi = '',
            nameEn = '';
        if (
            profileDoctorById &&
            profileDoctorById.data &&
            profileDoctorById.data.positionData
        ) {
            nameVi = `${profileDoctorById.data.positionData.valueVi} ${profileDoctorById.data.lastName} ${profileDoctorById.data.firstName}`;
            nameEn = `${profileDoctorById.data.positionData.valueEn} ${profileDoctorById.data.firstName} ${profileDoctorById.data.lastName}`;
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div
                        className='content-left'
                        style={{
                            backgroundImage: `url(${
                                profileDoctorById &&
                                profileDoctorById.data &&
                                profileDoctorById.data.avatar
                            })`,
                            height: '80px',
                            width: '80px',
                            borderRadius: '50%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundColor: '#eee',
                            margin: '0 auto',
                        }}
                    ></div>
                    <div className='content-right'>
                        <div className='content-right-up'>
                            {languages && languages === LANGUAGES.EN
                                ? nameEn
                                : nameVi}
                        </div>
                        <div className='content-right-down'>
                            {isOpenDescription === true &&
                            profileDoctorById &&
                            profileDoctorById.data &&
                            profileDoctorById.data.Markdown ? (
                                <span>
                                    {
                                        profileDoctorById.data.Markdown
                                            .description
                                    }
                                </span>
                            ) : (
                                this.renderTimeBooking(scheduleSelected)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        profileDoctorByIdRedux: state.admin.profileDoctorById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadProfileDoctorById: (doctorId) =>
            dispatch(actions.getProfileDoctorByIdStart(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
