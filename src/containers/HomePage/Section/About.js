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
                            <FormattedMessage id='homepage.media-talk-about-us' />
                        </div>
                    </div>
                    <div className='section-body'>
                        <div className='about-video'>
                            <iframe src='https://www.youtube.com/embed/7tiR7SI4CkI'></iframe>
                        </div>
                        <div className='about-description'>
                            <FormattedMessage id='homepage.content-intro' />
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
