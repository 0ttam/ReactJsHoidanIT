import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../HomePage/Header';
import * as actions from '../../store/actions/adminAction';
import _ from 'lodash';
import { LANGUAGES } from './../../utils';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: {},
        };
    }
    componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let data = {};
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            data = { token: token, doctorId: doctorId };
            this.props.verifyBookingEmail(data);
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.verifyBookAppointmentNotificationsRedux !==
            this.props.verifyBookAppointmentNotificationsRedux
        ) {
            let notification = {};
            notification =
                this.props.languages === LANGUAGES.EN
                    ? {
                          errMsg: this.props
                              .verifyBookAppointmentNotificationsRedux.en,
                          errType:
                              this.props.verifyBookAppointmentNotificationsRedux
                                  .errType,
                      }
                    : {
                          errMsg: this.props
                              .verifyBookAppointmentNotificationsRedux.vi,
                          errType:
                              this.props.verifyBookAppointmentNotificationsRedux
                                  .errType,
                      };
            this.setState({
                notification: notification,
            });
        }
    }

    render() {
        let { notification } = this.state;
        return (
            <>
                <Header />
                <div className='verify-container'>
                    <div className={`${notification.errType}`}>
                        {notification.errMsg}!
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        verifyBookAppointmentNotificationsRedux:
            state.admin.verifyBookAppointmentNotifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyBookingEmail: (data) =>
            dispatch(actions.verifyBookingEmailStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
