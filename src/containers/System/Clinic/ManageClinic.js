import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import ModalAddNewClinic from './ModalAddNewClinic';
import ModalPreviewImage from '../Admin/ModalPreviewImage';
import ModalEditClinic from './ModalEditClinic';
import ModalDeleteClinic from './ModalDeleteClinic';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';
import './ManageClinic.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserManageRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoListClinicById: [],
            isOpenModalUser: false,
            isOpenModalClinicUser: false,
            isOpenModalUpdateSpecialty: false,
            isOpenModalPreviewImage: false,
            isOpenLightBox: false,
            previewImageUrl: '',
            clinicDelete: '',
            specialtyUpdate: '',
            userDataTyping: '',
            modalSendToPreviewImage: '',

            updateUserNotifications: {},
            createNewClinicNotify: {},
            deleteUserNotifications: {},
        };
    }
    async componentDidMount() {
        await this.props.getAllClinic();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.infoListClinicByIdRedux !==
            this.props.infoListClinicByIdRedux
        ) {
            if (
                this.props.infoListClinicByIdRedux &&
                this.props.infoListClinicByIdRedux.data
            ) {
                this.setState({
                    infoListClinicById: this.props.infoListClinicByIdRedux.data,
                });
            }
        }
    }
    // Notification
    notify = (message, type) => toast(message, { autoClose: 2000, type: type });
    // Handles
    handleAddNewUser = (userData) => {
        if (
            this.state.isOpenModalPreviewImage === false &&
            this.state.isOpenModalUpdateSpecialty === false
        ) {
            this.setState({
                isOpenModalUser: true,
            });
        }
    };
    toggleModalUser = async () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    toggleModalUpdateUser = () => {
        this.setState({
            isOpenModalUpdateSpecialty: !this.state.isOpenModalUpdateSpecialty,
        });
    };
    toggleModalDeleteClinic = () => {
        this.setState({
            isOpenModalClinicUser: !this.state.isOpenModalClinicUser,
        });
    };
    createNewClinic = async (dataInput) => {
        try {
            await this.props.createNewClinic(dataInput);
            this.setState({
                isOpenModalUser: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.notify(
                this.props.languages === LANGUAGES.EN
                    ? this.props.createNewClinicNotifyRedux.en
                    : this.props.createNewClinicNotifyRedux.vi,
                this.props.createNewClinicNotifyRedux.errType
            );
        } catch (error) {
            console.log(error);
        }
    };
    handleDeleteClinic = async () => {
        await this.props.deleteClinic(this.state.clinicDelete.id);
        this.setState({
            isOpenModalClinicUser: false,
        });
        this.notify(
            this.props.languages === LANGUAGES.EN
                ? this.props.deleteClinicNotifyRedux.en
                : this.props.deleteClinicNotifyRedux.vi,
            this.props.deleteClinicNotifyRedux.errType
        );
    };
    openModalDeleteUser = async (user) => {
        this.setState({
            isOpenModalClinicUser: true,
            clinicDelete: user,
        });
    };
    updateClinic = async (data) => {
        try {
            // call Api request modal
            await this.props.editClinic(data);
            this.setState({
                isOpenModalUpdateSpecialty: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.notify(
                this.props.languages === LANGUAGES.EN
                    ? this.props.updateClinicNotifyRedux.en
                    : this.props.updateClinicNotifyRedux.vi,
                this.props.updateClinicNotifyRedux.errType
            );
        } catch (error) {
            console.log(error);
        }
    };
    openModalUpdateSpecialty = (user) => {
        this.setState({
            isOpenModalUpdateSpecialty: true,
            specialtyUpdate: user,
        });
        // emitter.emit('TRANSFER_DATA_EDIT_USER', { data: user });
    };
    openModalPreviewImage = (imageData, modal, specialtyData) => {
        switch (modal) {
            case 'isOpenModalUser':
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    isOpenModalUser: !this.state.isOpenModalUser,
                    modalSendToPreviewImage: modal,
                    previewImageUrl: imageData,
                    userDataTyping: specialtyData,
                });

                break;
            case 'isOpenModalUpdateSpecialty':
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    modalSendToPreviewImage: modal,
                    previewImageUrl: imageData,
                    specialtyUpdate: specialtyData,
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
                this.handleAddNewUser(this.state.userDataTyping);
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
                    isOpenModalUser: !this.state.isOpenModalUser,
                    modalSendToPreviewImage: '',
                    previewImageUrl: '',
                });
                break;
            case 'isOpenModalUpdateSpecialty':
                this.openModalUpdateSpecialty(this.state.specialtyUpdate);
                this.setState({
                    isOpenModalPreviewImage:
                        !this.state.isOpenModalPreviewImage,
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

    render() {
        let { infoListClinicById, userDataTyping } = this.state;
        console.log('infoListClinicById', infoListClinicById);
        return (
            <div className='manage-specialty-container'>
                <ToastContainer />
                <ModalAddNewClinic
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleModalUser}
                    togglePreviewFormUser={this.openModalPreviewImage}
                    createNewClinic={this.createNewClinic}
                    currentUser={userDataTyping}
                />
                <ModalEditClinic
                    isOpen={this.state.isOpenModalUpdateSpecialty}
                    toggleFormParent={this.toggleModalUpdateUser}
                    togglePreviewFormUser={this.openModalPreviewImage}
                    currentSpecialty={this.state.specialtyUpdate}
                    updateClinic={this.updateClinic}
                />
                <ModalPreviewImage
                    isOpen={this.state.isOpenModalPreviewImage}
                    toggleFormParent={this.closeModalPreviewImage}
                    previewImage={this.state.previewImageUrl}
                />

                <ModalDeleteClinic
                    isOpen={this.state.isOpenModalClinicUser}
                    toggleFormParent={this.toggleModalDeleteClinic}
                    deleteClinic={this.handleDeleteClinic}
                    clinic={this.state.clinicDelete}
                />

                <div className='title text-center'>Quản lý phòng khám</div>
                <div className='mx-4'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className='fas fa-plus'></i> Thêm mới phòng khám
                    </button>
                </div>
                <div className='users-table mt-4 mx-4'>
                    <table>
                        <tr>
                            <th>Tên phòng khám</th>
                            <th>
                                <FormattedMessage id='admin.manage-specialty.actions' />
                            </th>
                        </tr>
                        {infoListClinicById &&
                            infoListClinicById.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.nameVi}</td>
                                        <td>
                                            <button
                                                className='pencil'
                                                onClick={() =>
                                                    this.openModalUpdateSpecialty(
                                                        item
                                                    )
                                                }
                                            >
                                                <i className='fas fa-pencil-alt'></i>
                                            </button>
                                            <button
                                                className='trash'
                                                onClick={() =>
                                                    this.openModalDeleteUser(
                                                        item
                                                    )
                                                }
                                            >
                                                <i className='fas fa-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        infoListClinicByIdRedux: state.admin.infoListClinicById,
        createNewClinicNotifyRedux: state.admin.createNewClinicNotify,
        updateClinicNotifyRedux: state.admin.editClinicByIdInfo,
        deleteClinicNotifyRedux: state.admin.deleteClinicByIdInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllClinic: () => dispatch(actions.getClinicByIdStart('ALL')),

        createNewClinic: (data) => dispatch(actions.createNewClinicStart(data)),
        editClinic: (data) => dispatch(actions.editClinicStart(data)),
        deleteClinic: (id) => dispatch(actions.deleteClinicStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
