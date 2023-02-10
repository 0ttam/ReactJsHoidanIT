import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss';

class Header extends Component {
    render() {
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
                                    <b>Chuyên khoa</b>
                                </div>
                                <div className='sub'>
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Cơ sở y tế</b>
                                </div>
                                <div className='sub'>
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Bác sĩ</b>
                                </div>
                                <div className='sub'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Gói khám</b>
                                </div>
                                <div className='sub'>
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className='fa fa-question-circle'></i>
                                Hỗ Trợ
                            </div>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-top'>
                        <div className='title-1'>NỀN TẢNG Y TẾ</div>
                        <div className='title-1'>
                            <b>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</b>
                        </div>
                        <div className='search'>
                            <i className='fa fa-search'></i>
                            <input type='text' />
                        </div>
                    </div>
                    <div className='content-bottom'>
                        <div className='options'>
                            <div className='options-child'>
                                <div className='icon-child'><img src='https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png'/></div>
                                <div className='text-child'>
                                    Khám Chuyên khoa
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><img src='https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png'/></div>
                                <div className='text-child'>Khám từ xa</div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png'/></div>
                                <div className='text-child'>Khám tổng quát</div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png'/></div>
                                <div className='text-child'>
                                    Xét nghiệm y học
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><img src='https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png'/></div>
                                <div className='text-child'>
                                    Sức khỏe tinh thần
                                </div>
                            </div>
                            <div className='options-child'>
                                <div className='icon-child'><img src='https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png'/></div>
                                <div className='text-child'>Khám nha khoa</div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
