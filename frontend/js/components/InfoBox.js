// @flow
import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  index: 0,
  ideaNum: 0,
};

const infoConfig = [
  {
    title: 'Incubated Ideas',
    image: '../../assets/images/icon_stage_incubation.png',
    background: '#3498db',
  },
  {
    title: 'Prototyped Ideas',
    image: '../../assets/images/icon_stage_prototype.png',
    background: '#11c40f',
  },
  {
    title: 'Launched Ideas',
    image: '../../assets/images/icon_stage_launched.png',
    background: '#3dad5d',
  },
  {
    title: 'Canceled Ideas',
    image: '../../assets/images/icon_stage_canceled.png',
    background: '#f84444',
  },
];

class InfoBox extends Component {
  props: Props;
  render() {
    const { index, ideaNum } = this.props;
    const config = infoConfig[index];
    return (
      <div className="info-box-container" style={{ background: config.background }} >
        <div className="image-container">
          <img src={config.image} alt="info" />
        </div>
        <div className="label-container">
          <div className="label-xxl-white">
            {ideaNum}
          </div>
          <div className="label-base-white">
            {config.title}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoBox;
