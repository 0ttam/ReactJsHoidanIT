import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';

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

    render() {
        let languages = this.props.languages;
        let { profileDoctorById } = this.state;
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
                            backgroundPosition: 'center center',
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
                            <div className='doctor-name'>{nameVi}</div>
                            {profileDoctorById &&
                                profileDoctorById.data &&
                                profileDoctorById.data.Markdown && (
                                    <span>
                                        {
                                            profileDoctorById.data.Markdown
                                                .description
                                        }
                                    </span>
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
