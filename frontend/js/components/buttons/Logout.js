import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Logout extends Component {
  
  render() {
    const { onLogoutClick } = this.props;
    
    return (
      <Link to="/login">
        <button onClick={() => onLogoutClick()} className="btn btn-primary">
          Logout
        </button>
      </Link>
    )
  }
  
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
};