import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Admin extends Component {

  render() {

    return (
      <Link to="/users">
        <button className="btn btn-primary nav-btn">
          Users
        </button>
      </Link>
    )
  }
}
