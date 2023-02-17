import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-container'>
                    <div className='section-header'>
                        <div className='section-title'>Truyền thông nói về BookingCare</div>
                    </div>
                    <div className='section-body'>
                        <iframe
                            src='https://www.youtube.com/embed/DVP1Vvi6lEY'
                            
                        ></iframe>
                        <div className='about-description'>Tất cả những hình ảnh và âm thanh đều thuộc sở hữu bản quyền của tác giả và nhà sản xuất phim. Các tài liệu được sử dụng dưới dạng "Fair-used". W2W Movie không sở hữu bất kì hình ảnh nào. Nếu các cậu muốn xem trực tuyến, thì hãy mua tài khoản trên các trang xem chính thống. Chúng tớ không khuyến khích xem lậu!</div>
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
