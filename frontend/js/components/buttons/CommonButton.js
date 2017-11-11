// @flow
import React, { Component } from 'react'
import cx from 'classnames';

type Props = {
  title: '',
  className: '',
  onClick: () => {}
};

class CommonButton extends Component {
  props: Props;
  render() {
    const { title, className, onClick } = this.props;
    return (
      <button type="button" className={cx('btn', 'common-button', className)} onClick={() => onClick()}>
        {title}
      </button>
    );
  }
}

export default CommonButton;
