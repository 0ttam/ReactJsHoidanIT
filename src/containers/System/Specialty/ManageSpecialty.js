import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import ModalAddNewSpecialty from './ModalAddNewSpecialty';
import ModalPreviewImage from '../Admin/ModalPreviewImage';
import ModalEditSpecialty from './ModalEditSpecialty';
import ModalDeleteSpecialty from './ModalDeleteSpecialty';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';
import './ManageSpecialty.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserManageRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
            isOpenModalUser: false,
            isOpenModalDeleteUser: false,
            isOpenModalUpdateSpecialty: false,
            isOpenModalPreviewImage: false,
            isOpenLightBox: false,
            previewImageUrl: '',
            specialtyDelete: '',
            specialtyUpdate: '',
            userDataTyping: '',
            modalSendToPreviewImage: '',

            updateUserNotifications: {},
            createUserNotifications: {},
            deleteUserNotifications: {},
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
    toggleModalDeleteUser = () => {
        this.setState({
            isOpenModalDeleteUser: !this.state.isOpenModalDeleteUser,
        });
    };
    createNewSpecialty = async (dataInput) => {
        try {
            await this.props.createNewSpecialty(dataInput);
            this.setState({
                isOpenModalUser: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.notify(
                this.props.languages === LANGUAGES.EN
                    ? this.props.createNewSpecialtyNotifyRedux.en
                    : this.props.createNewSpecialtyNotifyRedux.vi,
                this.props.createNewSpecialtyNotifyRedux.errType
            );
        } catch (error) {
            console.log(error);
        }
    };
    handleDeleteSpecialty = async () => {
        await this.props.deleteSpecialty(this.state.specialtyDelete.id);
        this.setState({
            isOpenModalDeleteUser: false,
        });
        this.notify(
            this.props.languages === LANGUAGES.EN
                ? this.props.deleteSpecialtyNotifyRedux.en
                : this.props.deleteSpecialtyNotifyRedux.vi,
            this.props.deleteSpecialtyNotifyRedux.errType
        );
    };
    openModalDeleteUser = async (user) => {
        this.setState({
            isOpenModalDeleteUser: true,
            specialtyDelete: user,
        });
    };
    updateSpecialty = async (data) => {
        try {
            // call Api request modal
            await this.props.editSpecialty(data);
            this.setState({
                isOpenModalUpdateSpecialty: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.notify(
                this.props.languages === LANGUAGES.EN
                    ? this.props.updateSpecialtyNotifyRedux.en
                    : this.props.updateSpecialtyNotifyRedux.vi,
                this.props.updateSpecialtyNotifyRedux.errType
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
        let arrSpecialty = this.state.arrSpecialty;
        let userDataTyping = this.state.userDataTyping;
        return (
            <div className='manage-specialty-container'>
                <ToastContainer />
                <ModalAddNewSpecialty
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleModalUser}
                    togglePreviewFormUser={this.openModalPreviewImage}
                    createNewSpecialty={this.createNewSpecialty}
                    currentUser={userDataTyping}
                />
                <ModalEditSpecialty
                    isOpen={this.state.isOpenModalUpdateSpecialty}
                    toggleFormParent={this.toggleModalUpdateUser}
                    togglePreviewFormUser={this.openModalPreviewImage}
                    currentSpecialty={this.state.specialtyUpdate}
                    updateSpecialty={this.updateSpecialty}
                />
                <ModalPreviewImage
                    isOpen={this.state.isOpenModalPreviewImage}
                    toggleFormParent={this.closeModalPreviewImage}
                    previewImage={this.state.previewImageUrl}
                />

                <ModalDeleteSpecialty
                    isOpen={this.state.isOpenModalDeleteUser}
                    toggleFormParent={this.toggleModalDeleteUser}
                    deleteSpecialty={this.handleDeleteSpecialty}
                    user={this.state.specialtyDelete}
                />

                <div className='title text-center'>
                    <FormattedMessage id='admin.manage-specialty.manage-specialty' />
                </div>
                <div className='mx-4'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className='fas fa-plus'></i>{' '}
                        <FormattedMessage id='admin.manage-specialty.add-new-specialty' />
                    </button>
                </div>
                <div className='users-table mt-4 mx-4'>
                    <table>
                        <tr>
                            <th>
                                <FormattedMessage id='admin.manage-specialty.name-specialty' />
                            </th>
                            <th>
                                <FormattedMessage id='admin.manage-specialty.actions' />
                            </th>
                        </tr>
                        {arrSpecialty &&
                            arrSpecialty.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.name}</td>
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
        arrSpecialtyRedux: state.admin.getSpecialtyById,
        createNewSpecialtyNotifyRedux: state.admin.createNewSpecialtyNotify,
        updateSpecialtyNotifyRedux: state.admin.updateSpecialtyNotify,
        deleteSpecialtyNotifyRedux: state.admin.deleteSpecialtyNotify,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSpecialty: () => dispatch(actions.getSpecialtyByIdStart('ALL')),

        createNewSpecialty: (data) =>
            dispatch(actions.createNewSpecialtyStart(data)),
        editSpecialty: (data) => dispatch(actions.editSpecialtyStart(data)),
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialtyStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
