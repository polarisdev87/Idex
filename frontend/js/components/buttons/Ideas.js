import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Ideas extends Component {

  render() {

    return (
      <Link to="/ideas">
        <button className="btn btn-primary nav-btn">
          Ideas
        </button>
      </Link>
    )
  }
}
