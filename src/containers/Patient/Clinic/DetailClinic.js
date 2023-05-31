import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import HomeHeader from '../../HomePage/Header';
import Footer from '../../HomePage/Footer';
import './DetailClinic.scss';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import { handleGetListDoctorByClinic } from '../../../services/userService';
import Select from 'react-select';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctorBySpecialtyId: [],
            languages: '',
            currentClinicId: -1,
            detailClinic: {},
            loadMoreDetailClinic: false,
            specialtyId: '',
            listSpecialty: [],
        };
    }
    async componentDidMount() {
        this.props.fetchSpecialty();
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            this.setState({
                currentClinicId: id,
            });
            let res = await handleGetListDoctorByClinic(id, 'ALL');
            if (res && res.errCode === 0) {
                this.setState({
                    listDoctorBySpecialtyId: res.data.dataDoctor,
                    detailClinic: res.data.dataClinic,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.languages !== this.props.languages) {
            this.setState({
                languages: this.props.languages,
            });
        }
        if (
            prevProps.listSpecialtyDoctorRedux !==
            this.props.listSpecialtyDoctorRedux
        ) {
            let dataSelectSpecialty = this.handleBuiltSelection(
                this.props.listSpecialtyDoctorRedux.data
            );
            dataSelectSpecialty.unshift({
                label: 'Tất cả chuyên khoa',
                value: 'ALL',
            });
            this.setState({
                listSpecialty: dataSelectSpecialty,
            });
        }
    }
    showNotification = (data) => {
        this.notify(data.msg, data.errType);
    };
    notify = (message, type) => toast(message, { autoClose: 2000, type: type });
    toggleDetailSpecialty = () => {
        this.setState({
            loadMoreDetailClinic: !this.state.loadMoreDetailClinic,
        });
    };
    handleViewDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor}`);
        }
    };
    handleChange = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = this.state;
        stateCopy[stateName] = selectedOption;
        this.setState({ ...stateCopy });
        let res = await handleGetListDoctorByClinic(
            this.state.currentClinicId,
            this.state.specialtyId.value
        );
        if (res && res.errCode === 0) {
            this.setState({
                listDoctorBySpecialtyId: res.data.dataDoctor,
                detailClinic: res.data.dataClinic,
            });
        }
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

    render() {
        let languages = this.props.languages;
        let {
            listDoctorBySpecialtyId,
            detailClinic,
            loadMoreDetailClinic,
            specialtyId,
            listSpecialty,
        } = this.state;
        let imageBase64Specialty = '';
        if (detailClinic && detailClinic.image) {
            imageBase64Specialty = new Buffer(
                detailClinic.image,
                'base64'
            ).toString('binary');
        }

        return (
            <Fragment>
                <ToastContainer />
                <HomeHeader />
                {imageBase64Specialty && (
                    <div
                        style={{
                            backgroundImage: `url(${imageBase64Specialty})`,
                            backgroundPosition: 'center center',
                            height: '380px',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}
                    ></div>
                )}

                {detailClinic &&
                    detailClinic.contentHTML &&
                    loadMoreDetailClinic === false && (
                        <div
                            className='detail-specialty-container'
                            style={{
                                backgroundImage: `url(${imageBase64Specialty})`,
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundColor: '#eee',
                            }}
                        >
                            <div
                                className='detail-specialty'
                                dangerouslySetInnerHTML={{
                                    __html: `${detailClinic.contentHTML.substring(
                                        0,
                                        200
                                    )}...`,
                                }}
                            ></div>
                            <div
                                className='toggle-detail'
                                onClick={() => this.toggleDetailSpecialty()}
                            >
                                Xem thêm
                            </div>
                        </div>
                    )}
                {detailClinic &&
                    detailClinic.contentHTML &&
                    loadMoreDetailClinic === true && (
                        <div
                            className='detail-specialty-container'
                            style={{
                                backgroundImage: `url(${imageBase64Specialty})`,
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundColor: '#eee',
                            }}
                        >
                            <div
                                className='detail-specialty'
                                dangerouslySetInnerHTML={{
                                    __html: `${detailClinic.contentHTML}`,
                                }}
                            ></div>
                            <div
                                className='toggle-detail'
                                onClick={() => this.toggleDetailSpecialty()}
                            >
                                Ẩn bớt
                            </div>
                        </div>
                    )}
                <div className='detail-doctor-background'>
                    <div className='col-3 sort-doctor-specialty'>
                        <Select
                            options={listSpecialty}
                            value={specialtyId}
                            onChange={this.handleChange}
                            placeholder={'Xem theo Chuyên khoa'}
                            name='specialtyId'
                        />
                    </div>
                    {listDoctorBySpecialtyId &&
                        listDoctorBySpecialtyId.length > 0 &&
                        listDoctorBySpecialtyId.map((item, index) => {
                            let nameVi = '',
                                nameEn = '';
                            if (item.User && item.User.positionData) {
                                nameVi = `${item.User.positionData.valueVi} ${item.User.lastName} ${item.User.firstName}`;
                                nameEn = `${item.User.positionData.valueEn} ${item.User.firstName} ${item.User.lastName}`;
                            }
                            let imageBase64 = '';
                            if (item.User.avatar) {
                                imageBase64 = new Buffer(
                                    item.User.avatar,
                                    'base64'
                                ).toString('binary');
                            }
                            return (
                                <div
                                    className='detail-doctor-container'
                                    key={index}
                                >
                                    <div className='doctor-detail'>
                                        <div className='content-left'>
                                            <div className='intro-doctor'>
                                                <div
                                                    className='content-img'
                                                    style={{
                                                        backgroundImage: `url(${imageBase64})`,
                                                        height: '80px',
                                                        width: '80px',
                                                        borderRadius: '50%',
                                                        backgroundPosition:
                                                            'center center',
                                                        backgroundRepeat:
                                                            'no-repeat',
                                                        backgroundSize: 'cover',
                                                        backgroundColor: '#eee',
                                                    }}
                                                ></div>
                                                <div className='content-right'>
                                                    <div className='content-right-up'>
                                                        {languages &&
                                                        languages ===
                                                            LANGUAGES.EN
                                                            ? nameEn
                                                            : nameVi}
                                                    </div>
                                                    <div className='content-right-down'>
                                                        {item &&
                                                            item.User
                                                                .Markdown && (
                                                                <span>
                                                                    {
                                                                        item
                                                                            .User
                                                                            .Markdown
                                                                            .description
                                                                    }
                                                                </span>
                                                            )}
                                                    </div>
                                                    <div
                                                        className='view-detail-doctor'
                                                        onClick={() =>
                                                            this.handleViewDoctor(
                                                                item.doctorId
                                                            )
                                                        }
                                                    >
                                                        Xem chi tiết
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className='content-right'
                                            key={index}
                                        >
                                            <DoctorSchedule
                                                currentDoctorId={item.doctorId}
                                                key={index}
                                                showNotification={(data) =>
                                                    this.showNotification(data)
                                                }
                                            />
                                            <DoctorExtraInfo
                                                currentDoctorId={item.doctorId}
                                                key={index}
                                            />
                                        </div>
                                    </div>
                                    <div className='comment-doctor'></div>
                                </div>
                            );
                        })}
                </div>
                <Footer />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        listSpecialtyDoctorRedux: state.admin.getSpecialtyById,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSpecialty: () => dispatch(actions.getSpecialtyByIdStart('ALL')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
