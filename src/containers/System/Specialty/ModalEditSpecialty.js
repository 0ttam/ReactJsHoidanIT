import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions/adminAction';
import { isEmpty } from 'lodash';
import CommonUtils from '../../../utils/CommonUtils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageSpecialty.scss';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalEditUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            previewImageUrl: '',
            nameVi: '',
            contentHTML: '',
            contentMarkdown: '',
            image: Blob,
        };
        // this.listenToEmitter();
    }
    // listenToEmitter() {
    //     emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
    //         //reset state
    //         this.setState({
    //             email: '',
    //             password: '',
    //             firstName: '',
    //             lastName: '',
    //             phoneNumber: '',
    //             address: '',
    //             gender: '',
    //             roleId: '',
    //             positionId: '',
    //             image: '',
    //         });
    //     });
    // }
    // bus event

    componentDidMount() {
        let imageBase64 = '';
        if (this.props.currentSpecialty.image) {
            imageBase64 = Buffer.from(
                this.props.currentSpecialty.image,
                'base64'
            ).toString('binary');
        }
        this.setState({
            nameVi: this.props.currentSpecialty.nameVi,
            contentHTML: this.props.currentSpecialty.contentHTML,
            contentMarkdown: this.props.currentSpecialty.contentMarkdown,
            previewImageUrl: imageBase64,
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentSpecialty !== this.props.currentSpecialty) {
            let imageBase64 = '';
            if (this.props.currentSpecialty.image) {
                imageBase64 = Buffer.from(
                    this.props.currentSpecialty.image,
                    'base64'
                ).toString('binary');
            }
            this.setState({
                nameVi: this.props.currentSpecialty.nameVi,
                contentHTML: this.props.currentSpecialty.contentHTML,
                contentMarkdown: this.props.currentSpecialty.contentMarkdown,
                previewImageUrl: imageBase64,
            });
        }
    }
    // componentWillUnmount
    // componentDidCatch
    // shouldComponentUpdate
    toggle = () => {
        this.props.toggleFormParent();
        this.setState({
            genderArr: this.props.fetchGender,
            positionArr: this.props.fetchPosition,
            roleArr: this.props.fetchRole,
        });
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
        this.props.togglePreviewFormUser(
            this.state.previewImageUrl,
            'isOpenModalUpdateSpecialty',
            this.props.currentSpecialty
        );
    };

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };
    handleValidateInput = () => {
        let isValid = true;
        let arrInput = ['nameVi', 'image', 'contentMarkdown', 'contentHTML'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parameter: ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };
    handleUpdateSpecialty = () => {
        let isValid = this.handleValidateInput();
        if (isValid === true) {
            // call Api request modal
            this.props.updateSpecialty({
                id: this.props.currentSpecialty.id,
                nameVi: this.state.nameVi,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                image: this.state.image,
            });
        }
    };
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({ ...stateCopy });
        console.log('handle text on change', stateCopy);
    };
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({ contentHTML: html, contentMarkdown: text });
    };

    render() {
        let languages = this.props.languages;
        let { previewImageUrl, nameVi } = this.state;

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-specialty-container'}
                size='lg'
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Thay đổi thông tin chuyên khoa
                </ModalHeader>
                <ModalBody>
                    <div className='modal-specialty-body row'>
                        <div className='col-6 form-group'>
                            <label>
                                <b>Tên chuyên khoa</b>
                            </label>
                            <input
                                className='form-control'
                                value={nameVi}
                                onChange={(event) =>
                                    this.handleOnChangeText(event, 'nameVi')
                                }
                            ></input>
                        </div>
                        <div className='input-container col-6 form-group'>
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
                            {previewImageUrl && (
                                <div
                                    className='preview'
                                    style={{
                                        cursor: 'pointer',
                                        marginLeft: '90px',
                                        marginTop: '-50px',
                                        height: '56px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                        backgroundImage: `url(${previewImageUrl})`,
                                    }}
                                    onClick={() => {
                                        this.openPreviewImage();
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className='markdown-wrap form-group col-12'>
                            <label>
                                <b>Chi tiết chuyên khoa</b>
                            </label>
                            <MdEditor
                                style={{ height: '346px' }}
                                value={this.state.contentMarkdown}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color='primary'
                        className='px-3'
                        onClick={() => this.handleUpdateSpecialty()}
                    >
                        Cập nhật
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
        languages: state.app.language,

        isLoadingGender: state.admin.isLoadingGender,
        isLoadingPosition: state.admin.isLoadingPosition,
        isLoadingRole: state.admin.isLoadingRole,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUserRedux);
