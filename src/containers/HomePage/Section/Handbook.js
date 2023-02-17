import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class MedicalFacility extends Component {
    render() {
        return (
            <div className='section-share section-hand-book'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>Cẩm nang</span>
                        <button className='btn-view-more'>XEM TẤT CẢ</button>
                    </div>
                    <div className='section-body'>
                        {console.log(this.props.settings)}
                        <Slider {...this.props.settings}>
                            <div className='hand-book-item'>
                                <div className='hand-book-back-ground'>
                                    <div className='hand-book-img'></div>
                                    <div className='hand-book-name'>
                                        6 địa chỉ Nha khoa Thẩm mỹ mới, có cơ sở
                                        hiện đại và uy tín tại TPHCM
                                    </div>
                                </div>
                            </div>
                            <div className='hand-book-item'>
                                <div className='hand-book-back-ground'>
                                    <div className='hand-book-img'></div>
                                    <div className='hand-book-name'>
                                        6 địa chỉ Nha khoa Thẩm mỹ mới, có cơ sở
                                        hiện đại và uy tín tại TPHCM
                                    </div>
                                </div>
                            </div>
                            <div className='hand-book-item'>
                                <div className='hand-book-back-ground'>
                                    <div className='hand-book-img'></div>
                                    <div className='hand-book-name'>
                                        6 địa chỉ Nha khoa Thẩm mỹ mới, có cơ sở
                                        hiện đại và uy tín tại TPHCM
                                    </div>
                                </div>
                            </div>
                            <div className='hand-book-item'>
                                <div className='hand-book-back-ground'>
                                    <div className='hand-book-img'></div>
                                    <div className='hand-book-name'>
                                        6 địa chỉ Nha khoa Thẩm mỹ mới, có cơ sở
                                        hiện đại và uy tín tại TPHCM
                                    </div>
                                </div>
                            </div>
                            <div className='hand-book-item'>
                                <div className='hand-book-back-ground'>
                                    <div className='hand-book-img'></div>
                                    <div className='hand-book-name'>
                                        6 địa chỉ Nha khoa Thẩm mỹ mới, có cơ sở
                                        hiện đại và uy tín tại TPHCM
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
