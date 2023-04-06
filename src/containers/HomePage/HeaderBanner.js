import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class HeaderBanner extends Component {
    render() {
        return (
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBanner);
