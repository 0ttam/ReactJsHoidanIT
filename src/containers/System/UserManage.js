import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import './UserManage.scss';
import {
    handleGetAllUsers,
    handleCreateUser,
} from '../../services/userService';
import ModalUser from './ModalUser';
import axios from 'axios';
import logger from 'redux-logger';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }
    getAllUserFromReact = async () => {
        let response = await handleGetAllUsers('ALL');
        this.setState({
            arrUsers: response.users,
        });
    };
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        });
    };

    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        });
    };
    createNewUser = async (data) => {
        try {
            let response = await handleCreateUser(data);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalUser: false,
                });
                this.getAllUserFromReact();
                alert('Successfully added!');
            } else {
                alert(response.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleModalUser}
                    createNewUser={this.createNewUser}
                />
                <div className='title text-center'>Manage users</div>
                <div className='mx-4'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className='fas fa-plus'></i> Add new users
                    </button>
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
                                            <button className='pencil'>
                                                <i className='fas fa-pencil-alt'></i>
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
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
