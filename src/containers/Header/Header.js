import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    };
    render() {
        const { processLogout, language } = this.props;

        return (
            <div className='header-container'>
                {/* thanh navigator */}
                <div className='header-tabs-container'>
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <div
                        className={
                            language === LANGUAGES.VI
                                ? 'language-vi active'
                                : 'language-vi'
                        }
                    >
                        <span onClick={() => this.changeLanguage('vi')}>
                            VI
                        </span>
                    </div>
                    <div className='flash'>|</div>
                    <div
                        className={
                            language === LANGUAGES.EN
                                ? 'language-en active'
                                : 'language-en'
                        }
                    >
                        <span onClick={() => this.changeLanguage('en')}>
                            EN
                        </span>
                    </div>
                    {/* nút logout */}
                    <div className='btn btn-logout' onClick={processLogout}>
                        <i className='fas fa-sign-out-alt'></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => {
            dispatch(changeLanguageApp(language));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
