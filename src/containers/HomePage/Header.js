import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    };
    handleViewHomepage = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    };

    render() {
        let language = this.props.l;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div
                                className='header-logo'
                                onClick={() => this.handleViewHomepage()}
                            ></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.specialty' />
                                    </b>
                                </div>
                                <div className='sub-content'>
                                    <FormattedMessage id='home-header.search-doctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.health-facility' />
                                    </b>
                                </div>
                                <div className='sub-content'>
                                    <FormattedMessage id='home-header.choose-hospital-clinic' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.doctor' />
                                    </b>
                                </div>
                                <div className='sub-content'>
                                    <FormattedMessage id='home-header.choose-a-good-doctor' />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='home-header.examination-package' />
                                    </b>
                                </div>
                                <div className='sub-content'>
                                    <FormattedMessage id='home-header.general-health-check' />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className='fa fa-question-circle'></i>
                                <FormattedMessage id='home-header.support' />
                            </div>
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
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => {
            dispatch(changeLanguageApp(language));
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
