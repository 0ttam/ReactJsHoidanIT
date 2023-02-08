import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            roleId: '',
            positionId: '',
            image: '',
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                gender: user.gender,
                roleId: user.roleId,
                positionId: user.positionId,
                image: user.image,
            });
        }
    }
    toggle = () => {
        this.props.toggleFormEditParent();
    };
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };
    handleValidateInput = () => {
        let isValid = true;
        let arrInput = [
            'email',
            'firstName',
            'lastName',
            'phoneNumber',
            'gender',
            'roleId',
            'address',
            'image',
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter: ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };
    changeUser = () => {
        let isValid = this.handleValidateInput();
        if (isValid === true) {
            // call Api request modal
            this.props.saveChangeUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                userEdit={this.props.currentUser}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Update user({this.state.email})
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>   
                        <div class='input-container'>
                            <label for='fn'>First name:</label>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Enter first name...'
                                id='fn'
                                name='firstName'
                                value={this.state.firstName}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'firstName')
                                }
                            />
                        </div>
                        <div class='input-container'>
                            <label for='ln'>Last name:</label>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Enter last name...'
                                id='ln'
                                name='lastName'
                                value={this.state.lastName}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'lastName')
                                }
                            />
                        </div>
                        <div class='input-container w-33'>
                            <label for='phoneNumber'>Phone number:</label>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Enter phone Number...'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={this.state.phoneNumber}
                                onChange={(event) =>
                                    this.handleOnchangeInput(
                                        event,
                                        'phoneNumber'
                                    )
                                }
                            />
                        </div>
                        <div class='input-container w-33'>
                            <label for='gender'>Gender:</label>
                            <select
                                class='form-control'
                                id='gender'
                                name='gender'
                                value={this.state.gender === true ? 1 : 0}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'gender')
                                }
                            >
                                <option selected>Choose.....</option>
                                <option value='1'>Male</option>
                                <option value='0'>Female</option>
                            </select>
                        </div>
                        <div class='input-container w-33'>
                            <label for='roleId'>Role ID:</label>
                            <select
                                class='form-control'
                                id='roleId'
                                name='roleId'
                                value={this.state.roleId}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'roleId')
                                }
                            >
                                <option selected>Choose.....</option>
                                <option value='R1'>Admin</option>
                                <option value='R2'>Doctor</option>
                                <option value='R3'>Patient</option>
                            </select>
                        </div>
                        <div class='input-container w-100'>
                            <label for='address'>Address:</label>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Enter address...'
                                id='address'
                                name='address'
                                value={this.state.address}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'address')
                                }
                            />
                        </div>
                        <div class='input-container w-100'>
                            <label for='image'>Image:</label>
                            <input
                                type='text'
                                class='form-control'
                                placeholder='Enter link image...'
                                id='image'
                                name='image'
                                value={this.state.image}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'image')
                                }
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => this.changeUser()}
                    >
                        Save Changes
                    </Button>{' '}
                    <Button
                        color='secondary'
                        className='px-3'
                        onClick={() => this.toggle()}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
