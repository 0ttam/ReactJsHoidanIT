import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../store/actions/adminAction';
import './DoctorExtraInfo.scss';
import { NumericFormat } from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            doctorExtraInfo: {},
        };
    }
    componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentDoctorId !== this.props.currentDoctorId) {
            await this.props.getDoctorExtraInfo(this.props.currentDoctorId);
        }
        if (
            prevProps.doctorExtraInfoRedux !== this.props.doctorExtraInfoRedux
        ) {
            this.setState({
                doctorExtraInfo: this.props.doctorExtraInfoRedux,
            });
        }
    }
    showHiddenDetailInfo = () => {
        this.setState({ isShowDetailInfo: !this.state.isShowDetailInfo });
    };
    render() {
        let languages = this.props.languages;
        let { isShowDetailInfo, doctorExtraInfo } = this.state;
        return (
            <div className='doctor-extra-info-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.doctor-extra-info.address' />
                    </div>
                    <div className='name-clinic'>
                        {doctorExtraInfo &&
                        doctorExtraInfo.data &&
                        doctorExtraInfo.data.nameClinic
                            ? doctorExtraInfo.data.nameClinic
                            : ''}
                    </div>
                    <div className='address-clinic'>
                        {doctorExtraInfo &&
                        doctorExtraInfo.data &&
                        doctorExtraInfo.data.addressClinic
                            ? doctorExtraInfo.data.addressClinic
                            : ''}
                    </div>
                </div>
                <div className='content-down'>
                    <div className='title-price'>
                        <FormattedMessage id='patient.doctor-extra-info.price' />
                    </div>
                    {isShowDetailInfo === false ? (
                        <div className='display-show'>
                            <div className='detail-price'>
                                <div>
                                    <span className='left'>
                                        <FormattedMessage id='patient.doctor-extra-info.price' />
                                        :{' '}
                                    </span>
                                    <span className='right'>
                                        {languages === LANGUAGES.VI &&
                                        doctorExtraInfo &&
                                        doctorExtraInfo.data &&
                                        doctorExtraInfo.data.priceTypeData ? (
                                            <NumericFormat
                                                value={
                                                    doctorExtraInfo &&
                                                    doctorExtraInfo.data &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData.valueVi
                                                }
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                suffix='VNĐ'
                                            />
                                        ) : (
                                            <NumericFormat
                                                value={
                                                    doctorExtraInfo &&
                                                    doctorExtraInfo.data &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData.valueEn
                                                }
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                prefix='$'
                                            />
                                        )}
                                    </span>
                                    .
                                    <span
                                        className='hide-show-detail'
                                        onClick={() =>
                                            this.showHiddenDetailInfo()
                                        }
                                    >
                                        <FormattedMessage id='patient.doctor-extra-info.view-details' />
                                    </span>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    ) : (
                        <>
                            <div className='display-hide'>
                                <div className='detail-price'>
                                    <span className='left'>
                                        <FormattedMessage id='patient.doctor-extra-info.price' />
                                        :
                                    </span>
                                    <span className='right'>
                                        {languages === LANGUAGES.VI &&
                                        doctorExtraInfo &&
                                        doctorExtraInfo.data &&
                                        doctorExtraInfo.data.priceTypeData ? (
                                            <NumericFormat
                                                value={
                                                    doctorExtraInfo &&
                                                    doctorExtraInfo.data &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData.valueVi
                                                }
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                suffix='VNĐ'
                                            />
                                        ) : (
                                            <NumericFormat
                                                value={
                                                    doctorExtraInfo &&
                                                    doctorExtraInfo.data &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData &&
                                                    doctorExtraInfo.data
                                                        .priceTypeData.valueEn
                                                }
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                prefix='$'
                                            />
                                        )}
                                    </span>

                                    <div className='note'>
                                        {doctorExtraInfo &&
                                        doctorExtraInfo.data &&
                                        doctorExtraInfo.data.note
                                            ? doctorExtraInfo.data.note
                                            : ''}
                                    </div>
                                </div>
                                <div className='payment'>
                                    <div>
                                        <FormattedMessage id='patient.doctor-extra-info.patient-payment' />{' '}
                                        <b>
                                            {languages === LANGUAGES.VI &&
                                            doctorExtraInfo &&
                                            doctorExtraInfo.data &&
                                            doctorExtraInfo.data.paymentTypeData
                                                ? doctorExtraInfo.data
                                                      .paymentTypeData.valueVi
                                                : ''}

                                            {languages === LANGUAGES.EN &&
                                            doctorExtraInfo &&
                                            doctorExtraInfo.data &&
                                            doctorExtraInfo.data.paymentTypeData
                                                ? doctorExtraInfo.data
                                                      .paymentTypeData.valueEn
                                                : ''}
                                        </b>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span
                                    className='hide-show-detail'
                                    onClick={() => this.showHiddenDetailInfo()}
                                >
                                    <FormattedMessage id='patient.doctor-extra-info.hide-details' />
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
        doctorExtraInfoRedux: state.admin.doctorExtraInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorExtraInfo: (doctorId) =>
            dispatch(actions.getDoctorExtraInfoByIdStart(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
