import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {
    render() {
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>
                            Bác sĩ nổi bật tuần qua
                        </span>
                        <button className='btn-view-more'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='outstanding-doctor-item'>
                                <div className='outstanding-doctor-img'></div>
                                <div className='outstanding-doctor-name'>
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </div>
                                <div className='outstanding-doctor-facility'>
                                    Nam Khoa
                                </div>
                            </div>
                            <div className='outstanding-doctor-item'>
                                <div className='outstanding-doctor-img'></div>
                                <div className='outstanding-doctor-name'>
                                    Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn
                                    Duy Hưng
                                </div>
                                <div className='outstanding-doctor-facility'>
                                    Da liễu
                                </div>
                            </div>
                            <div className='outstanding-doctor-item'>
                                <div className='outstanding-doctor-img'></div>
                                <div className='outstanding-doctor-name'>
                                    Bác sĩ chuyên khoa II Trần Thị Hoài Hương
                                </div>
                                <div className='outstanding-doctor-facility'>
                                    Da liễu
                                </div>
                            </div>
                            <div className='outstanding-doctor-item'>
                                <div className='outstanding-doctor-img'></div>
                                <div className='outstanding-doctor-name'>
                                    Giáo sư, Tiến sĩ Hà Văn Quyết
                                </div>
                                <div className='outstanding-doctor-facility'>
                                    Tiêu hóa
                                </div>
                            </div>
                            <div className='outstanding-doctor-item'>
                                <div className='outstanding-doctor-img'></div>
                                <div className='outstanding-doctor-name'>
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </div>
                                <div className='outstanding-doctor-facility'>
                                    Nam Khoa
                                </div>
                            </div>
                            <div className='outstanding-doctor-item'>
                                <div className='outstanding-doctor-img'></div>
                                <div className='outstanding-doctor-name'>
                                    Bác sĩ Chuyên khoa II Trần Minh Khuyên
                                </div>
                                <div className='outstanding-doctor-facility'>
                                    Nam Khoa
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
