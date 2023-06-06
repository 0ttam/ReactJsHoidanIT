import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './LikeandShare.scss';

class LikeandShare extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.initFacebookSDK();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.language !== this.props.language) {
        //     let { language } = this.props;
        //     let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
        //     window.fbAsyncInit = function () {
        //         window.FB.init({
        //             appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        //             autoLogAppEvents: true,
        //             xfbml: true,
        //             version: 'v17.0',
        //         });
        //     };
        //     //Load the SDK asynchronously
        //     (function (d, s, id) {
        //         var js,
        //             fjs = d.getElementsByTagName(s)[0];
        //         if (d.getElementById(id)) {
        //             return;
        //         }
        //         js = d.createElement(s);
        //         js.id = id;
        //         js.src = `//connect.facebook.net/${locale}/sdk.js`;
        //         fjs.parentNode.insertBefore(js, fjs);
        //     })(document, 'script', 'facebook-jssdk');
        // }
    }
    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
        let { language } = this.props;
        console.log('language', language);
        let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v17.0',
            });
        };
        //Load the SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }
    render() {
        let { dataHref } = this.props;
        dataHref =
            +process.env.REACT_APP_IS_LOCALHOST === 1
                ? dataHref
                : 'https://github.com/0ttam';
        return (
            <>
                <div
                    className='fb-like'
                    data-href={dataHref}
                    data-width=''
                    data-layout='standard'
                    data-action='like'
                    data-size='small'
                    data-share='true'
                ></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeandShare);
