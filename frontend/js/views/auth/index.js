// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Tabs from './Tabs';
import Content from './Content';

const tabData = [
  { name: 'Login', isActive: true },
  { name: 'Register', isActive: false },
];

class Auth extends Component {

  state = {
    activeTab: tabData[0],
  };

  handleClick = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <div className="container">
        <div className="auth-container">
          <p className="auth-title no-margin-b">Log in to your IDEX Account</p>
          <p className="auth-sub-title">Your  account is your portal to all things! </p>
          <div className="tab-container">
            <Tabs activeTab={this.state.activeTab} changeTab={this.handleClick} tabData={tabData} />
            <Content activeTab={this.state.activeTab} tabData={tabData} />
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
