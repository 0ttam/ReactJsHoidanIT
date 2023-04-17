import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import HomeHeader from '../../HomePage/Header';
import './DetailDoctor.scss';
import * as actions from '../../../store/actions/adminAction';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailInfoDoctor: {},
            languages: '',
        };
    }
    async componentDidMount() {
        if (this.props.match.params.id) {
            this.props.loadDetailDoctor(this.props.match.params.id);
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
        let { languages } = this.state;
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
                                detailDoctorFromParent={this.state.detailInfoDoctor}
                            />
                        </div>
                        <div className='content-right'></div>
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
