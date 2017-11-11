import React, { Component, PropTypes } from 'react'
import LoginNav from './LoginNav'
import Logout from './buttons/Logout'
import { loginUser, logoutUser, handleLoginError } from '../actions/auth'
import Users from "./buttons/Users";
import Ideas from "./buttons/Ideas";

export default class Navbar extends Component {
  
  render() {
    const {
      dispatch,
      isAuthenticated,
      loginErrorMessage,
      role
    } = this.props;
    
    return (
      <nav className="navbar navbar-default">
        <div className="container"> {/* className="auth-require" */}
          <a className="navbar-brand" href="#">
            <img src="../../assets/images/logo.png" />
          </a>
          <div className="navbar-form text-right">
            <button type="button" className="btn btn-link label-base-base">Users</button>
            <button type="button" className="btn btn-link label-base-base" onClick={() => dispatch(logoutUser())} >Logout</button>
            {/* {
              !isAuthenticated &&
                <LoginNav
                  errorMessage={loginErrorMessage}
                  onLoginClick={ creds => dispatch(loginUser(creds)) }
                  onLoginError={ message => dispatch(handleLoginError(message)) }
                  dispatch={ dispatch }
                />
            }

            { (role === 'ROLE_ADMIN' || role === 'ROLE_USER_MANAGER') &&
              <span>
                <Users />
              </span>
            }

            {
              isAuthenticated &&
              <span>
                <Ideas />
                <Logout onLogoutClick={() => dispatch(logoutUser())} />
              </span>
            } */}

          </div>
        </div>
      </nav>
    );
  }

}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginErrorMessage: PropTypes.string,
  role: PropTypes.string.isRequired
};
