import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class Handbook extends Component {
    render() {
        return (
            <div className='section-share section-medical'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>
                            Cơ sở y tế nổi bật
                        </span>
                        <button className='btn-view-more'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='medical-item'>
                                <div className='medical-img'></div>
                                <div className='medical-name'>
                                    Bệnh viện Việt Đức
                                </div>
                            </div>
                            <div className='medical-item'>
                                <div className='medical-img'></div>
                                <div className='medical-name'>
                                    Bệnh viện Chợ Rẫy
                                </div>
                            </div>
                            <div className='medical-item'>
                                <div className='medical-img'></div>
                                <div className='medical-name'>BV ĐH Y Dược</div>
                            </div>
                            <div className='medical-item'>
                                <div className='medical-img'></div>
                                <div className='medical-name'>Bệnh viện 7A</div>
                            </div>
                            <div className='medical-item'>
                                <div className='medical-img'></div>
                                <div className='medical-name'>
                                    Bệnh viện Quân Y 175
                                </div>
                            </div>
                            <div className='medical-item'>
                                <div className='medical-img'></div>
                                <div className='medical-name'>
                                    Khoa Y ĐH Quốc Gia
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
