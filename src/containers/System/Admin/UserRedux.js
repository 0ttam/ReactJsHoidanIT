import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';

class UserRedux extends Component {
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
            avatar: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender:
                    arrGender && arrGender.length > 0 ? arrGender[0].key : '',
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                positionId:
                    arrPosition && arrPosition.length > 0
                        ? arrPosition[0].key
                        : '',
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                roleId: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
            });
        }
    }

    handleImageChange = (event) => {
        let data = event.target.files;
        if (data) {
            let file = data[0];
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                avatar: file,
            });
        }
    };
    openPreviewImage = () => {
        this.setState({ isOpen: true });
    };
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState }, () => {});
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
            'avatar',
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
    handleSaveUser = () => {
        let isValid = this.handleValidateInput();
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
                    avatar: this.state.avatar,
                    roleId: this.state.roleId,
                    positionId: this.state.positionId,
            });
        }
    };

    render() {
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let genders = this.state.genderArr;
        let isLoadingGender = this.props.isLoadingGender;
        let isLoadingPosition = this.props.isLoadingPosition;
        let isLoadingRole = this.props.isLoadingRole;
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
            <div className='user-redux-container'>
                <div className='title'>Manage User Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 title'>
                                <FormattedMessage id='manage-user.add' />
                            </div>
                            <div className='col-12'>
                                {isLoadingGender === true &&
                                isLoadingPosition === true &&
                                isLoadingRole === true
                                    ? 'Loading Data'
                                    : ''}
                            </div>
                            <div className='col-3'>
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
                            <div className='col-3'>
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
                                        this.handleOnchangeInput(
                                            event,
                                            'password'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-3'>
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
                                        this.handleOnchangeInput(
                                            event,
                                            'firstName'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-3'>
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
                                        this.handleOnchangeInput(
                                            event,
                                            'lastName'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-3'>
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
                            <div className='col-9'>
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
                                        this.handleOnchangeInput(
                                            event,
                                            'address'
                                        )
                                    }
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.gender' />
                                </label>
                                <select
                                    className='form-control'
                                    name='gender'
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'gender'
                                        )
                                    }
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((items, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={items.key}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? items.valueVi
                                                        : items.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.role-id' />
                                </label>
                                <select
                                    className='form-control'
                                    name='roleId'
                                    onChange={(event) =>
                                        this.handleOnchangeInput(
                                            event,
                                            'roleId'
                                        )
                                    }
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((items, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={items.key}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? items.valueVi
                                                        : items.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
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
                                                    value={items.key}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? items.valueVi
                                                        : items.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
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
                                            className='preview-image'
                                            style={{
                                                backgroundImage: `url(${this.state.previewImageUrl})`,
                                            }}
                                            onClick={() => {
                                                this.openPreviewImage();
                                            }}
                                        ></div>
                                    )}
                                </div>
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-primary mt-3'
                                    onClick={() => {
                                        this.handleSaveUser();
                                    }}
                                >
                                    <FormattedMessage id='manage-user.save' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImageUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,

        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,

        dataNewUser: state.admin.dataNewUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
