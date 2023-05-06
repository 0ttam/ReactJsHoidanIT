import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/adminAction';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './ModalBooking.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ProfileDoctor from '../ProfileDoctor';
import { NumericFormat } from 'react-number-format';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';

class ModalBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            examinationPrice: '',
            currentDoctorId: '',
            scheduleSelected: '',

            lastName: '',
            firstName: '',
            phoneNumber: '',
            address: '',
            email: '',
            birthDay: '',
            genderId: '',
            medicalExaminationReason: '',

            arrGenders: [],
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
                await this.props.getGenderStart();
                this.setState({
                    examinationPrice: this.props.examinationPriceByIdRedux,
                    currentDoctorId: this.props.currentDoctorId,
                    scheduleSelected: this.props.scheduleSelected,
                });
            }
        }
        if (prevProps.arrGenders !== this.props.arrGenders) {
            let arrayInput = this.handleBuiltSelection(this.props.arrGenders);
            this.setState({
                arrGenders: arrayInput,
            });
        }
    }

    toggle = () => {
        this.props.toggle();
    };
    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({ ...stateCopy });
    };
    handleOnChangeDate = (date) => {
        this.setState({
            birthDay: date[0],
        });
    };
    handleGenderChange = (genderId) => {
        this.setState({ genderId });
    };
    handleBuiltSelection = (dataInput) => {
        let result = [];
        let language = this.props.languages;
        if (dataInput && dataInput.length > 0) {
            // eslint-disable-next-line array-callback-return
            dataInput.map((item, index) => {
                let Object = {};
                let nameVi = `${item.valueVi}`;
                let nameEn = `${item.valueEn}`;
                Object.label = language === LANGUAGES.EN ? nameEn : nameVi;
                Object.value = item.keyMap;
                result.push(Object);
            });
        }
        return result;
    };
    getArrDay = (languages, date) => {
        let showDate = '';
        if (languages === LANGUAGES.VI) {
            let labelVi = moment.unix(+date / 1000).format('dddd - DD/MM/YYYY');
            showDate = this.capitalizeFirstLetter(labelVi);
        } else {
            showDate = moment
                .unix(+date / 1000)
                .locale('en')
                .format('dddd - DD/MM/YYYY');
        }

        return showDate;
    };
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    handleClickConfirmButton = async () => {
        let date = new Date(this.state.birthDay).getTime();
        let dayDisplay = this.getArrDay(
            this.props.languages,
            this.state.scheduleSelected.date
        );
        console.log('daydisplay', dayDisplay);
        let data = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            email: this.state.email,
            date: date,
            gender: this.state.genderId.value,
            reason: this.state.medicalExaminationReason,
            timeType: this.state.scheduleSelected.timeType,
            doctorId: this.state.currentDoctorId,
            firstNameDoctor: this.state.examinationPrice.data.firstName,
            lastNameDoctor: this.state.examinationPrice.data.lastName,
            timeDisplay: this.state.scheduleSelected.availableTime.valueVi,
            dayDisplay: dayDisplay,
        };
        await this.props.createPatientBookAppointment(data);
        this.props.showNotification({
            msg: this.props.patientBookAppointmentNotifications.vi,
            errType: this.props.patientBookAppointmentNotifications.errType,
        });
        if (
            this.props.patientBookAppointmentNotifications &&
            this.props.patientBookAppointmentNotifications.errType === 'success'
        ) {
            this.setState({
                lastName: '',
                firstName: '',
                phoneNumber: '',
                address: '',
                email: '',
                date: '',
                reason: '',
            });
            this.props.toggle();
        }
        console.log('data', data);
        console.log('confirm', this.state);
    };
    render() {
        let languages = this.props.languages;
        let {
            lastName,
            firstName,
            phoneNumber,
            address,
            email,
            birthDay,
            genderId,
            medicalExaminationReason,
            arrGenders,
            examinationPrice,
        } = this.state;
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
                            <FormattedMessage id='patient.booking-modal.information-book-medical-appointment' />
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
                                <label>
                                    <FormattedMessage id='patient.booking-modal.first-name' />
                                </label>
                                <input
                                    className='form-control'
                                    value={firstName}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'firstName'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.last-name' />
                                </label>
                                <input
                                    className='form-control'
                                    value={lastName}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'lastName'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.phone-number' />
                                </label>
                                <input
                                    className='form-control'
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'phoneNumber'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-9 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.address' />
                                </label>
                                <input
                                    className='form-control'
                                    value={address}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'address'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.email' />
                                </label>
                                <input
                                    className='form-control'
                                    value={email}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(event, 'email')
                                    }
                                />
                            </div>

                            <div className='col-3 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.birthday' />
                                </label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnChangeDate}
                                    value={birthDay}
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.gender' />
                                </label>
                                <Select
                                    options={arrGenders}
                                    value={genderId}
                                    onChange={this.handleGenderChange}
                                    placeholder={
                                        <FormattedMessage id='patient.booking-modal.choose-gender' />
                                    }
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>
                                    <FormattedMessage id='patient.booking-modal.reason' />
                                </label>
                                <input
                                    className='form-control'
                                    value={medicalExaminationReason}
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'medicalExaminationReason'
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='modal-booking-footer'>
                        <button className='btn-booking-cancel'>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </button>
                        <button
                            className='btn-booking-confirm'
                            onClick={() => this.handleClickConfirmButton()}
                        >
                            <FormattedMessage id='patient.booking-modal.confirm' />
                        </button>
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
        arrGenders: state.admin.genders,
        patientBookAppointmentNotifications:
            state.admin.patientBookAppointmentNotifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadExaminationPriceById: (doctorId) =>
            dispatch(actions.getExaminationPriceByIdStart(doctorId)),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        createPatientBookAppointment: (data) =>
            dispatch(actions.postPatientBookAppointment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
