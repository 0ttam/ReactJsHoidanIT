import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
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
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
    }

    render() {
        let language = this.props.language;
        let role = this.state.roleArr;
        let position = this.state.positionArr;
        let genders = this.state.genderArr;
        console.log('check props from react', genders);
        return (
            <div className='user-redux-container'>
                <div className='title'>Manage User Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 title'>
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
    return { language: state.app.language, genderRedux: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
