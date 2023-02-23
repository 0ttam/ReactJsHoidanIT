import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { getAllCodeServices } from '../../../services/allCodeService';
import { LANGUAGES } from '../../../utils/constant';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
        };
    }

    async componentDidMount() {
        try {
            let resGender = await getAllCodeServices('gender');
            if (resGender && resGender.errCode === 0) {
                this.setState({
                    genderArr: resGender.data,
                });
            }
            let resRole = await getAllCodeServices('role');
            if (resRole && resRole.errCode === 0) {
                this.setState({
                    roleArr: resRole.data,
                });
            }
            let positionArr = await getAllCodeServices('position');
            if (positionArr && positionArr.errCode === 0) {
                this.setState({
                    positionArr: positionArr.data,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let role = this.state.roleArr;
        let position = this.state.positionArr;
        return (
            <div className='user-redux-container'>
                <div className='title'>Manage User Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <FormattedMessage id='manage-user.add' />
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
                            <div className='col-2'>
                                <label>
                                    <FormattedMessage id='manage-user.gender' />
                                </label>
                                <select className='form-control'>
                                    <option>Choose...</option>
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
                            <div className='col-2'>
                                <label>
                                    <FormattedMessage id='manage-user.role-id' />
                                </label>
                                <select className='form-control'>
                                    <option>Choose...</option>
                                    {role &&
                                        role.length > 0 &&
                                        role.map((items, index) => {
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
                            <div className='col-2'>
                                <label>
                                    <FormattedMessage id='manage-user.position-id' />
                                </label>
                                <select className='form-control'>
                                    <option>Choose...</option>
                                    {position &&
                                        position.length > 0 &&
                                        position.map((items, index) => {
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
                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id='manage-user.image' />
                                </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary mt-3'>
                                    <FormattedMessage id='manage-user.save' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
