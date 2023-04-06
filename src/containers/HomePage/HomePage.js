import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import './HomePage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import About from './Section/About';
import Footer from './Footer';
import HeaderBanner from './HeaderBanner';

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <Fragment>
                <Header />
                <HeaderBanner />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutStandingDoctor settings={settings} />
                <Handbook
                    settings={{
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }}
                />
                <About />
                <Footer />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
