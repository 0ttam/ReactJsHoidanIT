import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    componentDidMount() {}
    toggle = () => {
        this.props.toggleFormParent();
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
            'password',
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
    handleAddNewUser = () => {
        let isValid = this.handleValidateInput();
        if (isValid === true) {
            // call Api request modal
            this.props.createNewUser(this.state);
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Create a new user
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div class='input-container'>
                            <label for='email'>Email address:</label>
                            <input
                                type='email'
                                class='form-control'
                                placeholder='Enter email...'
                                id='email'
                                name='email'
                                value={this.state.email}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'email')
                                }
                            />
                        </div>
                        <div class='input-container'>
                            <label for='pwd'>Password:</label>
                            <input
                                type='password'
                                class='form-control'
                                placeholder='Enter password...'
                                id='pwd'
                                name='password'
                                value={this.state.password}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'password')
                                }
                            />
                        </div>
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
                                value={this.state.gender}
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
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add new
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
