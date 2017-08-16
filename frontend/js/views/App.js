import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'

import { setRoleFromJwt } from '../actions/auth'

class App extends Component {
  
  render() {
    const {
      dispatch,
      isAuthenticated,
      loginErrorMessage,
      role
    } = this.props;

    if(isAuthenticated && role === 'ROLE_NONE') {
      dispatch(setRoleFromJwt());
    }

    return (
      <div>
        <Navbar
          isAuthenticated={ isAuthenticated }
          loginErrorMessage={ loginErrorMessage }
          dispatch={ dispatch }
          role = { role }
        />

        { this.props.children }

      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  usersArr: PropTypes.array,
  ideasArr: PropTypes.array,
  isAuthenticated: PropTypes.bool.isRequired,
  loginErrorMessage: PropTypes.string,
  registerErrorMessage: PropTypes.string,
  role: PropTypes.string
};

function mapStateToProps(state) {
  
  const { auth, register, users } = state;
  const { usersArr, isFetchingUsers } = users;
  const { registerErrorMessage } = register;
  const { isAuthenticated, loginErrorMessage, role } = auth;

  return {
    usersArr,
    isAuthenticated,
    loginErrorMessage,
    registerErrorMessage,
    role,
    isFetchingUsers
  }
}

export default connect(mapStateToProps)(App)
