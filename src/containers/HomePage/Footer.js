import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Footer.scss';

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <div className='footer-container'>
                    <div className='footer-zone-1'>
                        <div className='wrap-logo'>
                            <div className='header-logo'></div>
                        </div>
                        <div className='company-name'>
                            <b>Công ty Cổ phần Công nghệ BookingCare</b>
                        </div>
                        <div>
                        <i class="fas fa-location-arrow"></i>
                            28 Thành Thái,
                            Dịch Vọng, Cầu Giấy, Hà Nội
                        </div>
                        <div>
                            <i className='fas fa-check'> </i>
                            ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày
                            16/03/2015
                        </div>
                    </div>
                    <div className='footer-zone-2'>
                        <div className='footer-contact'>
                            <a href='#'>Liên hệ hợp tác</a>
                        </div>
                        <div className='footer-contact'>
                            <a href='#'>Gói chuyển đổi số doanh nghiệp</a>
                        </div>
                        <div className='footer-contact'>
                            <a href='#'>Tuyển dụng</a>
                        </div>
                        <div className='footer-contact'>
                            <a href='#'>Câu hỏi thường gặp</a>
                        </div>
                        <div className='footer-contact'>
                            <a href='#'>Điều khoản sử dụng</a>
                        </div>

                        <div className='footer-contact'>
                            <a href='#'>Chính sách Bảo mật</a>
                        </div>
                        <div className='footer-contact'>
                            <a href='#'>
                                Quy trình hỗ trợ giải quyết khiếu nại
                            </a>
                        </div>
                        <div className='footer-contact'>
                            <a href='#'>Quy chế hoạt động</a>
                        </div>
                    </div>
                    <div className='footer-zone-3'>
                        <div className='address'>
                            <div>
                                <b>Trụ sở tại Hà Nội</b>
                            </div>
                            <span>
                                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                            </span>
                        </div>
                        <div className='address'>
                            <div>
                                <b>Văn phòng tại TP Hồ Chí Minh</b>
                            </div>
                            <span>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</span>
                        </div>
                        <div className='address'>
                            <div>
                                <b>Hỗ trợ khách hàng</b>
                            </div>
                            <span>support@bookingcare.vn (7h - 20h)</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
