import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from '../../../store/actions/adminAction';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: [],
        };
    }
    async componentDidMount() {
        await this.props.getAllClinic();
    }
    async componentDidUpdate(prevProps) {
        if (
            prevProps.infoListClinicByIdRedux !==
            this.props.infoListClinicByIdRedux
        ) {
            if (
                this.props.infoListClinicByIdRedux &&
                this.props.infoListClinicByIdRedux.data
            ) {
                this.setState({
                    listClinic: this.props.infoListClinicByIdRedux.data,
                });
            }
        }
    }
    handleOnClickItemClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };
    render() {
        let { listClinic } = this.state;
        return (
            <div className='section-share section-medical'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>
                            <FormattedMessage id='homepage.outstanding-medical-facility' />
                        </span>
                        <button className='btn-view-more'>
                            <FormattedMessage id='homepage.more-info' />
                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {listClinic &&
                                listClinic.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(
                                            item.image,
                                            'base64'
                                        ).toString('binary');
                                    }
                                    return (
                                        <div
                                            className='medical-item'
                                            key={index}
                                            onClick={() =>
                                                this.handleOnClickItemClinic(
                                                    item
                                                )
                                            }
                                        >
                                            <div
                                                className='medical-img'
                                                style={{
                                                    backgroundImage: `url(${imageBase64})`,
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
                                            <div className='medical-name'>
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
        infoListClinicByIdRedux: state.admin.infoListClinicById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClinic: () => dispatch(actions.getClinicByIdStart('ALL')),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
