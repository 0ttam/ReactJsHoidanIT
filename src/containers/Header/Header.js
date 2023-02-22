import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log('userinfo', userInfo);
        return (
            <div className='header-container'>
                {/* thanh navigator */}
                <div className='header-tabs-container'>
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id='home-header.welcome' />{' '}
                        {userInfo && userInfo.firstName && userInfo.lastName
                            ? `${userInfo.firstName} ${userInfo.lastName}`
                            : ''}
                        !
                    </span>
                    <span
                        className={
                            language === LANGUAGES.VI
                                ? 'language-vi active'
                                : 'language-vi'
                        }
                    >
                        <span onClick={() => this.changeLanguage('vi')}>
                            VI
                        </span>
                    </span>
                    <span className='flash'>|</span>
                    <span
                        className={
                            language === LANGUAGES.EN
                                ? 'language-en active'
                                : 'language-en'
                        }
                    >
                        <span onClick={() => this.changeLanguage('en')}>
                            EN
                        </span>
                    </span>
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
        userInfo: state.user.userInfo,
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
