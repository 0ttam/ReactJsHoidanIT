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
            //Save to Markdown table
            listDoctor: '',
            selectedDoctor: '',
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            detailInfoNotifications: {},
            updateDetailInfoNotification: {},
            isUpdate: false,

            // Save Doctor_info table
            listPrice: [],
            listProvince: [],
            listPayment: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }
    componentDidMount() {
        this.props.loadAllDoctor();
        this.props.fetchPriceDoctor();
        this.props.fetchProvinceDoctor();
        this.props.fetchPaymentDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctorRedux !== this.props.allDoctorRedux) {
            let arrDoctor = this.handleConvertInputSelection(
                this.props.allDoctorRedux
            );
            this.setState({
                listDoctor: arrDoctor,
            });
        }
        if (prevProps.language !== this.props.language) {
            let arrDoctor = this.handleConvertInputSelection(
                this.props.allDoctorRedux
            );
            let dataSelectPrice = this.handleBuiltSelection(
                this.props.listPriceDoctorRedux
            );
            let dataSelectProvince = this.handleBuiltSelection(
                this.props.listProvinceDoctorRedux
            );
            let dataSelectPayment = this.handleBuiltSelection(
                this.props.listPaymentDoctorRedux
            );
            this.setState({
                listDoctor: arrDoctor,
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPayment: dataSelectPayment,
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
            this.setState({
                updateDetailInfoNotification:
                    this.props.updateDetailInfoNotificationRedux,
            });
        }
        if (
            prevProps.listPriceDoctorRedux !== this.props.listPriceDoctorRedux
        ) {
            let dataSelectPrice = this.handleBuiltSelection(
                this.props.listPriceDoctorRedux
            );
            this.setState({
                listPrice: dataSelectPrice,
            });
        }
        if (
            prevProps.listProvinceDoctorRedux !==
            this.props.listProvinceDoctorRedux
        ) {
            let dataSelectProvince = this.handleBuiltSelection(
                this.props.listProvinceDoctorRedux
            );
            this.setState({
                listProvince: dataSelectProvince,
            });
        }
        if (
            prevProps.listPaymentDoctorRedux !==
            this.props.listPaymentDoctorRedux
        ) {
            let dataSelectPayment = this.handleBuiltSelection(
                this.props.listPaymentDoctorRedux
            );
            this.setState({
                listPayment: dataSelectPayment,
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
    handleBuiltSelection = (dataInput) => {
        let result = [];
        let language = this.props.language;
        if (dataInput && dataInput.length > 0) {
            // eslint-disable-next-line array-callback-return
            dataInput.map((item, index) => {
                let Object = {};
                let nameVi = `${item.valueVi}`;
                let nameEn = `${item.valueEn}`;
                Object.label = language === LANGUAGES.EN ? nameEn : nameVi;
                Object.id = item.id;
                result.push(Object);
            });
        }
        return result;
    };

    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        console.log('listPrice', this.state.listPrice);
        console.log('listPayment', this.state.listPayment);
        console.log('listProvince', this.state.listProvince);
        let {
            listPrice,
            listPayment,
            listProvince,
            selectedPrice,
            selectedProvince,
            selectedPayment,
        } = this.state;
        return (
            <div className='modal-add-detail-doctor-container'>
                <ToastContainer />
                <div className='title'>
                    <FormattedMessage id='admin.manage-doctor.title' />
                </div>
                <div className='modal-add-detail-doctor col-12'>
                    <div className='content-left form-group col-4'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.choose-a-doctor' />
                                :
                            </b>
                        </label>
                        <Select
                            options={this.state.listDoctor}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            placeholder='Chọn bác sĩ'
                        />
                    </div>
                    <div className='content-right form-group col-8'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.description' />
                                :
                            </b>{' '}
                        </label>
                        <textarea
                            className='form-control'
                            rows='4'
                            value={this.state.description}
                            onChange={(event) => this.handleOnChangeDesc(event)}
                        />
                    </div>
                </div>
                <div className='more-info-extra col-12 row'>
                    <div className='form-group col-4'>
                        <label>Chon gia</label>
                        <Select
                            options={listPrice}
                            value={selectedPrice}
                            onChange={this.handleChange}
                            placeholder='Chọn giá khám'
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Chon phuong thuc thanh toan</label>
                        <Select
                            options={listPayment}
                            value={selectedPayment}
                            onChange={this.handleChange}
                            placeholder='Chọn phương thức thanh toán'
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Chon tinh thanh</label>
                        <Select
                            options={listProvince}
                            value={selectedProvince}
                            onChange={this.handleChange}
                            placeholder='Chọn tỉnh/thành'
                        />
                    </div>
                    <div className='form-group col-4'>
                        <label>Ten phong kham</label>
                        <input className='form-control'></input>
                    </div>
                    <div className='form-group col-4'>
                        <label>Dia chi phong kham</label>
                        <input className='form-control'></input>
                    </div>
                    <div className='form-group col-4'>
                        <label>Note</label>
                        <input className='form-control'></input>
                    </div>
                </div>
                <div className='markdown-wrap form-group col-12'>
                    <label>
                        <b>
                            <FormattedMessage id='admin.manage-doctor.detail-doctor-info' />
                            :
                        </b>
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
            </div>
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
        listPriceDoctorRedux: state.admin.listPriceDoctor,
        listProvinceDoctorRedux: state.admin.listProvinceDoctor,
        listPaymentDoctorRedux: state.admin.listPaymentDoctor,
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
        fetchPriceDoctor: () =>
            dispatch(actions.fetchPriceDoctorStart('PRICE')),
        fetchProvinceDoctor: () =>
            dispatch(actions.fetchProvinceDoctorStart('PROVINCE')),
        fetchPaymentDoctor: () =>
            dispatch(actions.fetchPaymentDoctorStart('PAYMENT')),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddDetailDoctor);
