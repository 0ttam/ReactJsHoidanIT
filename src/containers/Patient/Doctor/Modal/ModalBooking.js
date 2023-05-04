import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../../store/actions/adminAction';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './ModalBooking.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { stringify } from 'react-auth-wrapper/helpers';
import ProfileDoctor from '../ProfileDoctor';
import { NumericFormat } from 'react-number-format';

class ModalBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examinationPrice: '',
            currentDoctorId: '',
        };
    }
    async componentDidMount() {
        if (this.props.currentDoctorId) {
            await this.props.loadExaminationPriceById(
                this.props.currentDoctorId
            );
            this.setState({
                examinationPrice: this.props.examinationPriceByIdRedux,
                currentDoctorId: this.props.currentDoctorId,
            });
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentDoctorId !== this.props.currentDoctorId) {
            await this.props.loadExaminationPriceById(
                this.props.currentDoctorId
            );
            this.setState({
                examinationPrice: this.props.examinationPriceByIdRedux,
                currentDoctorId: this.props.currentDoctorId,
            });
        }
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen === true) {
                await this.props.loadExaminationPriceById(
                    this.props.currentDoctorId
                );
                console.log('in here', this.props.examinationPriceByIdRedux);
                this.setState({
                    examinationPrice: this.props.examinationPriceByIdRedux,
                    currentDoctorId: this.props.currentDoctorId,
                });
            }
        }
    }

    toggle = () => {
        this.props.toggle();
    };
    render() {
        let languages = this.props.languages;
        console.log('examinationPrice', this.state.examinationPrice);
        let { examinationPrice } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='modal-booking-container'
                size='lg'
                // centered
            >
                <div className='modal-booking-content'>
                    <div className='modal-booking-header'>
                        <span className='left'>
                            Thông tin đặt lịch khám bệnh
                        </span>
                        <span
                            className='right'
                            onClick={() => {
                                this.toggle();
                            }}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='modal-booking-body'>
                        {/* {JSON.stringify(this.props.scheduleSelected)} */}
                        <div className='doctor-info'>
                            <ProfileDoctor
                                currentDoctorId={this.props.currentDoctorId}
                                isOpenDescription={false}
                                scheduleSelected={this.props.scheduleSelected}
                            />
                        </div>
                        <div className='price'>
                            <FormattedMessage id='patient.doctor-extra-info.price' />
                            :{' '}
                            <b>
                                {languages === LANGUAGES.VI &&
                                examinationPrice &&
                                examinationPrice.data &&
                                examinationPrice.data.Doctor_Info &&
                                examinationPrice.data.Doctor_Info
                                    .priceTypeData ? (
                                    <NumericFormat
                                        value={
                                            examinationPrice &&
                                            examinationPrice.data &&
                                            examinationPrice.data.Doctor_Info &&
                                            examinationPrice.data.Doctor_Info
                                                .priceTypeData &&
                                            examinationPrice.data.Doctor_Info
                                                .priceTypeData.valueVi
                                        }
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        suffix='VNĐ'
                                    />
                                ) : (
                                    <NumericFormat
                                        value={
                                            examinationPrice &&
                                            examinationPrice.data &&
                                            examinationPrice.data.Doctor_Info &&
                                            examinationPrice.data.Doctor_Info
                                                .priceTypeData &&
                                            examinationPrice.data.Doctor_Info
                                                .priceTypeData.valueEn
                                        }
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        prefix='$'
                                    />
                                )}
                            </b>
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Ho Ten</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>So dien thoai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-5 form-group'>
                                <label>Dia chi email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-7 form-group'>
                                <label>Dia chi lien he</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Gioi tinh</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Nam sinh</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Dat cho ai</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-12 form-group'>
                                <label>Ly do kham</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='modal-booking-footer'>
                        <button className='btn-booking-cancel'>Cancel</button>
                        <button className='btn-booking-confirm'>Confirm</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        examinationPriceByIdRedux: state.admin.examinationPriceById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadExaminationPriceById: (doctorId) =>
            dispatch(actions.getExaminationPriceByIdStart(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
