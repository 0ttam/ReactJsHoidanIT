import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import './ModelUserRedux.scss';
import * as actions from '../../../store/actions/adminAction';

class ModalDeleteUserRedux extends Component {
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

    toggle = () => {
        this.props.toggleFormParent();
    };

    render() {
        let language = this.props.language;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                deleteUser={() => this.deleteUser()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id='manage-user.add' />
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body col-12'>
                        Bạn chắc chắn xóa người dùng:
                        <b>
                            {' '}
                            {this.props.user.firstName}{' '}
                            {this.props.user.lastName}
                        </b>
                        ?
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => this.props.deleteUser()}
                    >
                        Vẫn xóa
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalDeleteUserRedux);
