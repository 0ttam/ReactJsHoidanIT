import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import './ModelUserRedux.scss';
import * as actions from '../../../store/actions/adminAction';
import './ModalAddDetailDoctor.scss';
import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Fragment } from 'react';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ModalAddDetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArray: '',
            selectedDoctor: '',
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            detailInfoNotifications: {},
            updateDetailInfoNotification: {},
            isUpdate: false,
        };
    }
    componentDidMount() {
        this.props.loadAllDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let arrDoctor = this.handleConvertInputSelection(
                this.props.allDoctorRedux
            );
            this.setState({
                doctorArray: arrDoctor,
            });
        }
        if (prevProps.language !== this.props.language) {
            let arrDoctor = this.handleConvertInputSelection(
                this.props.allDoctorRedux
            );
            this.setState({
                doctorArray: arrDoctor,
            });
        }
        if (
            prevProps.detailInfoNotifications !==
            this.props.detailInfoNotifications
        ) {
            this.setState({
                detailInfoNotifications: this.props.detailInfoNotifications,
            });
        }
        if (
            prevProps.detailInfoDoctorRedux !== this.props.detailInfoDoctorRedux
        ) {
            let detailInfo = this.props.detailInfoDoctorRedux.Markdown;
            if (detailInfo) {
                this.setState({
                    contentMarkdown: detailInfo.contentMarkdown,
                    contentHTML: detailInfo.contentHTML,
                    description: detailInfo.description,
                    isUpdate: true,
                });
            }
        }
        if (
            prevProps.updateDetailInfoNotificationRedux !==
            this.props.updateDetailInfoNotificationRedux
        ) {
            console.log(
                'update notification',
                this.props.updateDetailInfoNotificationRedux
            );
            this.setState({
                updateDetailInfoNotification:
                    this.props.updateDetailInfoNotificationRedux,
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({ contentHTML: html, contentMarkdown: text });
    };

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, async () => {
            this.setState({
                contentMarkdown: '',
                description: '',
                isUpdate: false,
            });
            if (this.state.selectedDoctor && this.state.selectedDoctor.id) {
                let id = this.state.selectedDoctor.id;
                await this.props.loadDetailDoctor(id);
            }
        });
    };
    handleOnChangeDesc = (event) => {
        this.setState({ description: event.target.value });
    };
    handleSaveChangeDoctor = async () => {
        try {
            await this.props.saveDetailInfoDoctor({
                id: this.state.selectedDoctor.id,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                description: this.state.description,
            });
            this.setState({
                selectedDoctor: '',
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                isUpdate: false,
            });
            this.notify(
                this.state.detailInfoNotifications.vi,
                this.state.detailInfoNotifications.errType
            );
        } catch (e) {
            console.log(e);
        }
    };
    handleUpdateDoctor = async () => {
        try {
            await this.props.updateDetailInfoDoctor({
                id: this.state.selectedDoctor.id,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                description: this.state.description,
            });
            this.setState({
                selectedDoctor: '',
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                isUpdate: false,
            });
            this.notify(
                this.state.updateDetailInfoNotification.vi,
                this.state.updateDetailInfoNotification.errType
            );
        } catch (e) {
            console.log(e);
        }
    };
    handleConvertInputSelection = (dataInput) => {
        let result = [];
        let language = this.props.language;
        if (dataInput && dataInput.length > 0) {
            // eslint-disable-next-line array-callback-return
            dataInput.map((item, index) => {
                let Object = {};
                let nameVi = `${item.lastName} ${item.firstName}`;
                let nameEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGES.EN ? nameEn : nameVi;
                Object.id = item.id;
                result.push(Object);
            });
        }
        return result;
    };

    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        console.log('description redux', this.state.description);
        return (
            <Fragment>
                <ToastContainer />
                <div className='title'>Add more Info doctor</div>
                <div className='modal-add-detail-doctor-container col-12'>
                    <div className='content-left form-group col-4'>
                        <label>
                            {' '}
                            <b>Choose a Doctor:</b>{' '}
                        </label>
                        <Select
                            options={this.state.doctorArray}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='content-right form-group col-8'>
                        <label>
                            <b>Description:</b>{' '}
                        </label>
                        <textarea
                            className='form-control'
                            rows='4'
                            value={this.state.description}
                            onChange={(event) => this.handleOnChangeDesc(event)}
                        />
                    </div>
                </div>
                <div className='markdown-wrap form-group col-12'>
                    <label>
                        <b>Detail Doctor info:</b>
                    </label>
                    <MdEditor
                        style={{ height: '346px' }}
                        value={this.state.contentMarkdown}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <div className='button-handle'>
                    {this.state.selectedDoctor.id &&
                    this.state.description &&
                    this.state.contentMarkdown ? (
                        this.state.isUpdate === false ? (
                            <div
                                className='button-save'
                                onClick={this.handleSaveChangeDoctor}
                            >
                                Save
                            </div>
                        ) : (
                            <div
                                className='button-update'
                                onClick={this.handleUpdateDoctor}
                            >
                                Update
                            </div>
                        )
                    ) : (
                        <div className='caution'>
                            Bạn cần điền đủ 3 trường <b>Choose a Doctor</b>{' '}
                            {','} <b>Description</b> {','}{' '}
                            <b>Detail Doctor info</b> trước khi Save hoặc Update
                        </div>
                    )}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor,
        detailInfoDoctorRedux: state.admin.detailInfoDoctor,
        detailInfoNotifications: state.admin.detailInfoDoctorNotifications,
        updateDetailInfoNotificationRedux:
            state.admin.updateDetailInfoDoctorNotifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        loadDetailDoctor: (idDoctor) =>
            dispatch(actions.getDetailInfoDoctorStart(idDoctor)),
        saveDetailInfoDoctor: (dataInput) =>
            dispatch(actions.postDetailInfoDoctorStart(dataInput)),
        updateDetailInfoDoctor: (dataInput) =>
            dispatch(actions.updateDetailInfoDoctorStart(dataInput)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddDetailDoctor);
