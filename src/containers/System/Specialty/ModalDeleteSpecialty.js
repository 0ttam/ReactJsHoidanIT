import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';

class ModalDeleteSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImageUrl: '',
            isOpen: false,
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
                deleteSpecialty={() => this.deleteSpecialty()}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    <FormattedMessage id='manage-user.add' />
                </ModalHeader>
                <ModalBody>
                    <div className='modal-user-body col-12'>
                        Bạn chắc chắn xóa chuyên khoa:
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
                        onClick={() => this.props.deleteSpecialty()}
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
)(ModalDeleteSpecialty);
