import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../../store/actions/adminAction';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './ModalBooking.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { stringify } from 'react-auth-wrapper/helpers';

class ModalBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {}

    toggle = () => {
        this.props.toggle();
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className='modal-booking-container'
                size='lg'
                centered
            >
                <div className='modal-booking-content'>
                    <div className='modal-booking-header'>
                        <span className='left'>
                            Thông tin đặt lịch khám bệnh
                        </span>
                        <span
                            className='right'
                            onClick={() => {
                                this.toggle();
                            }}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='modal-booking-body'>
                        {/* {JSON.stringify(this.props.scheduleSelected)} */}
                        <div className='doctor-info'></div>
                        <div className='price'>Gía khám: 500000VND</div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Ho Ten</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>So dien thoai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-5 form-group'>
                                <label>Dia chi email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-7 form-group'>
                                <label>Dia chi lien he</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Gioi tinh</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Nam sinh</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Dat cho ai</label>
                                <input className='form-control' />
                            </div>

                            <div className='col-12 form-group'>
                                <label>Ly do kham</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='modal-booking-footer'>
                        <button className='btn-booking-cancel'>Cancel</button>
                        <button className='btn-booking-confirm'>Confirm</button>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
