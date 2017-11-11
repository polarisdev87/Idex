// @flow
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

type Props = {
  className: '',
  type: '',
  onClick: () => {},
};

class CircleIconButton extends Component {
  props: Props;

  onClickHandler(event) {
    this.props.onClick();
    event.preventDefault();
    event.stopPropagation();
  }
  render() {
    const { className, type } = this.props;
    let imageUrl = '';
    if (type === 'edit') {
      imageUrl = '../../assets/images/icon_edit_circle.png';
    } else if (type === 'like') {
      imageUrl = '../../assets/images/icon_like_circle.png';
    } else if (type === 'already_like') {
      imageUrl = '../../assets/images/icon_already_like_circle.png';
    }
    return (
      <button className={cx('btn circle-icon-button', className)} onClick={(e) => this.onClickHandler(e)}>
        <img src={imageUrl} alt="circle button" />
      </button>
    );
  }
}

export default CircleIconButton;
