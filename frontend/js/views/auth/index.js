// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import {I18n} from 'react-redux-i18n';

import Tabs from './Tabs';
import Content from './Content';
import {setActiveTab} from '../../actions/auth';

const tabData = [
  { name: 'Login', isActive: true },
  { name: 'Register', isActive: false },
];

class Auth extends Component {

	  componentDidMount() {
		    const { dispatch } = this.props;
		    dispatch(setActiveTab(tabData[0]));
		  }

	
	
  handleClick = (tab) => {
	  const {dispatch} = this.props;
	  dispatch(setActiveTab(tab));
  };

  render() {
	  
	const {activeTab} = this.props;
    return (
      <div className="container">
        <div className="auth-container">
          <p className="auth-title no-margin-b">{I18n.t('auth.title')}</p>
          <p className="auth-sub-title">{I18n.t('auth.note')}</p>
          <div className="tab-container">
            <Tabs activeTab={activeTab} changeTab={this.handleClick} tabData={tabData} />
            <Content activeTab={activeTab} tabData={tabData} />
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
	
  return {activeTab: state.auth.activeTab};
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
