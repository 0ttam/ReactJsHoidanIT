import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import * as actions from '../../../../store/actions/adminAction';
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './SendInvoiceAndRecipience.scss';
import CommonUtils from '../../../../utils/CommonUtils';


class SendInvoiceAndRecipience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientData: {},
            previewImageUrl: '',
            image: Blob,
            
        };
    }
    componentDidMount() {}
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.patientSelected !== this.props.patientSelected &&
            this.props.patientSelected
        ) {
            this.setState({
                patientData: this.props.patientSelected,
            });
        }
    }
    toggle = () => {
        this.props.toggleModalRecipience();
    };
    handleSendInvoiceAndRecipience = async () => {
        let { patientData, image } = this.state;
        if (
            patientData &&
            patientData.patientData &&
            patientData.patientData.email &&
            patientData.patientData.id
        ) {
            
            await this.props.handleSendInvoiceAndRecipience({
                patientId: patientData.patientData.id,
                patientEmail: patientData.patientData.email,
                attachImage: image,
                languages: 'en',
            });
            
        }
    };
    toggle = () => {
        this.props.toggleModalRecipience();
    };
    handleImageChange = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (data) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageUrl: objectUrl,
                image: base64,
            });
        }
    };
    openPreviewImage = () => {
        this.props.togglePreviewFormManagerAppointment(
            this.state.previewImageUrl,
            'isOpenModalUser',
            {
                image: this.state.image,
            }
        );
    };

    render() {
        let { patientData } = this.state;
        return (
            <div>
                
                    <Modal
                        isOpen={this.props.isOpen}
                        toggle={() => this.toggle()}
                        className={'modal-specialty-container'}
                        size='lg'
                    >
                        <ModalHeader toggle={() => this.toggle()}>
                            {/* <FormattedMessage id='manage-user.add' /> */}
                            Gửi hóa đơn, đơn thuốc cho bệnh nhân
                        </ModalHeader>
                        <ModalBody>
                            <div className='modal-send-invoice-recipience'>
                                <div>
                                    Gửi hóa đơn, đơn thuốc cho bệnh nhân{' '}
                                    <b>
                                        {patientData &&
                                            patientData.patientData &&
                                            patientData.patientData
                                                .lastName}{' '}
                                        {patientData &&
                                            patientData.patientData &&
                                            patientData.patientData.firstName}
                                    </b>
                                </div>
                                <div>
                                    email :{' '}
                                    <b>
                                        {patientData &&
                                            patientData.patientData &&
                                            patientData.patientData.email}
                                    </b>
                                </div>
                                <div className='input-container col-6 form-group'>
                                    <label>
                                        <FormattedMessage id='admin.manage-user.image' />
                                    </label>
                                    <div className='image-container'>
                                        <span className='upload-image'>
                                            <input
                                                type='file'
                                                id='load-image'
                                                hidden
                                                onChange={(event) =>
                                                    this.handleImageChange(
                                                        event
                                                    )
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
                                onClick={() =>
                                    this.handleSendInvoiceAndRecipience()
                                }
                            >
                                Send
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SendInvoiceAndRecipience);
