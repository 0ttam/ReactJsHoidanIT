import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import '../UserManage.scss';
import ModalUserRedux from './ModalUserRedux';
import ModalDeleteUserRedux from './ModalDeleteUserRedux';
import ModalEditUserRedux from './ModalEditUserRedux';
import axios from 'axios';
import logger from 'redux-logger';
import { emitter } from '../../../utils/emitter';

import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';
import '../UserManage.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserManageRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            arrGenders: [],
            arrRoles: [],
            arrPositions: [],
            isOpenModalUser: false,
            isOpenModalDeleteUser: false,
            isOpenModalUpdateUser: false,
            userDelete: '',
            userUpdate: '',

            updateUserNotifications: {},
            createUserNotifications: {},
            deleteUserNotifications: {},
        };
    }
    async componentDidMount() {
        await this.props.getAllUserStart();

        await this.props.getGenderStart();
        await this.props.getPositionStart();
        await this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrUsers !== this.props.arrUsers) {
            let userArr = this.props.arrUsers;
            this.setState({
                arrUsers: userArr,
            });
        }
        if (prevProps.arrGenders !== this.props.arrGenders) {
            console.log('father arGender', this.props.arrGenders);
            this.setState({
                arrGenders: this.props.arrGenders,
            });
        }
        if (prevProps.arrRoles !== this.props.arrRoles) {
            this.setState({
                arrRoles: this.props.arrRoles,
            });
        }
        if (prevProps.arrPositions !== this.props.arrPositions) {
            this.setState({
                arrPositions: this.props.arrPositions,
            });
        }
        if (
            prevProps.updateUserNotifications !==
            this.props.updateUserNotifications
        ) {
            this.setState({
                updateUserNotifications: this.props.updateUserNotifications,
            });
        }

        if (
            prevProps.createUserNotifications !==
            this.props.createUserNotifications
        ) {
            this.setState({
                createUserNotifications: this.props.createUserNotifications,
            });
        }

        if (
            prevProps.deleteUserNotifications !==
            this.props.deleteUserNotifications
        ) {
            this.setState({
                deleteUserNotifications: this.props.deleteUserNotifications,
            });
        }
    }
    // Notification
    notify = (message, type) => toast(message, { autoClose: 2000, type: type });
    // Handles
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };
    toggleModalUser = async () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
        await this.props.getGenderStart();
        await this.props.getPositionStart();
        await this.props.getRoleStart();
    };
    toggleModalUpdateUser = () => {
        this.setState({
            isOpenModalUpdateUser: !this.state.isOpenModalUpdateUser,
        });
    };
    toggleModalDeleteUser = () => {
        this.setState({
            isOpenModalDeleteUser: !this.state.isOpenModalDeleteUser,
        });
    };
    createNewUser = async (dataInput) => {
        try {
            await this.props.createNewUser(dataInput);
            this.setState({
                isOpenModalUser: false,
            });
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
            this.notify(
                this.state.createUserNotifications.vi,
                this.state.createUserNotifications.errType
            );
        } catch (error) {
            console.log(error);
        }
    };
    handleDeleteUser = async () => {
        await this.props.deleteUser(this.state.userDelete.id);
        this.setState({
            isOpenModalDeleteUser: false,
        });
        this.notify(
            this.state.deleteUserNotifications.vi,
            this.state.deleteUserNotifications.errType
        );
    };
    openModalDeleteUser = async (user) => {
        this.setState({
            isOpenModalDeleteUser: true,
            userDelete: user,
        });
    };
    updateUser = async (data) => {
        try {
            // call Api request modal
            await this.props.editUser(data);
            this.setState({
                isOpenModalUpdateUser: false,
            });
            this.notify(
                this.state.updateUserNotifications.vi,
                this.state.updateUserNotifications.errType
            );
        } catch (error) {
            console.log(error);
        }
    };
    openModalUpdateUser = (user) => {
        this.setState({
            isOpenModalUpdateUser: true,
            userUpdate: user,
        });
        // emitter.emit('TRANSFER_DATA_EDIT_USER', { data: user });
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ToastContainer />
                <ModalUserRedux
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                    fetchGender={this.state.arrGenders}
                    fetchRole={this.state.arrRoles}
                    fetchPosition={this.state.arrPositions}
                />
                <ModalDeleteUserRedux
                    isOpen={this.state.isOpenModalDeleteUser}
                    toggleFormParent={this.toggleModalDeleteUser}
                    deleteUser={this.handleDeleteUser}
                    user={this.state.userDelete}
                />
                <ModalEditUserRedux
                    isOpen={this.state.isOpenModalUpdateUser}
                    toggleFormParent={this.toggleModalUpdateUser}
                    currentUser={this.state.userUpdate}
                    fetchGender={this.state.arrGenders}
                    fetchRole={this.state.arrRoles}
                    fetchPosition={this.state.arrPositions}
                    updateUser={this.updateUser}
                />

                <div className='title text-center'>Manage users redux</div>
                <div className='mx-4'>
                    {this.state.arrGenders &&
                        this.state.arrGenders.length > 0 && (
                            <button
                                className='btn btn-primary px-3'
                                onClick={() => this.handleAddNewUser()}
                            >
                                <i className='fas fa-plus'></i> Add new users
                            </button>
                        )}
                </div>
                <div className='users-table mt-4 mx-4'>
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className='pencil'
                                                onClick={() =>
                                                    this.openModalUpdateUser(
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
        arrUsers: state.admin.arrUsers,
        arrGenders: state.admin.genders,
        arrRoles: state.admin.roles,
        arrPositions: state.admin.positions,

        updateUserNotifications: state.admin.updateUserNotifications,
        createUserNotifications: state.admin.createUserNotifications,
        deleteUserNotifications: state.admin.deleteUserNotifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUserStart: () => dispatch(actions.fetchAllUserStart('ALL')),

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUserStart(data)),
        deleteUser: (data) => dispatch(actions.deleteUserStart(data)),
        editUser: (data) => dispatch(actions.editUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
