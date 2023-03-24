import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';
class ModalUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
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
            previewImageUrl: '',
        };
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                roleId: '',
                positionId: '',
                avatar: '',
                previewImageUrl: '',
            });
        });
    } // bus event

    componentDidMount() {
        setTimeout(() => {
            if (
                !this.props.currentUser &&
                !this.props.currentUser.gender &&
                !this.props.currentUser.roleId &&
                !this.props.currentUser.positionId
            ) {
                this.setState({
                    genderArr: this.props.fetchGender,
                    positionArr: this.props.fetchPosition,
                    roleArr: this.props.fetchRole,
                    gender: this.props.currentUser.gender,
                    roleId: this.props.currentUser.roleId,
                    positionId: this.props.currentUser.positionId,
                });
            } else {
                this.setState({
                    genderArr: this.props.fetchGender,
                    positionArr: this.props.fetchPosition,
                    roleArr: this.props.fetchRole,
                    gender: this.props.fetchGender[0].keyMap,
                    roleId: this.props.fetchRole[0].keyMap,
                    positionId: this.props.fetchPosition[0].keyMap,
                });
            }
        }, 6000);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderArr !== this.props.genderArr) {
            if (
                !this.props.currentUser &&
                !this.props.currentUser.gender &&
                !this.props.currentUser.roleId &&
                !this.props.currentUser.positionId
            ) {
                this.setState({
                    genderArr: this.props.fetchGender,
                    positionArr: this.props.fetchPosition,
                    roleArr: this.props.fetchRole,
                    gender: this.props.currentUser.gender,
                    roleId: this.props.currentUser.roleId,
                    positionId: this.props.currentUser.positionId,
                });
            } else {
                this.setState({
                    genderArr: this.props.fetchGender,
                    positionArr: this.props.fetchPosition,
                    roleArr: this.props.fetchRole,
                    gender: this.props.fetchGender[0].keyMap,
                    roleId: this.props.fetchRole[0].keyMap,
                    positionId: this.props.fetchPosition[0].keyMap,
                });
            }
        }
    }
    toggle = () => {
        this.props.toggleFormParent();
        // this.setState({
        //     genderArr: this.props.fetchGender,
        //     positionArr: this.props.fetchPosition,
        //     roleArr: this.props.fetchRole,
        // });
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
            'isOpenModalUser',
            {
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
            }
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
            'password',
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
    handleValidateOptionInput = () => {
        let initGender = this.props.fetchGender[0].keyMap;
        let initRoleId = this.props.fetchRole[0].keyMap;
        let initPositionId = this.props.fetchPosition[0].keyMap;
        let isValid = true;
        let arrInput = ['gender', 'roleId', 'positionId'];
        let letValueSimilar = [initGender, initRoleId, initPositionId];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                this.setState({ [arrInput[i]]: letValueSimilar[i] });
            }
        }
        return isValid;
    };
    handleSaveUser = async () => {
        await this.handleValidateOptionInput();
        let isValid = await this.handleValidateInput();
        // eslint-disable-next-line no-unused-expressions
        if (isValid === true) {
            // call Api request modal
            this.props.createNewUser({
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
    };

    render() {
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let genders = this.state.genderArr;
        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            gender,
            roleId,
            address,
            positionId,
        } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id='manage-user.add' />
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
                            />
                        </div>
                        <div class='input-container col-6 mb-2'>
                            <label>
                                <FormattedMessage id='manage-user.password' />
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Enter password...'
                                name='password'
                                value={password}
                                onChange={(event) =>
                                    this.handleOnchangeInput(event, 'password')
                                }
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
                                                    gender === items.keyMapMap
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
                            </div>
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
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => this.handleSaveUser()}
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
    return {
        language: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserRedux);
