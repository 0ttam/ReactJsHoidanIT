import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
        };
    }
    componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {}
    showHiddenDetailInfo = () => {
        this.setState({ isShowDetailInfo: !this.state.isShowDetailInfo });
    };
    render() {
        let { isShowDetailInfo } = this.state;
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>
                        Phòng khám Sản Phụ khoa Thạc sĩ Huỳnh Kim Phượng
                    </div>
                    <div className='address-clinic'>
                        70B Trần Bình Trọng, Phường 1, Quận 5, TP Hồ Chí Minh
                    </div>
                </div>
                <div className='content-down'>
                    <div className='title-price'>GIÁ KHÁM:</div>
                    {isShowDetailInfo === false ? (
                        <div className='display-show'>
                            <div className='detail-price'>
                                <div>
                                    <span className='left'>Giá khám:</span>
                                    <span className='right'>200.000đ</span>.
                                    <span
                                        className='hide-show-detail'
                                        onClick={() =>
                                            this.showHiddenDetailInfo()
                                        }
                                    >
                                        Xem chi tiết
                                    </span>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    ) : (
                        <>
                            <div className='display-hide'>
                                <div className='detail-price'>
                                    <span className='left'>Giá khám:</span>
                                    <span className='right'>200.000đ</span>

                                    <div className='note'>
                                        {' '}
                                        Được ưu tiên khám trước
                                    </div>
                                </div>
                                <div className='payment'>
                                        <div>
                                            Người bệnh có thể thanh toán chi phí
                                            bằng hình thức tiền mặt và quẹt thẻ
                                        </div>
                                </div>
                            </div>
                            <div>
                                <span
                                    className='hide-show-detail'
                                    onClick={() => this.showHiddenDetailInfo()}
                                >
                                    Ẩn chi tiết
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
