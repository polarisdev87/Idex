import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { loginUser, handleLoginError } from '../actions/auth'

class LoginFull extends Component {

  render() {
    const { errorMessage } = this.props;

    let errorMessages;

    if(!!errorMessage) {
      if(typeof errorMessage === 'string') {
        errorMessages = errorMessage.split('\n').map(function (message, key) {
          return (
            <li key={key} className="red">
              {message}
            </li>
          )
        });
      }
    }

    return (
      <div>
        <div className="container col-md-offset-2 col-sm-4">
          <div className="container">
            <h1 className="text-center">Log In</h1>

            <div className="form-group row">
              <label className="col-2 col-form-label">Username</label>
              <div className="col-10">
                <input ref="username" className="form-control" min="4" max="50" type="text" placeholder="Username" id="username" />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-2 col-form-label">Password</label>
              <div className="col-10">
                <input ref="password" className="form-control" min="4" max="100" type="password" placeholder="Password" id="password" />
              </div>
            </div>
            {
              errorMessages &&
              <ul>
                { errorMessages }
              </ul>
            }
            <div className="form-group row">
              <button onClick={(event) => this.handleLoginClick(event)} className="btn btn-primary">
                Log In
              </button>
            </div>
          </div>

          <div className="container text-center">
            <hr />
            <h4>No account? <Link to="/register">Register</Link></h4>
          </div>
        </div>
      </div>

    )
  }

  handleLoginClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };

    const errorMessage = LoginFull.validateCreds(creds);

    if(errorMessage.length > 0) {
      this.props.dispatch(handleLoginError(errorMessage));

      return;
    }

    this.props.dispatch(loginUser(creds));
  }

  static validateCreds(creds) {
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

function mapStateToProps(state) {

  const { auth } = state;
  const { isAuthenticated, loginErrorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage: loginErrorMessage,
  }
}

LoginFull.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps)(LoginFull);
