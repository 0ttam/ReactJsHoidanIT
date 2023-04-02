import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import '../UserManage.scss';
import ModalUserRedux from './ModalUserRedux';
import ModalDeleteUserRedux from './ModalDeleteUserRedux';
import ModalEditUserRedux from './ModalEditUserRedux';
import ModalPreviewImage from './ModalPreviewImage';

import { emitter } from '../../../utils/emitter';

import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';
import '../UserManage.scss';
import './ModelUserRedux.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react';
import ModalAddDetailDoctor from './ModalAddDetailDoctor';

class UserManageRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalDetailDoctor: true,
        };
    }
    async componentDidMount() {}
    componentDidUpdate(prevProps, prevState, snapshot) {}
    // Notification
    notify = (message, type) => toast(message, { autoClose: 2000, type: type });
    // Handles
    toggle = () => {
        this.setState = {
            isOpenModalDetailDoctor: !this.state.isOpenModalDetailDoctor,
        };
    };

    render() {
        return (
            <Fragment>
                <ModalAddDetailDoctor
                    isOpen={this.state.isOpenModalDetailDoctor}
                    toggle={this.toggle}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
