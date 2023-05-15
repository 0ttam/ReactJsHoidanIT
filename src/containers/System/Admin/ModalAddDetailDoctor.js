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
            listClinic: [],
            listSpecialty: [],

            priceId: '',
            provinceId: '',
            paymentId: '',
            specialtyId: '',

            nameClinic: '',
            addressClinic: '',
            selectedClinic: '',
            selectedSpecialty: '',
            note: '',
        };
    }
    componentDidMount() {
        this.props.loadAllDoctor();
        this.props.fetchPriceDoctor();
        this.props.fetchProvinceDoctor();
        this.props.fetchPaymentDoctor();
        this.props.fetchSpecialty();
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
            let doctorInfo = this.props.detailInfoDoctorRedux.Doctor_Info;
            let stateCopy = this.state;
            if (detailInfo) {
                stateCopy['contentMarkdown'] = detailInfo.contentMarkdown;
                stateCopy['contentHTML'] = detailInfo.contentHTML;
                stateCopy['description'] = detailInfo.description;
                stateCopy['isUpdate'] = true;
                this.setState({
                    ...stateCopy,
                });
            } else {
                stateCopy['contentMarkdown'] = '';
                stateCopy['contentHTML'] = '';
                stateCopy['description'] = '';
                this.setState({
                    ...stateCopy,
                });
            }
            if (doctorInfo) {
                let { listPrice, listPayment, listProvince } = this.state;
                let findItemPriceId = listPrice.find((item) => {
                    if (item.value === doctorInfo.priceId) return item.value;
                });
                let findItemPaymentId = listPayment.find((item) => {
                    if (item.value === doctorInfo.paymentId) return item.value;
                });
                let findItemProvinceId = listProvince.find((item) => {
                    if (item.value === doctorInfo.provinceId) return item.value;
                });
                let nameClinic = doctorInfo.nameClinic;
                let addressClinic = doctorInfo.addressClinic;
                let note = doctorInfo.note;
                stateCopy['nameClinic'] = nameClinic;
                stateCopy['addressClinic'] = addressClinic;
                stateCopy['note'] = note;
                stateCopy['priceId'] = findItemPriceId;
                stateCopy['paymentId'] = findItemPaymentId;
                stateCopy['provinceId'] = findItemProvinceId;
                this.setState({
                    ...stateCopy,
                });
            } else {
                this.setState({
                    nameClinic: '',
                    addressClinic: '',
                    note: '',
                    priceId: '',
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
        if (prevProps.listSpecialtyRedux !== this.props.listSpecialtyRedux) {
            let dataSelectSpecialty = this.handleBuiltSelection(
                this.props.listSpecialtyRedux.data
            );
            this.setState({
                listSpecialty: dataSelectSpecialty,
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        console.log('handleEditorChange', html, text);
        this.setState({ contentHTML: html, contentMarkdown: text });
    };

    handleDoctorChange = (selectedDoctor) => {
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
    handleChange = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = this.state;
        stateCopy[stateName] = selectedOption;
        this.setState({ ...stateCopy });
    };
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({ ...stateCopy });
    };
    handleSaveChangeDoctor = async () => {
        console.log('specialtyId======>', this.state.specialtyId.value);
        try {
            await this.props.saveDetailInfoDoctor({
                id: this.state.selectedDoctor.id,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                description: this.state.description,

                priceId: this.state.priceId.value,
                provinceId: this.state.provinceId.value,
                paymentId: this.state.paymentId.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note,
                specialtyId: this.state.specialtyId.value,
            });
            this.setState({
                selectedDoctor: '',
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                isUpdate: false,

                priceId: '',
                provinceId: '',
                paymentId: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                specialtyId: '',
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
        console.log('specialtyId======>', +this.state.specialtyId.value);
        try {
            await this.props.updateDetailInfoDoctor({
                id: this.state.selectedDoctor.id,
                contentMarkdown: this.state.contentMarkdown,
                contentHTML: this.state.contentHTML,
                description: this.state.description,

                priceId: this.state.priceId.value,
                provinceId: this.state.provinceId.value,
                paymentId: this.state.paymentId.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note,
                specialtyId: +this.state.specialtyId.value,
            });
            this.setState({
                selectedDoctor: '',
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                isUpdate: false,

                priceId: '',
                provinceId: '',
                paymentId: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                specialtyId: '',
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
                let nameVi = '',
                    nameEn = '';
                if (item.valueVi && item.valueEn) {
                    nameVi = `${item.valueVi}`;
                    nameEn = `${item.valueEn}`;
                } else {
                    nameVi = `${item.nameVi}`;
                    nameEn = `${item.nameEn}`;
                }

                Object.label = language === LANGUAGES.EN ? nameEn : nameVi;
                if (item.keyMap) {
                    Object.value = item.keyMap;
                } else {
                    Object.value = item.id;
                }
                result.push(Object);
            });
        }
        return result;
    };

    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        let {
            listPrice,
            listPayment,
            listProvince,
            priceId,
            paymentId,
            provinceId,
            nameClinic,
            addressClinic,
            note,
            listSpecialty,
            specialtyId,
        } = this.state;
        console.log('listSpecialtyRedux', this.props.listSpecialtyRedux.data);
        console.log(
            'listPaymentDoctorRedux',
            this.props.listPaymentDoctorRedux
        );
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
                            </b>
                        </label>
                        <Select
                            options={this.state.listDoctor}
                            value={this.state.selectedDoctor}
                            onChange={this.handleDoctorChange}
                            placeholder={
                                <FormattedMessage id='admin.manage-doctor.choose-a-doctor' />
                            }
                        />
                    </div>
                    <div className='content-right form-group col-8'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.description' />
                            </b>{' '}
                        </label>
                        <textarea
                            className='form-control'
                            rows='4'
                            value={this.state.description}
                            onChange={(event) =>
                                this.handleOnChangeText(event, 'description')
                            }
                        />
                    </div>
                </div>
                <div className='more-info-extra col-12 row'>
                    <div className='form-group col-3'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.price' />
                            </b>
                        </label>
                        <Select
                            options={listPrice}
                            value={priceId}
                            onChange={this.handleChange}
                            placeholder={
                                <FormattedMessage id='admin.manage-doctor.price' />
                            }
                            name='priceId'
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.payment' />
                            </b>
                        </label>
                        <Select
                            options={listPayment}
                            value={paymentId}
                            onChange={this.handleChange}
                            placeholder={
                                <FormattedMessage id='admin.manage-doctor.payment' />
                            }
                            name='paymentId'
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.province' />
                            </b>
                        </label>
                        <Select
                            options={listProvince}
                            value={provinceId}
                            onChange={this.handleChange}
                            placeholder={
                                <FormattedMessage id='admin.manage-doctor.province' />
                            }
                            name='provinceId'
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.clinic-name' />
                            </b>
                        </label>
                        <input
                            className='form-control'
                            value={nameClinic}
                            onChange={(event) =>
                                this.handleOnChangeText(event, 'nameClinic')
                            }
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.clinic-address' />
                            </b>
                        </label>
                        <input
                            className='form-control'
                            value={addressClinic}
                            onChange={(event) =>
                                this.handleOnChangeText(event, 'addressClinic')
                            }
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>
                            <b>
                                <FormattedMessage id='admin.manage-doctor.note' />
                            </b>
                        </label>
                        <input
                            className='form-control'
                            value={note}
                            onChange={(event) =>
                                this.handleOnChangeText(event, 'note')
                            }
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>
                            <b>Chon chuyen khoa</b>
                        </label>
                        <Select
                            options={listSpecialty}
                            value={specialtyId}
                            onChange={this.handleChange}
                            placeholder={'chon chuyen khoa'}
                            name='specialtyId'
                        />
                    </div>
                    <div className='form-group col-3'>
                        <label>Chon phong kham</label>
                        <input className='form-control'></input>
                    </div>
                </div>
                <div className='markdown-wrap form-group col-12'>
                    <label>
                        <b>
                            <FormattedMessage id='admin.manage-doctor.detail-doctor-info' />
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
        listSpecialtyRedux: state.admin.getSpecialtyById,
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
        fetchSpecialty: () => dispatch(actions.getSpecialtyByIdStart('ALL')),
        // fetchClinic: () => dispatch(actions.fetchClinicStart),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalAddDetailDoctor);
