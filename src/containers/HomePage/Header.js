import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    };
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
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
                <div className='home-header-banner'>
                    <div className='content-top'>
                        <div className='title-1'>
                            <FormattedMessage id='banner.title1' />
                        </div>
                        <div className='title-1'>
                            <b>
                                <FormattedMessage id='banner.title2' />
                            </b>
                        </div>
                        <div className='search'>
                            <i className='fa fa-search'></i>
                            <input type='text' placeholder='...' />
                        </div>
                    </div>
                    <div className='content-bottom'>
                        <div className='options'>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png' />
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id='banner.specialist-examination' />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png' />
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id='banner.remote-medical-examination' />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png' />
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id='banner.physical-examination' />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png' />
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id='banner.medical-test' />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png' />
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id='banner.mental-health' />
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'>
                                    <img src='https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png' />
                                </div>
                                <div className='text-child'>
                                    <FormattedMessage id='banner.dental-examination' />
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
