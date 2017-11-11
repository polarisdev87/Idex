// @flow
import React, { Component } from 'react';
import cx from 'classnames';

type Props = {
  className: '',
  stage: '',
};

class StageMark extends Component {
  props: Props;
  render() {
    const { className, stage } = this.props;
    let imageUrl = '';
    switch (stage.toLowerCase()) {
      case 'incubation':
        imageUrl = '../../assets/images/icon_stage_incubation.png';
        break;
      case 'prototype':
        imageUrl = '../../assets/images/icon_stage_prototype.png';
        break;
      case 'launched':
        imageUrl = '../../assets/images/icon_stage_launched.png';
        break;
      default:
    }
    return (
      <div className={cx('stage-mark', className)}>
        <img src={imageUrl} alt="stage" />
      </div>
    );
  }
}
export default StageMark;
