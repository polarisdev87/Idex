// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import Tab from './Tab'

type Props = {
  activeTab: {},
  tabData: [],
  changeTab: () => {},
}

class Tabs extends Component {
  props: Props;
  render() {
    const { tabData, activeTab, changeTab } = this.props;
    return (
      <ul className="nav nav-tabs">
        {
          tabData.map(tab => (
            <Tab key={tab.name} data={tab} isActive={activeTab === tab} handleClick={() => changeTab(tab)} />
          ))
        }
      </ul>
    );
  }
}

export default Tabs;
