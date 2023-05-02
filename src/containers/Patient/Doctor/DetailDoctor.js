import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import HomeHeader from '../../HomePage/Header';
import './DetailDoctor.scss';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailInfoDoctor: {},
            languages: '',
            currentDoctorId: -1,
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
                currentDoctorId: id,
            });
            this.props.loadDetailDoctor(id);
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            prevProps.detailInfoDoctorRedux !== this.props.detailInfoDoctorRedux
        ) {
            this.setState({
                detailInfoDoctor: this.props.detailInfoDoctorRedux,
            });
        }
        if (prevProps.languages !== this.props.languages) {
            this.setState({
                languages: this.props.languages,
            });
        }
    }

    render() {
        let { languages } = this.props;
        let { detailInfoDoctor } = this.state;
        let nameVi = '',
            nameEn = '';
        if (detailInfoDoctor && detailInfoDoctor.positionData) {
            nameVi = `${detailInfoDoctor.positionData.valueVi} ${detailInfoDoctor.lastName} ${detailInfoDoctor.firstName}`;
            nameEn = `${detailInfoDoctor.positionData.valueEn} ${detailInfoDoctor.firstName} ${detailInfoDoctor.lastName}`;
        }
        return (
            <Fragment>
                <HomeHeader />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                            style={{
                                backgroundImage: `url(${detailInfoDoctor.avatar})`,
                                height: '120px',
                                width: '120px',
                                borderRadius: '50%',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                                backgroundColor: '#eee',
                                margin: '0 auto',
                            }}
                        ></div>
                        <div className='content-right'>
                            <div className='content-right-up'>
                                {languages && languages === LANGUAGES.EN
                                    ? nameEn
                                    : nameVi}
                            </div>
                            <div className='content-right-down'>
                                {detailInfoDoctor &&
                                    detailInfoDoctor.Markdown && (
                                        <span>
                                            {
                                                detailInfoDoctor.Markdown
                                                    .description
                                            }
                                        </span>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                currentDoctorId={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='content-right'>
                            <DoctorExtraInfo
                                currentDoctorId={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className='detail-info-doctor-wrapper'>
                        <div className='detail-info-doctor'>
                            {detailInfoDoctor &&
                                detailInfoDoctor.Markdown &&
                                detailInfoDoctor.Markdown.contentHTML && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: detailInfoDoctor.Markdown
                                                .contentHTML,
                                        }}
                                    ></div>
                                )}
                        </div>
                    </div>
                    <div className='comment-doctor'></div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        languages: state.app.language,
        detailInfoDoctorRedux: state.admin.detailInfoDoctor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadDetailDoctor: (idDoctor) =>
            dispatch(actions.getDetailInfoDoctorStart(idDoctor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
