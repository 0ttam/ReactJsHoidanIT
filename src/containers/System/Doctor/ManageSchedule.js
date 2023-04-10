import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

class ManageSchedule extends Component {
    render() {
        return (
            <Fragment>
                <div> Manage Schedule</div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
