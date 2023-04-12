import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';

import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        // eslint-disable-next-line no-this-before-super
        this.state = {
            username: '',
            password: '',
            errMessage: '',
            hide: false,
        };
    }

    handleOnchangeInputUser = (event) => {
        this.setState({
            username: event.target.value,
        });
    };
    handleOnchangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = async () => {
        this.setState({
            errMessage: '',
        });

        try {
            let data = await handleLoginApi(
                this.state.username,
                this.state.password
            );
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage,
                });
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log(data);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.errMessage,
                    });
                }
            }
            console.log(error.response);
        }
    };
    handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    };
    handleHideShowEye = (event) => {
        this.setState({
            hide: !this.state.hide,
        });
    };

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label for='email'>Username:</label>
                            <input
                                className='form-control'
                                type='text'
                                name='email'
                                id='email'
                                value={this.state.username}
                                onChange={(event) =>
                                    this.handleOnchangeInputUser(event)
                                }
                                placeholder='Enter your username'
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label for='password'>Password:</label>
                            <div className='custom-password-input'>
                                <input
                                    className='form-control'
                                    type={this.state.hide ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnchangeInputPassword(event)
                                    }
                                    placeholder='Enter your password'
                                    onKeyDown={(event) =>
                                        this.handleOnKeyDown(event)
                                    }
                                />
                                <span
                                    className='custom-password-eye'
                                    onClick={(event) =>
                                        this.handleHideShowEye(event)
                                    }
                                >
                                    <i
                                        class={
                                            this.state.hide
                                                ? 'fas fa-eye-slash'
                                                : 'fas fa-eye'
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 button-container'>
                            <button
                                type='submit'
                                onClick={() => this.handleLogin()}
                                className='button-login'
                            >
                                Login
                            </button>
                        </div>
                        <div className='col-12 forgot-password'>
                            <span>For got password?</span>
                        </div>
                        <div className='col-12 text-order-login'>
                            <span>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-facebook social-login-facebook'></i>
                            <i className='fab fa-google-plus-g social-login-google'></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
