import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

export default class Login extends Component {

  render() {

    const { errorMessage } = this.props;

    let errorMessages;

    if(!!errorMessage) {
      if(typeof errorMessage === 'string') {
        errorMessages = errorMessage.split('\n').map(function (message, key) {
          return (
            <div key={key} className="red">
              {message}
            </div>
          )
        });
      }
    }

    return (
      <div>
        <input type='text' ref='username' min="4" max="50" className="form-control nav-input" placeholder='Username'/>
        <input type='password' ref='password' min="4" max="100" className="form-control nav-input" placeholder='Password'/>
        <button onClick={(event) => this.handleLoginClick(event)} className="btn btn-primary nav-btn">
          Log In
        </button>
        <Link to="/register">
          <button className="btn btn-primary">
              Register
          </button>
        </Link>

        {
          errorMessages &&
          <div className="nav-error">
            {errorMessages}
          </div>
        }
      </div>
    )
  }

  handleLoginClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };

    const errorMessage = this.validateCreds(creds);

    if(errorMessage.length > 0) {
      this.props.onLoginError(errorMessage);

      return;
    }

    this.props.onLoginClick(creds);
  }

  validateCreds(creds) {
    let errorMessage = '';

    if (creds.username.length < 4 || creds.username.length > 50) {
      errorMessage += "Username must be 4-50 characters.\n";
    }

    if (creds.password.length < 4 || creds.password.lastName > 100) {
      errorMessage += "Password must be between 4-100 characters.\n"
    }

    if(errorMessage.endsWith('\n')) {
      errorMessage = errorMessage.substr(0, errorMessage.length - 1);
    }

    return errorMessage;
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
  onLoginError: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};