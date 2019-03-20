import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';

import { registerUser, handleRegistrationError } from '../actions/register'

class Register extends Component {

  render() {

    const { errorMessage } = this.props;
    let errorMessages;

    if(!!errorMessage) {
      errorMessages = errorMessage.split('\n').map(function(message, key) {
        return (
          <li key={key} className="red">
            {message}
          </li>
        )
      });
    }

    return (
      <div>
        <div className="container col-md-offset-2 col-sm-4">
          <div className="container">
            <h1 className="text-center">Register</h1>

            <div className="form-group row">
              <label className="col-2 col-form-label">First Name</label>
              <div className="col-10">
                <input className="form-control" type="text" min="1" max="50" placeholder="First Name (1-50 Characters)" ref="firstName" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Last Name</label>
              <div className="col-10">
                <input className="form-control" type="text" min="1" max="50" placeholder="Last Name (1-50 Characters)" ref="lastName" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Email</label>
              <div className="col-10">
                <input className="form-control" type="email" placeholder="Email" ref="email" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Confirm Email</label>
              <div className="col-10">
                <input className="form-control" type="email" placeholder="Confirm Email" ref="confirmEmail" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Username</label>
              <div className="col-10">
                <input className="form-control" type="text" min="4" max="50" placeholder="Username (4-50 Characters)" ref="username" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Password</label>
              <div className="col-10">
                <input className="form-control" type="password" min="4" max="100" placeholder="Password (4-100 Characters)" ref="password" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Confirm Password</label>
              <div className="col-10">
                <input className="form-control" type="password" min="4" max="100" placeholder="Confirm Password (4-100 Characters)" ref="confirmPassword" />
              </div>
            </div>

            {
              errorMessages &&
                <ul>
                  {errorMessages}
                </ul>
            }
            <div className="form-group row">
              <button onClick={(event) => this.handleRegisterClick(event)} className="btn btn-primary register-full-btn">
                Register
              </button>
            </div>

            <div className="container text-center">
              <hr />
              <h4>Already have an account? <Link to="/login">Log In</Link></h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleRegisterClick(event) {
    const firstName = this.refs.firstName;
    const lastName = this.refs.lastName;
    const username = this.refs.username;
    const email = this.refs.email;
    const confirmEmail = this.refs.confirmEmail;
    const password = this.refs.password;
    const confirmPassword = this.refs.confirmPassword;

    const creds = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      username: username.value.trim(),
      email: email.value.trim(),
      confirmEmail: confirmEmail.value.trim(),
      password: password.value.trim(),
      confirmPassword: confirmPassword.value.trim()
    };

    const errorMessage = Register.validateCreds(creds);

    if(errorMessage.length > 0) {
      this.props.dispatch(handleRegistrationError(errorMessage));

      return;
    }

    this.props.dispatch(registerUser(creds));
  }

  static validateCreds(creds) {
    let errorMessage = '';

    if (creds.firstName.length < 1 || creds.firstName.length > 50) {
      errorMessage += "First name must be 1-50 characters.\n";
    }

    if (creds.lastName.length < 1 || creds.lastName.lastName > 50) {
      errorMessage += "Last name must be 1-50 characters.\n";
    }

    if (!Register.validateEmail(creds.email)) {
      errorMessage += "Invalid email.\n";
    }

    if (creds.email !== creds.confirmEmail) {
      errorMessage += "Emails do not match.\n";
    }

    if (creds.username.length < 4 || creds.username.length > 50) {
      errorMessage += "Username must be 4-50 characters.\n";
    }

    if (creds.password.length < 4 || creds.password.lastName > 100) {
      errorMessage += "Password must be between 4-100 characters.\n"
    }

    if (creds.password !== creds.confirmPassword) {
      errorMessage += "Passwords do not match.\n";
    }

    if(errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }

  static validateEmail(email) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {

  const { register, auth } = state;
  const { registerErrorMessage } = register;
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
    errorMessage: registerErrorMessage,
  }
}

export default connect(mapStateToProps)(Register);