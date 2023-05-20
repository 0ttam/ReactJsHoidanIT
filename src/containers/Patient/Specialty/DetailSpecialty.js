import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import HomeHeader from '../../HomePage/Header';
import './DetailSpecialty.scss';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import { handleGetListDoctorBySpecialty } from '../../../services/userService';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctorBySpecialtyId: [],
            languages: '',
            currentSpecialtyId: -1,
        };
    }
    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            this.setState({
                currentSpecialtyId: id,
            });
            let res = await handleGetListDoctorBySpecialty(id);
            if (res && res.errCode === 0) {
                this.setState({
                    listDoctorBySpecialtyId: res.data,
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
    }
    showNotification = (data) => {
        this.notify(data.msg, data.errType);
    };
    notify = (message, type) => toast(message, { autoClose: 2000, type: type });

    render() {
        let languages = this.props.languages;
        let { listDoctorBySpecialtyId } = this.state;

        return (
            <Fragment>
                <ToastContainer />
                <HomeHeader />
                <div> Cơ xương khớp</div>
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
                                className='specialty-detail-container'
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
                                                    languages === LANGUAGES.EN
                                                        ? nameEn
                                                        : nameVi}
                                                </div>
                                                <div className='content-right-down'>
                                                    {item &&
                                                        item.User.Markdown && (
                                                            <span>
                                                                {
                                                                    item.User
                                                                        .Markdown
                                                                        .description
                                                                }
                                                            </span>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='content-right' key={index}>
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
                                <div className='detail-info-doctor-wrapper'>
                                    <div className='detail-info-doctor'></div>
                                </div>
                                <div className='comment-doctor'></div>
                            </div>
                        );
                    })}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        // listDoctorBySpecialtyIdRedux: state.admin.listDoctorBySpecialtyId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // loadDetailDoctorBySpecialty: (idSpecialty) =>
        //     dispatch(actions.getListDoctorBySpecialtyStart(idSpecialty)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
