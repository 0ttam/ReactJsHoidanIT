import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import adminService from "../../services/adminService";

class Login extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            hide: false,
        };
    }

    handleOnchangeInputUser = (event) => {
        this.setState({
            username: event.target.value,
        });
        console.log(event.target.value);
    };
    handleOnchangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin = () => {
        alert("say Hi");
    };
    handleHideShowEye = (event) => {
        this.setState({
            hide: !this.state.hide,
        });
    };

    render() {
        //JSX
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label for="login-user">Username:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="login-user"
                                id="login-user"
                                value={this.state.username}
                                onChange={(event) =>
                                    this.handleOnchangeInputUser(event)
                                }
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label for="login-password">Password:</label>
                            <div className="custom-password-input">
                                <input
                                    className="form-control"
                                    type={this.state.hide ? "text" : "password"}
                                    name="login-password"
                                    id="login-password"
                                    value={this.state.password}
                                    onChange={(event) =>
                                        this.handleOnchangeInputPassword(event)
                                    }
                                    placeholder="Enter your password"
                                />
                                <span
                                    className="custom-password-eye"
                                    onClick={(event) =>
                                        this.handleHideShowEye(event)
                                    }
                                >
                                    <i class={this.state.hide ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 button-container">
                            <button
                                type="submit"
                                onClick={() => this.handleLogin()}
                                className="button-login"
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12 forgot-password">
                            <span>For got password?</span>
                        </div>
                        <div className="col-12 text-order-login">
                            <span>Or login with:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook social-login-facebook"></i>
                            <i className="fab fa-google-plus-g social-login-google"></i>
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
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
