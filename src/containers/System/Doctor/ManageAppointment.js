import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import './ManageAppointment.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import _ from 'lodash';
import { toast, ToastContainer } from 'react-toastify';
import { dateFormat } from '../../../utils/constant';
import SendInvoiceAndRecipience from './Modal/SendInvoiceAndRecipience';
import ModalPreviewImage from '../Admin/ModalPreviewImage';
import { postSendInvoiceAndRecipience } from '../../../services/userService';
import LoadingOverlay from 'react-loading-overlay';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listPatient: [],
            doctorId: '',
            patientSelected: {},
            currentDate: '',
            isOpenModalRecipience: false,
            isActiveLoadingOverlay: false,
        };
    }
    async componentDidMount() {}
    componentDidUpdate(prevProps) {
        if (prevProps.listPatientRedux !== this.props.listPatientRedux) {
            let arrPatient = this.props.listPatientRedux.data;
            this.setState({
                listPatient: arrPatient,
            });
        }
    }
    handleOnChangeDate = async (date) => {
        let formatDate = new Date(date[0]).getTime();
        await this.props.loadListPatientByDoctorTime(
            this.props.userInfo.id,
            formatDate
        );
        this.setState({
            currentDate: date[0],
        });
    };

    toggleModalRecipience = (patient) => {
        this.setState({
            isOpenModalRecipience: !this.state.isOpenModalRecipience,
            patientSelected: patient,
        });
        console.log('patient', patient);
    };
    openModalPreviewImage = (imageData, modal, specialtyData) => {
        switch (modal) {
            case 'isOpenModalUser':
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    isOpenModalRecipience: !this.state.isOpenModalRecipience,
                    modalSendToPreviewImage: modal,
                    previewImageUrl: imageData,
                    userDataTyping: specialtyData,
                });

                break;
            default:
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    previewImageUrl: '',
                });
        }
    };
    closeModalPreviewImage = (modal = this.state.modalSendToPreviewImage) => {
        switch (modal) {
            case 'isOpenModalUser':
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    isOpenModalRecipience: !this.state.isOpenModalRecipience,
                    modalSendToPreviewImage: '',
                    previewImageUrl: '',
                });
                break;
            default:
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    previewImageUrl: '',
                });
        }
    };
    handleSendInvoiceAndRecipience = async (patientData) => {
        this.setState({
            isActiveLoadingOverlay: true,
        });
        let res = await postSendInvoiceAndRecipience(patientData);
        if (res && res.errCode === 0) {
            this.setState({
                isActiveLoadingOverlay: false,
                patientSelected: {},
                isOpenModalRecipience: false,
            });
            let formatDate = new Date().getTime();
            await this.props.loadListPatientByDoctorTime(
                this.props.userInfo.id,
                formatDate
            );
            this.notify(res.errMessageVi, res.errType);
        }
    };

    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        let _currentDate = new Date();
        let { listPatient, currentDate } = this.state;
        let { language } = this.props;
        return (
            <Fragment>
                <ToastContainer />
                <SendInvoiceAndRecipience
                    isOpen={this.state.isOpenModalRecipience}
                    toggleModalRecipience={this.toggleModalRecipience}
                    patientSelected={this.state.patientSelected}
                    handleSendInvoiceAndRecipience={
                        this.handleSendInvoiceAndRecipience
                    }
                    togglePreviewFormManagerAppointment={
                        this.openModalPreviewImage
                    }
                />
                <ModalPreviewImage
                    isOpen={this.state.isOpenModalPreviewImage}
                    toggleFormParent={this.closeModalPreviewImage}
                    previewImage={this.state.previewImageUrl}
                />
                <LoadingOverlay
                    active={this.state.isActiveLoadingOverlay}
                    spinner
                    text='Sending data. Please wait!'
                >
                    <div className='manage-schedule-container'>
                        <div className='manage-schedule-title title'>
                            <FormattedMessage id='menu.doctor.manage-appointment' />
                        </div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='admin.manage-schedule.choose-date' />
                                    </label>
                                    <DatePicker
                                        className='form-control'
                                        onChange={this.handleOnChangeDate}
                                        minDate={_currentDate.setDate(
                                            _currentDate.getDate() - 1
                                        )}
                                        value={currentDate}
                                    />
                                </div>
                            </div>
                            <div className='users-table mt-4'>
                                <table>
                                    <tr>
                                        <th>
                                            <FormattedMessage id='admin.manage-user.first-name' />
                                        </th>
                                        <th>
                                            <FormattedMessage id='admin.manage-user.last-name' />
                                        </th>
                                        <th>
                                            <FormattedMessage id='admin.manage-user.phone' />
                                        </th>
                                        <th>Lý do khám</th>
                                        <th>Giờ khám</th>
                                        <th>Phái</th>
                                        <th>
                                            <FormattedMessage id='admin.manage-user.actions' />
                                        </th>
                                    </tr>
                                    {listPatient &&
                                        listPatient.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .firstName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .lastName
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .phoneNumber
                                                        }
                                                    </td>
                                                    <td>{item.reason}</td>
                                                    <td>
                                                        {
                                                            item.timeTypeData
                                                                .valueVi
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item.patientData
                                                                .genderData
                                                                .valueVi
                                                        }
                                                    </td>
                                                    <td>
                                                        <button
                                                            className='pencil'
                                                            onClick={() =>
                                                                this.toggleModalRecipience(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            <i className='fas fa-envelope'></i>
                                                        </button>
                                                        <button className='trash'>
                                                            <i className='fas fa-trash'></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </table>
                            </div>
                        </div>
                    </div>
                </LoadingOverlay>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        listPatientRedux: state.admin.getListPatientByDoctorTimeTypeDataInfo,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadListPatientByDoctorTime: (doctorId, date) =>
            dispatch(actions.loadListPatientByDoctorTimeStart(doctorId, date)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
