import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopDoctor: [],
        };
    }
    async componentDidMount() {
        await this.props.loadTopDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({ arrTopDoctor: this.props.topDoctorRedux });
        }
    }
    handleViewDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };
    render() {
        let { arrTopDoctor } = this.state;
        let { languages } = this.props;
        // arrTopDoctor = arrTopDoctor.concat(arrTopDoctor).concat(arrTopDoctor);
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>
                            <FormattedMessage id='homepage.outstanding-doctor' />
                        </span>
                        <button className='btn-view-more'>
                            <FormattedMessage id='homepage.more-info' />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrTopDoctor &&
                                arrTopDoctor.length > 0 &&
                                arrTopDoctor.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.avatar) {
                                        imageBase64 = new Buffer(
                                            item.avatar,
                                            'base64'
                                        ).toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className='outstanding-doctor-item'
                                            key={index}
                                            onClick={() => {
                                                this.handleViewDoctor(item);
                                            }}
                                        >
                                            <div
                                                className='outstanding-doctor-img'
                                                style={{
                                                    background: `url(${imageBase64})`,
                                                    height: '150px',
                                                    width: '150px',
                                                    borderRadius: '50%',
                                                    backgroundPosition:
                                                        'center center',
                                                    backgroundRepeat:
                                                        'no-repeat',
                                                    backgroundSize: 'cover',
                                                    backgroundColor: '#eee',
                                                    margin: '0 auto',
                                                }}
                                            ></div>
                                            <div className='outstanding-doctor-name'>
                                                {languages &&
                                                languages === LANGUAGES.EN
                                                    ? nameEn
                                                    : nameVi}
                                            </div>
                                            <div className='outstanding-doctor-facility'>
                                                <b>
                                                    {
                                                        item.Doctor_Info
                                                            .Specialty.nameVi
                                                    }
                                                </b>
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
        languages: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctorStart()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
