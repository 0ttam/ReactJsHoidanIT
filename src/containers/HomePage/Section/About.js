import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-container'>
                    <div className='section-header'>
                        <div className='section-title'>
                            Truyền thông nói về BookingCare
                        </div>
                    </div>
                    <div className='section-body'>
                        <div className='about-video'><iframe src='https://www.youtube.com/embed/7tiR7SI4CkI'></iframe></div>
                        <div className='about-description'>
                            Chương trình cà phê khởi nghiệp của VTV1 - Đài
                            truyền hình Việt Nam giới thiệu Nền tảng đặt khám
                            bác sĩ chuyên khoa BookingCare. Chương trình phát
                            vào 06h30 và phát lại vào 13h05 ngày 21/02/2018.
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
