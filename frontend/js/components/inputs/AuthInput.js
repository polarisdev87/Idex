// @flow
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

type Props = {
  placeholder: '',
  type: 'text',
  className: '',
};

class AuthInput extends Component {
  props: Props;
  render() {
    const { placeholder, type, className } = this.props;
    return (
      <input
        className={cx('auth-input', className)}
        min="4"
        max="50"
        type={type}
        placeholder={placeholder}
      />
    );
  }
}

export default AuthInput;
