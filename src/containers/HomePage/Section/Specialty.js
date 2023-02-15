import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Specialty.scss';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'red' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'green' }}
            onClick={onClick}
        />
    );
}

class Specialty extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='specialty-name'>
                            Chuyên khoa phổ biến
                        </span>
                        <button className='view-more'>XEM THÊM</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div className='specialty-name'>
                                    Sản phụ khoa
                                </div>
                            </div>
                            <div className='specialty-item'>
                                <div className='specialty-img'></div>
                                <div
                                    className='specialty-name'
                                    style={{
                                        'background':
                                            'url("../../../assets/specialty/120933-tieu-hoa.jpg")',
                                    }}
                                >
                                    Nam khoa
                                </div>
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
