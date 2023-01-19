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
    }

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
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="col-12 form-group login-input">
                            <label for="login-password">Password:</label>
                            <input
                                className="form-control"
                                type="password"
                                name="login-    password"
                                id="login-password"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="col-12 button-container">
                            <button type="submit" className="button-login">
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
