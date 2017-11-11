// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthInput from '../../components/inputs/AuthInput';
import CommonButton from '../../components/buttons/CommonButton';

import { loginUser, handleLoginError, registerUser, handleRegistrationError } from '../../actions/auth';

type Props = {
  activeTab: {
    name: '',
  },
  tabData: [],
};

class Content extends Component {
  props: props;

  loginButtonClickHandler() {
    console.log('login button click');
    const { dispatch } = this.props;
    const username = this.loginUsername;
    const password = this.loginPassword;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    const errorMessage = this.validateLoginCreds(creds);
    if (errorMessage.length > 0) {
      dispatch(handleLoginError(errorMessage));
      return;
    }
    dispatch(loginUser(creds));
  }

  validateLoginCreds(creds) {
    let errorMessage = '';

    if (creds.username.length < 4 || creds.username.length > 50) {
      errorMessage += 'Username must be 4-50 characters.\n';
    }

    if (creds.password.length < 4 || creds.password.lastName > 100) {
      errorMessage += 'Password must be between 4-100 characters.\n';
    }

    if (errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }

  registerButtonClickHandler() {
    console.log('register button click');
    const { dispatch } = this.props;
    const firstName = this.registerFirstName;
    const lastName = this.registerLastName;
    const username = this.registerUsername;
    const email = this.registerEmail;
    const confirmEmail = this.registerConfirmEmail;
    const password = this.registerPassword;
    const confirmPassword = this.registerConfirmPassword;

    const creds = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      username: username.value.trim(),
      email: email.value.trim(),
      confirmEmail: confirmEmail.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim()
    };
    const errorMessage = this.validateRegisterCreds(creds);
 
    console.log('creds ===>', creds);
    console.log('errorMessage ===>', errorMessage);
    console.log('errorMessage ===>', errorMessage);
    if (errorMessage.length > 0) {
      dispatch(handleRegistrationError(errorMessage));
      return;
    }

    dispatch(registerUser(creds));
  }

  validateRegisterCreds(creds) {
    let errorMessage = '';

    if (creds.firstName.length < 1 || creds.firstName.length > 50) {
      errorMessage += 'First name must be 1-50 characters.\n';
    }

    if (creds.lastName.length < 1 || creds.lastName.lastName > 50) {
      errorMessage += 'Last name must be 1-50 characters.\n';
    }

    if (!this.validateEmail(creds.email)) {
      errorMessage += 'Invalid email.\n';
    }

    if (creds.email !== creds.confirmEmail) {
      errorMessage += 'Emails do not match.\n';
    }

    if (creds.username.length < 4 || creds.username.length > 50) {
      errorMessage += 'Username must be 4-50 characters.\n';
    }

    if (creds.password.length < 4 || creds.password.lastName > 100) {
      errorMessage += 'Password must be between 4-100 characters.\n';
    }

    if (creds.password !== creds.confirmPassword) {
      errorMessage += 'Passwords do not match.\n';
    }

    if (errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }

  validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  render() {
    const { activeTab: { name }, tabData, loginErrorMessage, registerErrorMessage } = this.props;
    const loginTabMark = (name === tabData[0].name) ?
      (
        <section className="panel">
          <div className="item-container">
            <input ref={el => { this.loginUsername = el; }} className="auth-input" placeholder="User Name" type="text" />
          </div>
          <div className="item-container">
            <input ref={el => { this.loginPassword = el; }} className="auth-input" placeholder="Password" type="password" />
          </div>
          <div className="item-container alert alert-danger">
            {loginErrorMessage}
          </div>
          <div className="item-container">
            <CommonButton title="Login" className="auth-button" onClick={() => this.loginButtonClickHandler()} />
          </div>
        </section>
      ) :
      null;
    const registerTabMark = (name === tabData[1].name) ?
      (
        <section className="panel">
          <div className="item-container inline-item">
            <input ref={el => { this.registerFirstName = el; }} className="auth-input" placeholder="First Name" type="text" />
            <input ref={el => { this.registerLastName = el; }} className="auth-input" placeholder="Last Name" type="text" />
          </div>
          <div className="item-container">
            <input ref={el => { this.registerEmail = el; }} className="auth-input" placeholder="Email" type="email" />
          </div>
          <div className="item-container">
            <input ref={el => { this.registerConfirmEmail = el; }} className="auth-input" placeholder="Confirm Email" type="email" />
          </div>
          <div className="item-container">
            <input ref={el => { this.registerUsername = el; }} className="auth-input" placeholder="User Name" type="text" />
          </div>
          <div className="item-container">
            <input ref={el => { this.registerPassword = el; }} className="auth-input" placeholder="Password" type="password" />
          </div>
          <div className="item-container">
            <input ref={el => { this.registerConfirmPassword = el; }} className="auth-input" placeholder="Confirm Password" type="password" />
          </div>
          <div className="item-container alert alert-danger">
            {registerErrorMessage}
          </div>
          <div className="item-container">
            <CommonButton title="Register" className="auth-button" onClick={() => this.registerButtonClickHandler()} />
          </div>
        </section>
      ) :
      null;

    return (
      <div>
        {loginTabMark}
        {registerTabMark}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { register, auth } = state;
  const { isAuthenticated, loginErrorMessage } = auth;
  const { registerErrorMessage } = register;

  return {
    isAuthenticated: isAuthenticated,
    loginErrorMessage: loginErrorMessage,
    registerErrorMessage: registerErrorMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}


export default connect(mapStateToProps, mapDispatchToProps)(Content);
