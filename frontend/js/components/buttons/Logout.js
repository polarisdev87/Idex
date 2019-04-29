import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import {I18n} from 'react-redux-i18n';


export default class Logout extends Component {
  
  render() {
    const { onLogoutClick } = this.props;
    
    return (
      <Link to="/login">
        <button onClick={() => onLogoutClick()} className="btn btn-primary">
        	{I18n.t('ideas.auth.logout')}
        </button>
      </Link>
    )
  }
  
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
};