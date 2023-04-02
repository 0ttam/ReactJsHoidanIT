import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import { LANGUAGES } from '../../../utils/constant';
import './ModelUserRedux.scss';
import * as actions from '../../../store/actions/adminAction';
import { isEmpty } from 'lodash';
import CommonUtils from '../../../utils/CommonUtils';
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
        };
    }
    componentDidMount() {
        this.props.loadAllDoctor();
        let arrDoctor = this.handleConvertInputSelection(
            this.props.allDoctorRedux
        );
        this.setState({
            doctorArray: arrDoctor,
        });
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
    }
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({ contentHTML: html, contentMarkdown: text });
    };

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };
    handleOnChangeDesc = (event) => {
        this.setState({ description: event.target.value });
        console.log('description', this.state.description);
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
                id: '',
                contentMarkdown: '',
                contentHTML: '',
                description: '',
            })
            this.notify(
                this.state.detailInfoNotifications.vi,
                this.state.detailInfoNotifications.errType
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
    toggle = () => {
        this.props.toggle();
    };
    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        let option = this.state.selectedDoctor;
        // console.log('arr', option);
        console.log('doc arr ....', this.props.allDoctorRedux);
        return (
            <Fragment>
                <ToastContainer />
                <div className='title'>Add more Info doctor</div>
                <div className='modal-add-detail-doctor-container col-12'>
                    <div className='content-left form-group col-5'>
                        <label> Choose a Doctor </label>
                        <Select
                            options={this.state.doctorArray}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='content-right form-group col-7'>
                        <label>Description </label>
                        <textArea
                            className='form-control'
                            rows='4'
                            value={this.state.description}
                            onChange={(event) => this.handleOnChangeDesc(event)}
                        />
                    </div>
                </div>
                <div className='markdown-wrap form-group col-12'>
                    <label>Detail Doctor info</label>
                    <MdEditor
                        style={{ height: '330px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                </div>
                <div>
                    <button onClick={this.handleSaveChangeDoctor}>Save</button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor,
        detailInfoNotifications: state.admin.detailInfoDoctorNotifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadAllDoctor: () => dispatch(actions.fetchAllDoctorStart()),
        saveDetailInfoDoctor: (dataInput) =>
            dispatch(actions.postDetailInfoDoctorStart(dataInput)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddDetailDoctor);
