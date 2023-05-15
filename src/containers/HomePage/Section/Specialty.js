import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions/adminAction';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
        };
    }
    async componentDidMount() {
        await this.props.getAllSpecialty();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrSpecialtyRedux !== this.props.arrSpecialtyRedux) {
            if (
                this.props.arrSpecialtyRedux &&
                this.props.arrSpecialtyRedux.data
            ) {
                let arrSpecialty = this.props.arrSpecialtyRedux.data;
                this.setState({
                    arrSpecialty: arrSpecialty,
                });
            }
        }
    }
    onClickItemSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
        }
    };
    render() {
        let { arrSpecialty } = this.state;
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>
                            <FormattedMessage id='homepage.popular-specialties' />
                        </span>
                        <button className='btn-view-more'>
                            <FormattedMessage id='homepage.more-info' />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrSpecialty &&
                                arrSpecialty.map((item) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(
                                            item.image,
                                            'base64'
                                        ).toString('binary');
                                    }
                                    return (
                                        <div
                                            className='specialty-item'
                                            onClick={() =>
                                                this.onClickItemSpecialty(item)
                                            }
                                        >
                                            <div
                                                className='specialty-img'
                                                style={{
                                                    background: `url(${imageBase64})`,
                                                    // height: '150px',
                                                    // backgroundPosition:
                                                    //     'center center',
                                                    // backgroundRepeat:
                                                    //     'no-repeat',
                                                    // backgroundSize: 'cover',
                                                    // backgroundColor: '#eee',
                                                    // margin: '0 auto',
                                                }}
                                            ></div>
                                            <div className='specialty-name'>
                                                {item.nameVi}
                                            </div>
                                        </div>
                                    );
                                })}
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
        languages: state.app.language,
        arrSpecialtyRedux: state.admin.getSpecialtyById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialty: () => dispatch(actions.getSpecialtyByIdStart('ALL')),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
