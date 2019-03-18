import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'


export default class Users extends Component {

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
