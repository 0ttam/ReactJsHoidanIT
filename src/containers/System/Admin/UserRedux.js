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
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
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
            });
        }
    };
    openPreviewImage = () => {
        this.setState({ isOpen: true });
    };

    render() {
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let genders = this.state.genderArr;
        let isLoadingGender = this.props.isLoadingGender;
        let isLoadingPosition = this.props.isLoadingPosition;
        let isLoadingRole = this.props.isLoadingRole;

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
                                <input type='email' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.password' />
                                </label>
                                <input
                                    type='password'
                                    className='form-control'
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.first-name' />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.last-name' />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.phone' />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-9'>
                                <label>
                                    <FormattedMessage id='manage-user.address' />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-3'>
                                <label>
                                    <FormattedMessage id='manage-user.gender' />
                                </label>
                                <select className='form-control'>
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((items, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={items.valueVi}
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
                                <select className='form-control'>
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((items, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={items.valueVi}
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
                                <select className='form-control'>
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((items, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={items.valueVi}
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
                                    <div
                                        className='preview-image'
                                        style={{
                                            backgroundImage: `url(${this.state.previewImageUrl})`,
                                        }}
                                        onClick={() => {
                                            this.openPreviewImage();
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary mt-3'>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
