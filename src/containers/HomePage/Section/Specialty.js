import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Specialty extends Component {
    render() {
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>
                            Chuyên khoa phổ biến
                        </span>
                        <button className='btn-view-more'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>
                                    Sản phụ khoa
                                </div>
                            </div>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>Nam khoa</div>
                            </div>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>Cột sống</div>
                            </div>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>Tiêu hóa</div>
                            </div>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>Tim mạch</div>
                            </div>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>
                                    Cơ Xương khớp
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
