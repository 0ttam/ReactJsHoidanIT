import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import './ModelUserRedux.scss';
import * as actions from '../../../store/actions/adminAction';
import { isEmpty } from 'lodash';
import CommonUtils from '../../../utils/CommonUtils';

class ModalEditUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImageUrl: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            roleId: '',
            positionId: '',
            avatar: Blob,
        };
        // this.listenToEmitter();
    }
    // listenToEmitter() {
    //     emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
    //         //reset state
    //         this.setState({
    //             email: '',
    //             password: '',
    //             firstName: '',
    //             lastName: '',
    //             phoneNumber: '',
    //             address: '',
    //             gender: '',
    //             roleId: '',
    //             positionId: '',
    //             avatar: '',
    //         });
    //     });
    // }
    // bus event

    componentDidMount() {
        let imageBase64 = '';
        if (this.props.currentUser.avatar) {
            imageBase64 = Buffer.from(
                this.props.currentUser.avatar,
                'base64'
            ).toString('binary');
        }
        this.setState({
            genderArr: this.props.fetchGender,
            positionArr: this.props.fetchPosition,
            roleArr: this.props.fetchRole,
            gender: this.props.currentUser.gender,
            roleId: this.props.currentUser.roleId,
            positionId: this.props.currentUser.positionId,
            previewImageUrl: imageBase64,
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentUser !== this.props.currentUser) {
            let imageBase64 = '';
            if (this.props.currentUser.avatar) {
                imageBase64 = Buffer.from(
                    this.props.currentUser.avatar,
                    'base64'
                ).toString('binary');
            }
            this.setState({
                email: this.props.currentUser.email,
                password: this.props.currentUser.password,
                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName,
                phoneNumber: this.props.currentUser.phoneNumber,
                address: this.props.currentUser.address,
                genderArr: this.props.fetchGender,
                positionArr: this.props.fetchPosition,
                roleArr: this.props.fetchRole,
                gender: this.props.currentUser.gender,
                roleId: this.props.currentUser.roleId,
                positionId: this.props.currentUser.positionId,
                previewImageUrl: imageBase64,
            });
        }
    }
    // componentWillUnmount
    // componentDidCatch
    // shouldComponentUpdate
    toggle = () => {
        this.props.toggleFormParent();
        this.setState({
            genderArr: this.props.fetchGender,
            positionArr: this.props.fetchPosition,
            roleArr: this.props.fetchRole,
        });
    };

    handleImageChange = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (data) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                avatar: base64,
            });
        }
    };
    openPreviewImage = () => {
        this.props.togglePreviewFormUser(
            this.state.previewImageUrl,
            'isOpenModalUpdateUser',
            this.props.currentUser
        );
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
            'positionId',
            'address',
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
    handleUpdateUser = () => {
        let isValid = this.handleValidateInput();
        if (isValid === true) {
            // call Api request modal
            if (isEmpty(this.state.password)) {
                this.props.updateUser({
                    id: this.props.currentUser.id,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    positionId: this.state.positionId,
                    avatar: this.state.avatar,
                });
            } else {
                this.props.updateUser({
                    id: this.props.currentUser.id,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.roleId,
                    positionId: this.state.positionId,
                    avatar: this.state.avatar,
                });
            }
        }
    };

    render() {
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let genders = this.state.genderArr;
        let gender = this.state.gender;
        let roleId = this.state.roleId;
        let positionId = this.state.positionId;
        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            previewImageUrl,
        } = this.state;

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id='manage-user.edit' />
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body col-12'>
                        <div class='input-container col-6 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.email' />
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Enter email...'
                                name='email'
                                value={email}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'email')
                                }
                                disabled={true}
                            />
                        </div>
                        <div class='input-container col-6 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.password' />
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder=''
                                name='password'
                                value={password}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'password')
                                }
                                disabled={true}
                            />
                        </div>
                        <div class='input-container col-6 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.first-name' />
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter first name...'
                                name='firstName'
                                value={firstName}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'firstName')
                                }
                            />
                        </div>
                        <div class='input-container col-6 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.last-name' />
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter last name...'
                                name='lastName'
                                value={lastName}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'lastName')
                                }
                            />
                        </div>
                        <div class='input-container col-4 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.phone' />
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter phone Number...'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(event) =>
                                    this.handleOnchangeInput(
                                        event,
                                        'phoneNumber'
                                    )
                                }
                            />
                        </div>
                        <div class='input-container col-8 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.address' />
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter address...'
                                name='address'
                                value={address}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'address')
                                }
                            />
                        </div>
                        <div class='input-container col-2 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.gender' />
                            </label>
                            <select
                                className='form-control'
                                name='gender'
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'gender')
                                }
                            >
                                {genders &&
                                    genders.length > 0 &&
                                    genders.map((items, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={items.keyMap}
                                                selected={
                                                    gender === items.keyMap
                                                        ? 'selected'
                                                        : ''
                                                }
                                            >
                                                {language === LANGUAGES.VI
                                                    ? items.valueVi
                                                    : items.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div class='input-container col-3 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.role-id' />
                            </label>
                            <select
                                className='form-control'
                                name='roleId'
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'roleId')
                                }
                            >
                                {roles &&
                                    roles.length > 0 &&
                                    roles.map((items, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={items.keyMap}
                                                selected={
                                                    roleId === items.keyMap
                                                        ? 'selected'
                                                        : ''
                                                }
                                            >
                                                {language === LANGUAGES.VI
                                                    ? items.valueVi
                                                    : items.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div class='input-container col-3 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.position-id' />
                            </label>
                            <select
                                className='form-control'
                                name='positionId'
                                onChange={(event) =>
                                    this.handleOnchangeInput(
                                        event,
                                        'positionId'
                                    )
                                }
                            >
                                {positions &&
                                    positions.length > 0 &&
                                    positions.map((items, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={items.keyMap}
                                                selected={
                                                    positionId === items.keyMap
                                                        ? 'selected'
                                                        : ''
                                                }
                                            >
                                                {language === LANGUAGES.VI
                                                    ? items.valueVi
                                                    : items.valueEn}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <div class='input-container col-4'>
                            <label>
                                <FormattedMessage id='manage-user.image' />
                            </label>
                            <div className='image-container'>
                                <span className='upload-image'>
                                    <input
                                        type='file'
                                        id='load-image'
                                        hidden
                                        onChange={(event) =>
                                            this.handleImageChange(event)
                                        }
                                    />
                                    <label
                                        className='btn-upload'
                                        for='load-image'
                                    >
                                        Tải ảnh
                                        <i class='fas fa-upload'></i>
                                    </label>
                                </span>

                                {this.state.previewImageUrl && (
                                    <div
                                        className='preview'
                                        style={{
                                            cursor: 'pointer',
                                            marginLeft: '90px',
                                            marginTop: '-50px',
                                            height: '56px',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                            backgroundImage: `url(${this.state.previewImageUrl})`,
                                        }}
                                        onClick={() => {
                                            this.openPreviewImage();
                                        }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => this.handleUpdateUser()}
                    >
                        Cập nhật
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
    return {
        language: state.app.language,
        // genderRedux: state.admin.genders,
        // positionRedux: state.admin.positions,
        // roleRedux: state.admin.roles,

        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserRedux);
