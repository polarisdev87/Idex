// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

type Props = {
  isActive: boolean,
  handleClick: () => {},
}

class Tab extends Component {
  props: Props;

  render() {
    const { isActive, handleClick } = this.props;
    return (
      <li onClick={() => handleClick()} className={isActive ? "active" : null}>
        <a href="#">{this.props.data.name}</a>
      </li>
    );
  }
}

export default Tab;
