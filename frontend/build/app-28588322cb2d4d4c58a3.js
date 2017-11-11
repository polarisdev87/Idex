webpackJsonp([0],{

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/sass-loader/index.js?sourceMap!../scss/app.scss":
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Missing binding /Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/node-sass/vendor/darwin-x64-48/binding.node\nNode Sass could not find a binding for your current environment: OS X 64-bit with Node.js 6.x\n\nFound bindings for the following environments:\n  - OS X 64-bit with Node.js 7.x\n\nThis usually happens because your environment has changed since running `npm install`.\nRun `npm rebuild node-sass` to build the binding for your current environment.\n    at module.exports (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/node-sass/lib/binding.js:15:13)\n    at Object.<anonymous> (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/node-sass/lib/index.js:14:35)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at Object.<anonymous> (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/sass-loader/index.js:4:12)\n    at Module._compile (module.js:570:32)\n    at Object.Module._extensions..js (module.js:579:10)\n    at Module.load (module.js:487:32)\n    at tryModuleLoad (module.js:446:12)\n    at Function.Module._load (module.js:438:3)\n    at Module.require (module.js:497:17)\n    at require (internal/module.js:20:19)\n    at loadLoader (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/loadLoader.js:13:17)\n    at iteratePitchingLoaders (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at iteratePitchingLoaders (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:165:10)\n    at /Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:173:18\n    at loadLoader (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/loadLoader.js:36:3)\n    at iteratePitchingLoaders (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:169:2)\n    at runLoaders (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/loader-runner/lib/LoaderRunner.js:362:2)\n    at NormalModule.doBuild (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/webpack/lib/NormalModule.js:179:3)\n    at NormalModule.build (/Volumes/Data/Developer/ReactJS/pipeline/frontend/node_modules/webpack/lib/NormalModule.js:268:15)");

/***/ }),

/***/ "../scss/app.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/sass-loader/index.js?sourceMap!../scss/app.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/sass-loader/index.js?sourceMap!../scss/app.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/postcss-loader/index.js!../node_modules/sass-loader/index.js?sourceMap!../scss/app.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./actions/auth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return LOGIN_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return LOGIN_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return LOGIN_FAILURE; });
/* harmony export (immutable) */ __webpack_exports__["a"] = receiveLogin;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CLEAR_LOGIN_ERRORS; });
/* unused harmony export LOGOUT_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return LOGOUT_SUCCESS; });
/* unused harmony export LOGOUT_FAILURE */
/* unused harmony export clearLoginErrors */
/* harmony export (immutable) */ __webpack_exports__["b"] = handleLoginError;
/* harmony export (immutable) */ __webpack_exports__["c"] = loginUser;
/* harmony export (immutable) */ __webpack_exports__["e"] = logoutUser;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SET_ROLE; });
/* harmony export (immutable) */ __webpack_exports__["d"] = setRoleFromJwt;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode__ = __webpack_require__("../node_modules/jwt-decode/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__("./actions/register.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users__ = __webpack_require__("./actions/users.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__("./const.js");







var LOGIN_REQUEST = 'LOGIN_REQUEST';
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin() {
  return {
    type: LOGIN_REQUEST
  };
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    role: user.role,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message: message
  };
}

var CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

function removeLoginErrors() {
  return {
    type: CLEAR_LOGIN_ERRORS
  };
}

var LOGOUT_REQUEST = 'LOGOUT_REQUEST';
var LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
var LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

function clearLoginErrors() {
  return function (dispatch) {
    dispatch(removeLoginErrors());
  };
}

function handleLoginError(message) {
  return function (dispatch) {
    dispatch(loginError(message));
  };
}

function loginUser(creds) {

  var payload = {
    username: creds.username,
    password: creds.password
  };

  var config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  return function (dispatch) {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin());
    return fetch(__WEBPACK_IMPORTED_MODULE_4__const__["b" /* API_BASE_URI */] + '/auth', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref) {
      var body = _ref.body,
          response = _ref.response;

      if (!response.ok) {
        // If there was a problem, we want to
        // dispatch the error condition
        dispatch(loginError(body.error));
        return Promise.reject(body.error);
      } else {
        // If login was successful, set the token in local storage
        localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* ID_TOKEN_KEY */], body.token);

        var user = {
          token: body.token,
          role: __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default()(body.token).role.authority
        };

        // Dispatch the success action
        dispatch(receiveLogin(user));
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__register__["c" /* registrationClearErrors */])());
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__users__["a" /* fetchUsers */])());

        __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* browserHistory */].push('/ideas');
      }
    }).catch(function (err) {
      dispatch(loginError(err));
      console.log("Error: ", err);
    });
  };
}

function logoutUser() {
  return function (dispatch) {
    dispatch(requestLogout());
    localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* ID_TOKEN_KEY */]);
    dispatch(receiveLogout());
    __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* browserHistory */].push('/');
  };
}

var SET_ROLE = 'SET_ROLE';

function setRole(role) {
  return {
    type: SET_ROLE,
    role: role
  };
}

function setRoleFromJwt() {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* ID_TOKEN_KEY */]) || null;

  if (token) {
    var role = __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default()(token).role.authority;
    return function (dispatch) {
      dispatch(setRole(role));
    };
  } else {
    return function (dispatch) {
      dispatch(setRole('ROLE_NONE'));
    };
  }
}

/***/ }),

/***/ "./actions/ideas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GET_IDEAS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GET_IDEAS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return GET_IDEAS_FAILURE; });
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchIdeas;
/* unused harmony export UPDATE_IDEA_REQUEST */
/* unused harmony export UPDATE_IDEA_SUCCESS */
/* unused harmony export UPDATE_IDEA_FAILURE */
/* harmony export (immutable) */ __webpack_exports__["c"] = updateIdea;
/* unused harmony export DELETE_IDEAS_REQUEST */
/* unused harmony export DELETE_IDEAS_SUCCESS */
/* unused harmony export DELETE_IDEAS_FAILURE */
/* unused harmony export deleteIdeas */
/* unused harmony export ADD_IDEA_REQUEST */
/* unused harmony export ADD_IDEA_SUCCESS */
/* unused harmony export ADD_IDEA_FAILURE */
/* harmony export (immutable) */ __webpack_exports__["b"] = addIdea;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const__ = __webpack_require__("./const.js");


var GET_IDEAS_REQUEST = 'GET_IDEAS_REQUEST';
var GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS';
var GET_IDEAS_FAILURE = 'GET_IDEAS_FAILURE';

function getIdeasRequest() {
  return {
    type: GET_IDEAS_REQUEST
  };
}

function getIdeasError(message) {
  return {
    type: GET_IDEAS_FAILURE,
    message: message
  };
}

function getIdeasSuccess(ideas) {
  return {
    type: GET_IDEAS_SUCCESS,
    ideas: ideas
  };
}

function fetchIdeas() {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: { 'Authorization': '' + token }
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(getIdeasRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/ideas', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref) {
      var body = _ref.body,
          response = _ref.response;

      if (!response.ok) {
        dispatch(getIdeasError('Failed to get ideas. ' + body.error));
        return Promise.reject(body.error);
      } else {
        dispatch(getIdeasSuccess(body));
      }
    }).catch(function (err) {
      dispatch(getIdeasError('Failed to get ideas. ' + err));
      console.log("Error: ", err);
    });
  };
}

var UPDATE_IDEA_REQUEST = 'UPDATE_IDEA_REQUEST';
var UPDATE_IDEA_SUCCESS = 'UPDATE_IDEA_SUCCESS';
var UPDATE_IDEA_FAILURE = 'UPDATE_IDEA_FAILURE';

function updateIdeaRequest() {
  return {
    type: UPDATE_IDEA_REQUEST
  };
}

function updateIdeaError(message) {
  return {
    type: UPDATE_IDEA_FAILURE,
    message: message
  };
}

function updateIdeaSuccess(users) {
  return {
    type: UPDATE_IDEA_SUCCESS,
    users: users
  };
}

function updateIdea(idea) {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: {
        'Authorization': '' + token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(idea)
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(updateIdeaRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/ideas', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref2) {
      var body = _ref2.body,
          response = _ref2.response;

      if (!response.ok) {
        dispatch(updateIdeaError('Failed to update idea. ' + body.error));
        return Promise.reject('Failed to update idea');
      } else {
        dispatch(updateIdeaSuccess(body));
      }
    }).catch(function (err) {
      dispatch(updateIdeaError('Failed to update user. ' + err));
      console.log("Error: ", err);
    });
  };
}

var DELETE_IDEAS_REQUEST = 'DELETE_IDEAS_REQUEST';
var DELETE_IDEAS_SUCCESS = 'DELETE_IDEAS_SUCCESS';
var DELETE_IDEAS_FAILURE = 'DELETE_IDEAS_FAILURE';

function deleteIdeasRequest() {
  return {
    type: DELETE_IDEAS_REQUEST
  };
}

function deleteUsersError(message) {
  return {
    type: DELETE_IDEAS_FAILURE,
    message: message
  };
}

function deleteUsersSuccess(ideas) {
  return {
    type: DELETE_IDEAS_SUCCESS,
    ideas: ideas
  };
}

function deleteIdeas(ideaIds) {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: {
        'Authorization': '' + token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify(ideaIds)
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(deleteIdeasRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/ideas', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref3) {
      var body = _ref3.body,
          response = _ref3.response;

      if (!response.ok) {
        dispatch(deleteUsersError('Failed to delete idea. ' + body.error));
        return Promise.reject('Failed to update idea');
      } else {
        dispatch(deleteUsersSuccess(body));
      }
    }).catch(function (err) {
      dispatch(deleteUsersError('Failed to delete idea. ' + err));
      console.log("Error: ", err);
    });
  };
}

var ADD_IDEA_REQUEST = 'ADD_IDEA_REQUEST';
var ADD_IDEA_SUCCESS = 'ADD_IDEA_SUCCESS';
var ADD_IDEA_FAILURE = 'ADD_IDEA_FAILURE';

function addIdeaRequest() {
  return {
    type: ADD_IDEA_REQUEST
  };
}

function addIdeaError(message) {
  return {
    type: ADD_IDEA_FAILURE,
    message: message
  };
}

function addIdeaSuccess(ideas) {
  return {
    type: ADD_IDEA_SUCCESS,
    ideas: ideas
  };
}

function addIdea(idea) {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: {
        'Authorization': '' + token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(idea)
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(addIdeaRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/ideas', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref4) {
      var body = _ref4.body,
          response = _ref4.response;

      if (!response.ok) {
        dispatch(addIdeaError('Failed to add idea. ' + body.error));
        return Promise.reject('Failed to add idea');
      } else {
        dispatch(addIdeaSuccess(body));
      }
    }).catch(function (err) {
      dispatch(addIdeaError('Failed to add idea. ' + err));
      console.log("Error: ", err);
    });
  };
}

/***/ }),

/***/ "./actions/register.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return REGISTRATION_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return REGISTRATION_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return REGISTRATION_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return REGISTRATION_CLEAR_ERRORS; });
/* harmony export (immutable) */ __webpack_exports__["c"] = registrationClearErrors;
/* harmony export (immutable) */ __webpack_exports__["a"] = handleRegistrationError;
/* harmony export (immutable) */ __webpack_exports__["b"] = registerUser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode__ = __webpack_require__("../node_modules/jwt-decode/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("./actions/auth.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__users__ = __webpack_require__("./actions/users.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__("./const.js");







var REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
var REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
var REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
var REGISTRATION_CLEAR_ERRORS = 'REGISTRATION_CLEAR_ERRORS';

function requestRegistration() {
  return {
    type: REGISTRATION_REQUEST
  };
}

function receiveRegistration(user) {
  return {
    type: REGISTRATION_SUCCESS,
    id_token: user.id_token
  };
}

function registrationError(message) {
  return {
    type: REGISTRATION_FAILURE,
    message: message
  };
}

function registrationClearErrors() {
  return {
    type: REGISTRATION_CLEAR_ERRORS
  };
}

function handleRegistrationError(message) {
  return function (dispatch) {
    dispatch(registrationError(message));
  };
}

function registerUser(creds) {

  var payload = {
    firstName: creds.firstName,
    lastName: creds.lastName,
    username: creds.username,
    email: creds.email,
    confirmEmail: creds.confirmEmail,
    password: creds.password,
    confirmPassword: creds.confirmPassword
  };

  var config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  return function (dispatch) {
    dispatch(requestRegistration());

    return fetch(__WEBPACK_IMPORTED_MODULE_4__const__["b" /* API_BASE_URI */] + '/auth/create', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref) {
      var body = _ref.body,
          response = _ref.response;

      if (!response.ok) {
        dispatch(handleRegistrationError(body.error));
        return Promise.reject(body.error);
      } else {
        localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__const__["a" /* ID_TOKEN_KEY */], body.token);

        // Dispatch the success action
        dispatch(receiveRegistration(body));

        var user = {
          token: body.token,
          role: __WEBPACK_IMPORTED_MODULE_0_jwt_decode___default()(body.token).role.authority
        };

        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__auth__["a" /* receiveLogin */])(user));
        dispatch(registrationClearErrors());
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__users__["a" /* fetchUsers */])());

        __WEBPACK_IMPORTED_MODULE_1_react_router__["b" /* browserHistory */].push('/ideas');
      }
    });
  };
}

/***/ }),

/***/ "./actions/users.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return GET_USERS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return GET_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return GET_USERS_FAILURE; });
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchUsers;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return UPDATE_USER_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return UPDATE_USER_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return UPDATE_USER_FAILURE; });
/* harmony export (immutable) */ __webpack_exports__["c"] = updateUser;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return DELETE_USERS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return DELETE_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return DELETE_USERS_FAILURE; });
/* harmony export (immutable) */ __webpack_exports__["b"] = deleteUsers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const__ = __webpack_require__("./const.js");


var GET_USERS_REQUEST = 'GET_USERS_REQUEST';
var GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
var GET_USERS_FAILURE = 'GET_USERS_FAILURE';

function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST
  };
}

function getUsersError(message) {
  return {
    type: GET_USERS_FAILURE,
    message: message
  };
}

function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users: users
  };
}

function fetchUsers() {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: { 'Authorization': '' + token }
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(getUsersRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/manage/users', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref) {
      var body = _ref.body,
          response = _ref.response;

      if (!response.ok) {
        dispatch(getUsersError('Failed to get users. ' + body.error));
        return Promise.reject(body.error);
      } else {
        dispatch(getUsersSuccess(body));
      }
    }).catch(function (err) {
      dispatch(getUsersError('Failed to get users. ' + err));
      console.log("Error: ", err);
    });
  };
}

var UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
var UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
var UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST
  };
}

function updateUserError(message) {
  return {
    type: UPDATE_USER_FAILURE,
    message: message
  };
}

function updateUserSuccess(users) {
  return {
    type: UPDATE_USER_SUCCESS,
    users: users
  };
}

function updateUser(user) {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: {
        'Authorization': '' + token,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(updateUserRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/manage/user', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref2) {
      var body = _ref2.body,
          response = _ref2.response;

      if (!response.ok) {
        dispatch(updateUserError('Failed to update user. ' + body.error));
        return Promise.reject('Failed to update user');
      } else {
        dispatch(updateUserSuccess(body));
      }
    }).catch(function (err) {
      dispatch(updateUserError('Failed to update user. ' + body.error));
      console.log("Error: ", err);
    });
  };
}

var DELETE_USERS_REQUEST = 'DELETE_USERS_REQUEST';
var DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
var DELETE_USERS_FAILURE = 'DELETE_USERS_FAILURE';

function deleteUsersRequest() {
  return {
    type: DELETE_USERS_REQUEST
  };
}

function deleteUsersError(message) {
  return {
    type: DELETE_USERS_FAILURE,
    message: message
  };
}

function deleteUsersSuccess(users) {
  return {
    type: DELETE_USERS_SUCCESS,
    users: users
  };
}

function deleteUsers(userIds) {

  var token = localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* ID_TOKEN_KEY */]) || null;
  var config = {};

  if (token) {
    config = {
      headers: {
        'Authorization': '' + token,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify(userIds)
    };
  } else {
    throw "No token saved!";
  }

  return function (dispatch) {
    dispatch(deleteUsersRequest());
    return fetch(__WEBPACK_IMPORTED_MODULE_0__const__["b" /* API_BASE_URI */] + '/admin/user', config).then(function (response) {
      return response.json().then(function (body) {
        return { body: body, response: response };
      });
    }).then(function (_ref3) {
      var body = _ref3.body,
          response = _ref3.response;

      if (!response.ok) {
        dispatch(deleteUsersError('Failed to delete user. ' + body.error));
        return Promise.reject('Failed to update user');
      } else {
        dispatch(deleteUsersSuccess(body));
      }
    }).catch(function (err) {
      dispatch(deleteUsersError('Failed to delete user. ' + err));
      console.log("Error: ", err);
    });
  };
}

/***/ }),

/***/ "./components/AddIdeaModal.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  AddIdeaModal: {
    displayName: 'AddIdeaModal'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/AddIdeaModal.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/AddIdeaModal.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}



var AddIdeaModal = _wrapComponent('AddIdeaModal')(function (_Component) {
  _inherits(AddIdeaModal, _Component);

  function AddIdeaModal(props) {
    _classCallCheck(this, AddIdeaModal);

    var _this = _possibleConstructorReturn(this, (AddIdeaModal.__proto__ || Object.getPrototypeOf(AddIdeaModal)).call(this, props));

    _this.handleCloseModal = _this.props.handleCloseModal;
    _this.addIdea = _this.props.addIdea;
    _this.handleSubmitPressed = _this.handleSubmitPressed.bind(_this);
    return _this;
  }

  _createClass(AddIdeaModal, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        { className: 'add-idea-modal' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'p',
          null,
          'Modal text!'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'label',
          null,
          'Title'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'text', ref: 'title' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'label',
          null,
          'Description'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'text', ref: 'description' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'label',
          null,
          'Expected Cost in Cents'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'text', ref: 'ec' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'label',
          null,
          'Expected Time to Market'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'text', ref: 'ettm' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'label',
          null,
          'Tags'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'text', ref: 'tags' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'button',
          { onClick: this.handleSubmitPressed },
          'Submit'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'button',
          { onClick: this.handleCloseModal },
          'Cancel'
        )
      );
    }
  }, {
    key: 'handleSubmitPressed',
    value: function handleSubmitPressed() {

      var tagsStringArr = this.refs.tags.value.split(' ');

      this.addIdea({
        title: this.refs.title.value,
        description: this.refs.description.value,
        expectedCostInCents: this.refs.ec.value,
        expectedTimeToMarket: this.refs.ettm.value,
        tags: tagsStringArr
      });
    }
  }]);

  return AddIdeaModal;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

AddIdeaModal.propTypes = {
  addIdea: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  handleCloseModal: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (AddIdeaModal);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/IdeaRow.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  IdeaRow: {
    displayName: 'IdeaRow'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/IdeaRow.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/IdeaRow.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}



var IdeaRow = _wrapComponent('IdeaRow')(function (_Component) {
  _inherits(IdeaRow, _Component);

  function IdeaRow(props) {
    _classCallCheck(this, IdeaRow);

    var _this = _possibleConstructorReturn(this, (IdeaRow.__proto__ || Object.getPrototypeOf(IdeaRow)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(IdeaRow, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var idea = this.props.idea;

      var tripleDot = '...';

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        { className: 'idea-row' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'idea-vote-num col-md-1', onClick: function onClick() {
              return _this2.handleClick(idea);
            } },
          idea.votes
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'idea-title col-md-1' },
          idea.title
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'idea-description col-md-8' },
          idea.description.substring(0, 100) + tripleDot
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'idea-description col-md-2' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'button',
            null,
            'View'
          )
        )
      );
    }
  }, {
    key: 'handleClick',
    value: function handleClick(idea) {
      idea.votes++;
      this.forceUpdate();
    }
  }]);

  return IdeaRow;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

IdeaRow.propTypes = {
  idea: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].object.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (IdeaRow);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/LoginNav.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Login: {
    displayName: 'Login'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/LoginNav.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/LoginNav.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}




var Login = _wrapComponent('Login')(function (_Component) {
  _inherits(Login, _Component);

  function Login() {
    _classCallCheck(this, Login);

    return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
  }

  _createClass(Login, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var errorMessage = this.props.errorMessage;


      var errorMessages = void 0;

      if (!!errorMessage) {
        if (typeof errorMessage === 'string') {
          errorMessages = errorMessage.split('\n').map(function (message, key) {
            return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { key: key, className: 'red' },
              message
            );
          });
        }
      }

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'text', ref: 'username', min: '4', max: '50', className: 'form-control nav-input', placeholder: 'Username' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'password', ref: 'password', min: '4', max: '100', className: 'form-control nav-input', placeholder: 'Password' }),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this2.handleLoginClick(event);
            }, className: 'btn btn-primary nav-btn' },
          'Log In'
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_react_router__["e" /* Link */],
          { to: '/register' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'button',
            { className: 'btn btn-primary' },
            'Register'
          )
        ),
        errorMessages && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'nav-error' },
          errorMessages
        )
      );
    }
  }, {
    key: 'handleLoginClick',
    value: function handleLoginClick(event) {
      var username = this.refs.username;
      var password = this.refs.password;
      var creds = { username: username.value.trim(), password: password.value.trim() };

      var errorMessage = this.validateCreds(creds);

      if (errorMessage.length > 0) {
        this.props.onLoginError(errorMessage);

        return;
      }

      this.props.onLoginClick(creds);
    }
  }, {
    key: 'validateCreds',
    value: function validateCreds(creds) {
      var errorMessage = '';

      if (creds.username.length < 4 || creds.username.length > 50) {
        errorMessage += "Username must be 4-50 characters.\n";
      }

      if (creds.password.length < 4 || creds.password.lastName > 100) {
        errorMessage += "Password must be between 4-100 characters.\n";
      }

      if (errorMessage.endsWith('\n')) {
        errorMessage = errorMessage.substr(0, errorMessage.length - 1);
      }

      return errorMessage;
    }
  }]);

  return Login;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Login);

Login.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  onLoginClick: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  onLoginError: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  errorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/Navbar.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LoginNav__ = __webpack_require__("./components/LoginNav.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__buttons_Logout__ = __webpack_require__("./components/buttons/Logout.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_auth__ = __webpack_require__("./actions/auth.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__buttons_Users__ = __webpack_require__("./components/buttons/Users.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__buttons_Ideas__ = __webpack_require__("./components/buttons/Ideas.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Navbar: {
    displayName: 'Navbar'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/Navbar.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/Navbar.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}








var Navbar = _wrapComponent('Navbar')(function (_Component) {
  _inherits(Navbar, _Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          isAuthenticated = _props.isAuthenticated,
          loginErrorMessage = _props.loginErrorMessage,
          role = _props.role;


      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'nav',
        { className: 'navbar navbar-default' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'container-fluid' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'a',
            { className: 'navbar-brand', href: '#' },
            'Ideas Pipeline'
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'navbar-form text-right' },
            !isAuthenticated && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__LoginNav__["a" /* default */], {
              errorMessage: loginErrorMessage,
              onLoginClick: function onLoginClick(creds) {
                return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_auth__["c" /* loginUser */])(creds));
              },
              onLoginError: function onLoginError(message) {
                return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_auth__["b" /* handleLoginError */])(message));
              },
              dispatch: dispatch
            }),
            (role === 'ROLE_ADMIN' || role === 'ROLE_USER_MANAGER') && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'span',
              null,
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__buttons_Users__["a" /* default */], null)
            ),
            isAuthenticated && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'span',
              null,
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__buttons_Ideas__["a" /* default */], null),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__buttons_Logout__["a" /* default */], { onLogoutClick: function onLogoutClick() {
                  return dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_auth__["e" /* logoutUser */])());
                } })
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Navbar);

Navbar.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  isAuthenticated: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].bool.isRequired,
  loginErrorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string,
  role: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string.isRequired
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/buttons/CommonButton.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("../node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  CommonButton: {
    displayName: 'CommonButton'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/CommonButton.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/CommonButton.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}




var CommonButton = _wrapComponent('CommonButton')(function (_Component) {
  _inherits(CommonButton, _Component);

  function CommonButton() {
    _classCallCheck(this, CommonButton);

    return _possibleConstructorReturn(this, (CommonButton.__proto__ || Object.getPrototypeOf(CommonButton)).apply(this, arguments));
  }

  _createClass(CommonButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          className = _props.className,
          onClick = _props.onClick;

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'button',
        { type: 'button', className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()('btn', 'common-button', className), onClick: function (_onClick) {
            function onClick() {
              return _onClick.apply(this, arguments);
            }

            onClick.toString = function () {
              return _onClick.toString();
            };

            return onClick;
          }(function () {
            return onClick();
          }) },
        title
      );
    }
  }]);

  return CommonButton;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (CommonButton);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/buttons/Ideas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Ideas: {
    displayName: 'Ideas'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/Ideas.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/Ideas.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}




var Ideas = _wrapComponent('Ideas')(function (_Component) {
  _inherits(Ideas, _Component);

  function Ideas() {
    _classCallCheck(this, Ideas);

    return _possibleConstructorReturn(this, (Ideas.__proto__ || Object.getPrototypeOf(Ideas)).apply(this, arguments));
  }

  _createClass(Ideas, [{
    key: 'render',
    value: function render() {

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_react_router__["e" /* Link */],
        { to: '/ideas' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'button',
          { className: 'btn btn-primary nav-btn' },
          'Ideas'
        )
      );
    }
  }]);

  return Ideas;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Ideas);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/buttons/Logout.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Logout: {
    displayName: 'Logout'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/Logout.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/Logout.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}




var Logout = _wrapComponent('Logout')(function (_Component) {
  _inherits(Logout, _Component);

  function Logout() {
    _classCallCheck(this, Logout);

    return _possibleConstructorReturn(this, (Logout.__proto__ || Object.getPrototypeOf(Logout)).apply(this, arguments));
  }

  _createClass(Logout, [{
    key: 'render',
    value: function render() {
      var onLogoutClick = this.props.onLogoutClick;


      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_react_router__["e" /* Link */],
        { to: '/login' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'button',
          { onClick: function onClick() {
              return onLogoutClick();
            }, className: 'btn btn-primary' },
          'Logout'
        )
      );
    }
  }]);

  return Logout;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Logout);

Logout.propTypes = {
  onLogoutClick: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/buttons/Users.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Users: {
    displayName: 'Users'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/Users.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/buttons/Users.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}




var Users = _wrapComponent('Users')(function (_Component) {
  _inherits(Users, _Component);

  function Users() {
    _classCallCheck(this, Users);

    return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
  }

  _createClass(Users, [{
    key: 'render',
    value: function render() {

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_react_router__["e" /* Link */],
        { to: '/users' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'button',
          { className: 'btn btn-primary nav-btn' },
          'Users'
        )
      );
    }
  }]);

  return Users;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Users);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./components/inputs/AuthInput.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames__ = __webpack_require__("../node_modules/classnames/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_classnames__);





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  AuthInput: {
    displayName: 'AuthInput'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/inputs/AuthInput.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/components/inputs/AuthInput.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}




var AuthInput = _wrapComponent('AuthInput')(function (_Component) {
  _inherits(AuthInput, _Component);

  function AuthInput() {
    _classCallCheck(this, AuthInput);

    return _possibleConstructorReturn(this, (AuthInput.__proto__ || Object.getPrototypeOf(AuthInput)).apply(this, arguments));
  }

  _createClass(AuthInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          type = _props.type,
          className = _props.className;


      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', {
        className: __WEBPACK_IMPORTED_MODULE_4_classnames___default()('auth-input', className),
        min: '4',
        max: '50',
        type: type,
        placeholder: placeholder });
    }
  }]);

  return AuthInput;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (AuthInput);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./const.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return API_BASE_URI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ID_TOKEN_KEY; });
var API_BASE_URI = __webpack_require__.i({"NODE_ENV":"development"}).API_BASE_URI || 'http://localhost:8080';

var ID_TOKEN_KEY = 'id_token';

/***/ }),

/***/ "./index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__("../node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__("../node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_routes__ = __webpack_require__("./routes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_thunk__ = __webpack_require__("../node_modules/redux-thunk/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers_index__ = __webpack_require__("./reducers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_polyfill__ = __webpack_require__("../node_modules/babel-polyfill/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scss_app_scss__ = __webpack_require__("../scss/app.scss");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scss_app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__scss_app_scss__);










// Load SCSS


var isProduction = "development" === 'production';

// Creating store
var store = null;

if (isProduction) {
  // In production adding only thunk middleware
  var middleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_5_redux_thunk___default.a)(__WEBPACK_IMPORTED_MODULE_2_redux__["createStore"]);

  store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_6__reducers_index__["a" /* default */], middleware);
} else {
  // In development mode beside thunk
  // DevTools are added
  var _middleware = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_5_redux_thunk___default.a);
  var enhancer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["compose"])(_middleware,
  // Enable DevTools if browser extension is installed
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  );
  store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_6__reducers_index__["a" /* default */], enhancer);
}

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  __WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"],
  { store: store },
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_routes__["a" /* default */], null)
), document.getElementById('root'));

/***/ }),

/***/ "./reducers/auth.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = auth;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_auth__ = __webpack_require__("./actions/auth.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__const__ = __webpack_require__("./const.js");




function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetchingCreds: false,
    isAuthenticated: !!localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__const__["a" /* ID_TOKEN_KEY */]),
    role: 'ROLE_NONE'
  };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_auth__["f" /* LOGIN_REQUEST */]:
      return Object.assign({}, state, {
        isFetchingCreds: true,
        isAuthenticated: false
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_auth__["g" /* LOGIN_SUCCESS */]:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: true,
        role: action.role,
        loginErrorMessage: ''
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_auth__["h" /* LOGIN_FAILURE */]:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: false,
        loginErrorMessage: action.message
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_auth__["i" /* LOGOUT_SUCCESS */]:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: false,
        role: 'ROLE_NONE'
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_auth__["j" /* CLEAR_LOGIN_ERRORS */]:
      return Object.assign({}, state, {
        loginErrorMessage: ''
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_auth__["k" /* SET_ROLE */]:
      return Object.assign({}, state, {
        isAuthenticated: true,
        role: action.role
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/ideas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ideas;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_ideas__ = __webpack_require__("./actions/ideas.js");


function ideas() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetchingIdeas: false,
    ideasArr: undefined,
    ideasErrorMessage: undefined
  };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_ideas__["d" /* GET_IDEAS_REQUEST */]:
      return Object.assign({}, state, {
        isFetchingIdeas: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_ideas__["e" /* GET_IDEAS_SUCCESS */]:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasArr: action.ideas,
        ideasErrorMessage: undefined
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_ideas__["f" /* GET_IDEAS_FAILURE */]:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasErrorMessage: action.message
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__("../node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__("./reducers/auth.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ideas__ = __webpack_require__("./reducers/ideas.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register__ = __webpack_require__("./reducers/register.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__users__ = __webpack_require__("./reducers/users.js");






// We combine the reducers here so that they
// can be left split apart above
var pipelineApp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  auth: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* auth */],
  ideas: __WEBPACK_IMPORTED_MODULE_2__ideas__["a" /* ideas */],
  register: __WEBPACK_IMPORTED_MODULE_3__register__["a" /* register */],
  users: __WEBPACK_IMPORTED_MODULE_4__users__["a" /* users */]
});

/* harmony default export */ __webpack_exports__["a"] = (pipelineApp);

/***/ }),

/***/ "./reducers/register.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = register;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_register__ = __webpack_require__("./actions/register.js");


function register() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetching: false,
    registerErrorMessage: ''
  };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_register__["d" /* REGISTRATION_REQUEST */]:
      return Object.assign({}, state, {
        isFetching: true,
        user: action.creds
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_register__["e" /* REGISTRATION_FAILURE */]:
      return Object.assign({}, state, {
        isRegistrationFormOpen: true,
        registerErrorMessage: action.message
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_register__["f" /* REGISTRATION_SUCCESS */]:
      return Object.assign({}, state, {});
    case __WEBPACK_IMPORTED_MODULE_0__actions_register__["g" /* REGISTRATION_CLEAR_ERRORS */]:
      return Object.assign({}, state, {
        registerErrorMessage: ''
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./reducers/users.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = users;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_users__ = __webpack_require__("./actions/users.js");


function users() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetchingUsers: false,
    usersArr: undefined,
    usersErrorMessage: undefined
  };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["d" /* GET_USERS_REQUEST */]:
      return Object.assign({}, state, {
        isFetchingUsers: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["e" /* GET_USERS_SUCCESS */]:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        usersArr: action.users,
        usersErrorMessage: undefined
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["f" /* GET_USERS_FAILURE */]:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        usersErrorMessage: action.message
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["g" /* UPDATE_USER_REQUEST */]:
      return Object.assign({}, state, {
        isFetchingUsers: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["h" /* UPDATE_USER_SUCCESS */]:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        usersArr: action.users,
        usersErrorMessage: undefined
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["i" /* UPDATE_USER_FAILURE */]:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        usersErrorMessage: action.message
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["j" /* DELETE_USERS_REQUEST */]:
      return Object.assign({}, state, {
        isFetchingUsers: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["k" /* DELETE_USERS_SUCCESS */]:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        usersArr: action.users,
        usersErrorMessage: undefined
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_users__["l" /* DELETE_USERS_FAILURE */]:
      return Object.assign({}, state, {
        isFetchingUsers: false,
        usersErrorMessage: action.message
      });
    default:
      return state;
  }
}

/***/ }),

/***/ "./routes.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export routeCodes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__const__ = __webpack_require__("./const.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_App__ = __webpack_require__("./views/App.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_LoginFull__ = __webpack_require__("./views/LoginFull.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__views_Register__ = __webpack_require__("./views/Register.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_Users__ = __webpack_require__("./views/Users.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_Ideas__ = __webpack_require__("./views/Ideas.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__views_Auth__ = __webpack_require__("./views/Auth/index.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Routes: {
    displayName: 'Routes'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/routes.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/routes.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}













var publicPath = '/';

var routeCodes = {
  DASHBOARD: publicPath,
  ABOUT: publicPath + 'about'
};

function requireAuth(nextState, replace) {
  if (!localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__const__["a" /* ID_TOKEN_KEY */])) {
    replace({
      pathname: '/auth'
    });
  }
}

function requireNotAuth(nextState, replace) {
  if (localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__const__["a" /* ID_TOKEN_KEY */])) {
    replace({
      pathname: '/ideas'
    });
  }
}

var Routes = _wrapComponent('Routes')(function (_Component) {
  _inherits(Routes, _Component);

  function Routes() {
    _classCallCheck(this, Routes);

    return _possibleConstructorReturn(this, (Routes.__proto__ || Object.getPrototypeOf(Routes)).apply(this, arguments));
  }

  _createClass(Routes, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4_react_router__["a" /* Router */],
        { history: __WEBPACK_IMPORTED_MODULE_4_react_router__["b" /* browserHistory */] },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4_react_router__["c" /* Route */],
          { path: "/", component: __WEBPACK_IMPORTED_MODULE_6__views_App__["a" /* default */] },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["d" /* IndexRoute */], { path: '', component: __WEBPACK_IMPORTED_MODULE_11__views_Auth__["a" /* default */], onEnter: requireNotAuth }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["c" /* Route */], { path: "/auth", component: __WEBPACK_IMPORTED_MODULE_11__views_Auth__["a" /* default */], onEnter: requireNotAuth }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["c" /* Route */], { path: "/login", component: __WEBPACK_IMPORTED_MODULE_7__views_LoginFull__["a" /* default */], onEnter: requireNotAuth }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["c" /* Route */], { path: "/register", component: __WEBPACK_IMPORTED_MODULE_8__views_Register__["a" /* default */] }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["c" /* Route */], { path: "/users", component: __WEBPACK_IMPORTED_MODULE_9__views_Users__["a" /* default */], onEnter: requireAuth }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_router__["c" /* Route */], { path: "/ideas", component: __WEBPACK_IMPORTED_MODULE_10__views_Ideas__["a" /* default */], onEnter: requireAuth })
        )
      );
    }
  }]);

  return Routes;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Routes);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Navbar__ = __webpack_require__("./components/Navbar.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_auth__ = __webpack_require__("./actions/auth.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  App: {
    displayName: 'App'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/App.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/App.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}







var App = _wrapComponent('App')(function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          isAuthenticated = _props.isAuthenticated,
          loginErrorMessage = _props.loginErrorMessage,
          role = _props.role;


      if (isAuthenticated && role === 'ROLE_NONE') {
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_auth__["d" /* setRoleFromJwt */])());
      }

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_Navbar__["a" /* default */], {
          isAuthenticated: isAuthenticated,
          loginErrorMessage: loginErrorMessage,
          dispatch: dispatch,
          role: role
        }),
        this.props.children
      );
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

App.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  usersArr: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].array,
  ideasArr: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].array,
  isAuthenticated: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].bool.isRequired,
  loginErrorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string,
  registerErrorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string,
  role: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string
};

function mapStateToProps(state) {
  var auth = state.auth,
      register = state.register,
      users = state.users;
  var usersArr = users.usersArr,
      isFetchingUsers = users.isFetchingUsers;
  var registerErrorMessage = register.registerErrorMessage;
  var isAuthenticated = auth.isAuthenticated,
      loginErrorMessage = auth.loginErrorMessage,
      role = auth.role;


  return {
    usersArr: usersArr,
    isAuthenticated: isAuthenticated,
    loginErrorMessage: loginErrorMessage,
    registerErrorMessage: registerErrorMessage,
    role: role,
    isFetchingUsers: isFetchingUsers
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps)(App));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Auth/Content.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_inputs_AuthInput__ = __webpack_require__("./components/inputs/AuthInput.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_buttons_CommonButton__ = __webpack_require__("./components/buttons/CommonButton.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Content: {
    displayName: 'Content'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/Content.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/Content.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}







var Content = _wrapComponent('Content')(function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
  }

  _createClass(Content, [{
    key: 'buttonClickHandler',
    value: function buttonClickHandler() {
      console.log('auth button click');
      console.log(this.loginUsername);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          name = _props.activeTab.name,
          tabData = _props.tabData;

      var loginTabMark = name === tabData[0].name ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'section',
        { className: 'panel' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'item-container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_inputs_AuthInput__["a" /* default */], { ref: function ref(el) {
              _this2.loginUsername = el;
            }, placeholder: 'User Name', type: 'text' })
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'item-container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_inputs_AuthInput__["a" /* default */], { placeholder: 'Password', type: 'password' })
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'item-container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_buttons_CommonButton__["a" /* default */], { title: 'Login', className: 'auth-button', onClick: function onClick() {
              return _this2.buttonClickHandler();
            } })
        )
      ) : null;
      var registerTabMark = name === tabData[1].name ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'section',
        { className: 'panel' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'item-container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_inputs_AuthInput__["a" /* default */], { placeholder: 'User Name', type: 'text' }),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_inputs_AuthInput__["a" /* default */], { placeholder: 'User Name', type: 'text' })
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'item-container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_inputs_AuthInput__["a" /* default */], { placeholder: 'Password', type: 'password' })
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'item-container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_buttons_CommonButton__["a" /* default */], { title: 'Login', className: 'auth-button', onClick: function onClick() {
              return _this2.buttonClickHandler();
            } })
        )
      ) : null;

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        null,
        loginTabMark,
        registerTabMark
      );
    }
  }]);

  return Content;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Content);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Auth/Tab.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Tab: {
    displayName: 'Tab'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/Tab.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/Tab.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}





var Tab = _wrapComponent('Tab')(function (_Component) {
  _inherits(Tab, _Component);

  function Tab() {
    _classCallCheck(this, Tab);

    return _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).apply(this, arguments));
  }

  _createClass(Tab, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isActive = _props.isActive,
          handleClick = _props.handleClick;

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'li',
        { onClick: function onClick() {
            return handleClick();
          }, className: isActive ? "active" : null },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'a',
          { href: '#' },
          this.props.data.name
        )
      );
    }
  }]);

  return Tab;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Tab);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Auth/Tabs.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tab__ = __webpack_require__("./views/Auth/Tab.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Tabs: {
    displayName: 'Tabs'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/Tabs.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/Tabs.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}






var Tabs = _wrapComponent('Tabs')(function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          tabData = _props.tabData,
          activeTab = _props.activeTab,
          changeTab = _props.changeTab;

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'ul',
        { className: 'nav nav-tabs' },
        tabData.map(function (tab) {
          return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Tab__["a" /* default */], { key: tab.name, data: tab, isActive: activeTab === tab, handleClick: function handleClick() {
              return changeTab(tab);
            } });
        }.bind(this))
      );
    }
  }]);

  return Tabs;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

/* harmony default export */ __webpack_exports__["a"] = (Tabs);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Auth/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Tabs__ = __webpack_require__("./views/Auth/Tabs.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Content__ = __webpack_require__("./views/Auth/Content.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Auth: {
    displayName: 'Auth'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/index.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Auth/index.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}








var tabData = [{ name: 'Login', isActive: true }, { name: 'Register', isActive: false }];

var Auth = _wrapComponent('Auth')(function (_Component) {
  _inherits(Auth, _Component);

  function Auth() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Auth);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Auth.__proto__ || Object.getPrototypeOf(Auth)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeTab: tabData[0]
    }, _this.handleClick = function (tab) {
      _this.setState({ activeTab: tab });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Auth, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'auth-container' },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'p',
              { className: 'auth-title no-margin-b' },
              'Log in to your IDEX Account'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'p',
              { className: 'auth-sub-title' },
              'Your  account is your portal to all things! '
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'tab-container' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Tabs__["a" /* default */], { activeTab: this.state.activeTab, changeTab: this.handleClick, tabData: tabData }),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Content__["a" /* default */], { activeTab: this.state.activeTab, tabData: tabData })
            )
          )
        )
      );
    }
  }]);

  return Auth;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { dispatch: dispatch };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(Auth));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Ideas.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_modal__ = __webpack_require__("../node_modules/react-modal/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_IdeaRow__ = __webpack_require__("./components/IdeaRow.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_AddIdeaModal__ = __webpack_require__("./components/AddIdeaModal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__actions_ideas__ = __webpack_require__("./actions/ideas.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Ideas: {
    displayName: 'Ideas'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Ideas.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Ideas.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}









var Ideas = _wrapComponent('Ideas')(function (_Component) {
  _inherits(Ideas, _Component);

  function Ideas(props) {
    _classCallCheck(this, Ideas);

    var _this = _possibleConstructorReturn(this, (Ideas.__proto__ || Object.getPrototypeOf(Ideas)).call(this, props));

    _this.handleEdit = _this.handleEdit.bind(_this);
    _this.handleOpenModal = _this.handleOpenModal.bind(_this);
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    _this.addIdea = _this.addIdea.bind(_this);

    _this.state = {
      showModal: false
    };
    return _this;
  }

  _createClass(Ideas, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          isFetchingIdeas = _props.isFetchingIdeas;


      if (!isFetchingIdeas) {
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__actions_ideas__["a" /* fetchIdeas */])());
      }
    }
  }, {
    key: 'handleOpenModal',
    value: function handleOpenModal() {
      console.log('open modal');
      this.setState({ showModal: true });
    }
  }, {
    key: 'handleCloseModal',
    value: function handleCloseModal() {
      console.log('close modal');
      this.setState({ showModal: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var rows = [];

      if (this.props.ideasArr) {
        this.props.ideasArr.forEach(function (idea) {
          rows.push(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_IdeaRow__["a" /* default */], { key: idea.id, idea: idea }));
        });
      }

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        { className: 'ideas-container' },
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_5_react_modal___default.a,
          {
            isOpen: this.state.showModal,
            contentLabel: 'onRequestClose Example',
            onRequestClose: this.handleCloseModal,
            className: 'Modal',
            overlayClassName: 'Overlay'
          },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_AddIdeaModal__["a" /* default */], { handleCloseModal: this.handleCloseModal, addIdea: this.addIdea })
        ),
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'ideas-list' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'span',
            { className: 'col-md-1 idea-header' },
            'Votes'
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'span',
            { className: 'col-md-1 idea-header' },
            'Title'
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'span',
            { className: 'col-md-8 idea-header' },
            'Description'
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'col-md-2' },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'button',
              { onClick: function onClick() {
                  return _this2.handleOpenModal();
                } },
              'Add Idea'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('hr', null),
          rows
        )
      );
    }
  }, {
    key: 'addIdea',
    value: function addIdea(idea) {
      console.log('idea', idea);
      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__actions_ideas__["b" /* addIdea */])(idea));
    }
  }, {
    key: 'handleEdit',
    value: function handleEdit(rowBeforeObject, updatedValueKey, updatedValue) {
      rowBeforeObject[updatedValueKey] = updatedValue;

      var updatedIdea = {
        title: rowBeforeObject.title,
        description: rowBeforeObject.description,
        stage: rowBeforeObject.stage
      };

      var dispatch = this.props.dispatch;


      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__actions_ideas__["c" /* updateIdea */])(updatedIdea));
    }
  }], [{
    key: 'handleBeforeSaveCell',
    value: function handleBeforeSaveCell(rowBeforeObject, updatedValueKey, updatedValue) {
      return rowBeforeObject[updatedValueKey] + '' !== updatedValue;
    }
  }]);

  return Ideas;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

Ideas.propTypes = {
  ideasArr: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].array,
  ideasErrorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string,
  isFetchingIdeas: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].bool.isRequired,
  role: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired
};

function mapStateToProps(state) {
  var ideas = state.ideas,
      auth = state.auth;
  var isFetchingIdeas = ideas.isFetchingIdeas,
      ideasArr = ideas.ideasArr,
      ideasErrorMessage = ideas.ideasErrorMessage;
  var role = auth.role;


  return {
    isFetchingIdeas: isFetchingIdeas, role: role, ideasArr: ideasArr, ideasErrorMessage: ideasErrorMessage
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps)(Ideas));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/LoginFull.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_auth__ = __webpack_require__("./actions/auth.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  LoginFull: {
    displayName: 'LoginFull'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/LoginFull.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/LoginFull.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}







var LoginFull = _wrapComponent('LoginFull')(function (_Component) {
  _inherits(LoginFull, _Component);

  function LoginFull() {
    _classCallCheck(this, LoginFull);

    return _possibleConstructorReturn(this, (LoginFull.__proto__ || Object.getPrototypeOf(LoginFull)).apply(this, arguments));
  }

  _createClass(LoginFull, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var errorMessage = this.props.errorMessage;


      var errorMessages = void 0;

      if (!!errorMessage) {
        if (typeof errorMessage === 'string') {
          errorMessages = errorMessage.split('\n').map(function (message, key) {
            return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'li',
              { key: key, className: 'red' },
              message
            );
          });
        }
      }

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'auth-container' },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'p',
              { className: 'text-center auth-title no-margin-b' },
              'Log in to your IDEX Account'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'p',
              { className: 'text-center auth-sub-title' },
              'Your  account is your portal to all things! '
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Username'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { ref: 'username1', className: 'form-control', min: '4', max: '50', type: 'text', placeholder: 'Username', id: 'username' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Password'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { ref: 'password', className: 'form-control', min: '4', max: '100', type: 'password', placeholder: 'Password', id: 'password' })
              )
            ),
            errorMessages && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'ul',
              null,
              errorMessages
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'button',
                { onClick: function onClick(event) {
                    return _this2.handleLoginClick(event);
                  }, className: 'btn btn-primary' },
                'Log In'
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'container text-center' },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('hr', null),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'h4',
              null,
              'No account? ',
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_5_react_router__["e" /* Link */],
                { to: '/register' },
                'Register'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'handleLoginClick',
    value: function handleLoginClick(event) {
      var username = this.refs.username;
      var password = this.refs.password;
      var creds = { username: username.value.trim(), password: password.value.trim() };

      var errorMessage = LoginFull.validateCreds(creds);

      if (errorMessage.length > 0) {
        this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_auth__["b" /* handleLoginError */])(errorMessage));

        return;
      }

      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_auth__["c" /* loginUser */])(creds));
    }
  }], [{
    key: 'validateCreds',
    value: function validateCreds(creds) {
      var errorMessage = '';

      if (creds.username.length < 4 || creds.username.length > 50) {
        errorMessage += "Username must be 4-50 characters.\n";
      }

      if (creds.password.length < 4 || creds.password.lastName > 100) {
        errorMessage += "Password must be between 4-100 characters.\n";
      }

      if (errorMessage.endsWith('\n')) {
        errorMessage = errorMessage.substr(0, errorMessage.length - 1);
      }

      return errorMessage;
    }
  }]);

  return LoginFull;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

function mapStateToProps(state) {
  var auth = state.auth;
  var isAuthenticated = auth.isAuthenticated,
      loginErrorMessage = auth.loginErrorMessage;


  return {
    isAuthenticated: isAuthenticated,
    errorMessage: loginErrorMessage
  };
}

LoginFull.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  isAuthenticated: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].bool,
  errorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string
};

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps)(LoginFull));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Register.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router__ = __webpack_require__("../node_modules/react-router/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_register__ = __webpack_require__("./actions/register.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Register: {
    displayName: 'Register'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Register.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Register.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}







var Register = _wrapComponent('Register')(function (_Component) {
  _inherits(Register, _Component);

  function Register() {
    _classCallCheck(this, Register);

    return _possibleConstructorReturn(this, (Register.__proto__ || Object.getPrototypeOf(Register)).apply(this, arguments));
  }

  _createClass(Register, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var errorMessage = this.props.errorMessage;

      var errorMessages = void 0;

      if (!!errorMessage) {
        errorMessages = errorMessage.split('\n').map(function (message, key) {
          return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'li',
            { key: key, className: 'red' },
            message
          );
        });
      }

      return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'container col-md-offset-2 col-sm-4' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'container' },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'h1',
              { className: 'text-center' },
              'Register'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'First Name'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'text', min: '1', max: '50', placeholder: 'First Name (1-50 Characters)', ref: 'firstName' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Last Name'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'text', min: '1', max: '50', placeholder: 'Last Name (1-50 Characters)', ref: 'lastName' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Email'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'email', placeholder: 'Email', ref: 'email' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Confirm Email'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'email', placeholder: 'Confirm Email', ref: 'confirmEmail' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Username'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'text', min: '4', max: '50', placeholder: 'Username (4-50 Characters)', ref: 'username' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Password'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'password', min: '4', max: '100', placeholder: 'Password (4-100 Characters)', ref: 'password' })
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'label',
                { className: 'col-2 col-form-label' },
                'Confirm Password'
              ),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'div',
                { className: 'col-10' },
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { className: 'form-control', type: 'password', min: '4', max: '100', placeholder: 'Confirm Password (4-100 Characters)', ref: 'confirmPassword' })
              )
            ),
            errorMessages && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'ul',
              null,
              errorMessages
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'form-group row' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'button',
                { onClick: function onClick(event) {
                    return _this2.handleRegisterClick(event);
                  }, className: 'btn btn-primary register-full-btn' },
                'Register'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'div',
              { className: 'container text-center' },
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('hr', null),
              __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                'h4',
                null,
                'Already have an account? ',
                __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_5_react_router__["e" /* Link */],
                  { to: '/login' },
                  'Log In'
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'handleRegisterClick',
    value: function handleRegisterClick(event) {
      var firstName = this.refs.firstName;
      var lastName = this.refs.lastName;
      var username = this.refs.username;
      var email = this.refs.email;
      var confirmEmail = this.refs.confirmEmail;
      var password = this.refs.password;
      var confirmPassword = this.refs.confirmPassword;

      var creds = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        confirmEmail: confirmEmail.value.trim(),
        password: password.value.trim(),
        confirmPassword: confirmPassword.value.trim()
      };

      var errorMessage = Register.validateCreds(creds);

      if (errorMessage.length > 0) {
        this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_register__["a" /* handleRegistrationError */])(errorMessage));

        return;
      }

      this.props.dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_register__["b" /* registerUser */])(creds));
    }
  }], [{
    key: 'validateCreds',
    value: function validateCreds(creds) {
      var errorMessage = '';

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
        errorMessage += "Password must be between 4-100 characters.\n";
      }

      if (creds.password !== creds.confirmPassword) {
        errorMessage += "Passwords do not match.\n";
      }

      if (errorMessage.endsWith('\n')) {
        errorMessage = errorMessage.substr(0, errorMessage.length - 1);
      }

      return errorMessage;
    }
  }, {
    key: 'validateEmail',
    value: function validateEmail(email) {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(email);
    }
  }]);

  return Register;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

Register.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired,
  isAuthenticated: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].bool,
  errorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string
};

function mapStateToProps(state) {
  var register = state.register,
      auth = state.auth;
  var registerErrorMessage = register.registerErrorMessage;
  var isAuthenticated = auth.isAuthenticated;


  return {
    isAuthenticated: isAuthenticated,
    errorMessage: registerErrorMessage
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps)(Register));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./views/Users.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__ = __webpack_require__("../node_modules/redbox-react/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__ = __webpack_require__("../node_modules/react-transform-catch-errors/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__("../node_modules/react/react.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__ = __webpack_require__("../node_modules/react-transform-hmr/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__("../node_modules/react-redux/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__ = __webpack_require__("../node_modules/react-bootstrap-table/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_users__ = __webpack_require__("./actions/users.js");





var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Users: {
    displayName: 'Users'
  }
};

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_3__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_hmr_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Users.js',
  components: _components,
  locals: [module],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a]
});

var _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2 = __WEBPACK_IMPORTED_MODULE_1__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_react_transform_catch_errors_lib_index_js___default()({
  filename: '/Volumes/Data/Developer/ReactJS/pipeline/frontend/js/views/Users.js',
  components: _components,
  locals: [],
  imports: [__WEBPACK_IMPORTED_MODULE_2_react___default.a, __WEBPACK_IMPORTED_MODULE_0__Volumes_Data_Developer_ReactJS_pipeline_frontend_node_modules_redbox_react_lib_index_js___default.a]
});

function _wrapComponent(id) {
  return function (Component) {
    return _VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformHmrLibIndexJs2(_VolumesDataDeveloperReactJSPipelineFrontendNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
  };
}







var Users = _wrapComponent('Users')(function (_Component) {
  _inherits(Users, _Component);

  function Users(props) {
    _classCallCheck(this, Users);

    var _this = _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).call(this, props));

    _this.handleEdit = _this.handleEdit.bind(_this);
    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(Users, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          isFetchingUsers = _props.isFetchingUsers;


      if (!isFetchingUsers) {
        dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_users__["a" /* fetchUsers */])());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          usersArr = _props2.usersArr,
          role = _props2.role,
          dispatch = _props2.dispatch,
          usersErrorMessage = _props2.usersErrorMessage;


      if (usersArr) {
        usersArr.forEach(function (user) {
          user.authorities.forEach(function (authority) {
            user[authority.name] = 'true';
          });

          user.enabledString = user.enabled ? 'true' : 'false';
        });
      }

      function checkboxHandler(cell, row) {
        return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement('input', { type: 'checkbox', checked: cell === 'true', disabled: true });
      }

      var cellEditProps = {
        mode: 'dbclick',
        blurToSave: true,
        beforeSaveCell: Users.handleBeforeSaveCell,
        afterSaveCell: this.handleEdit
      };

      var options = {
        afterDeleteRow: this.handleDelete
      };

      if (typeof usersArr !== 'undefined') {
        return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'container' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            { className: 'text-center' },
            usersErrorMessage !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              'h3',
              { className: 'red' },
              usersErrorMessage
            )
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'h1',
            { className: 'text-center' },
            'Users'
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["BootstrapTable"],
            {
              data: usersArr,
              keyField: 'id',
              options: role === 'ROLE_ADMIN' ? { afterDeleteRow: this.handleDelete } : {},
              deleteRow: role === 'ROLE_ADMIN',
              selectRow: { mode: 'checkbox' },
              striped: true,
              cellEdit: cellEditProps,
              hover: true,
              condensed: true,
              search: true,
              pagination: true },
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { hidden: true, hiddenOnInsert: true, autovalue: true, dataField: 'id' },
              'Username'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'username' },
              'Username'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'firstName' },
              'First Name'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'lastName' },
              'Last Name'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'email' },
              'Email'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'ROLE_ADMIN', dataFormat: checkboxHandler, editable: role === 'ROLE_ADMIN' ? { readonly: role !== 'ROLE_ADMIN', type: 'checkbox', options: { values: role === 'true:false' } } : false },
              'Admin*'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'ROLE_USER_MANAGER', dataFormat: checkboxHandler, editable: { type: 'checkbox', options: { values: 'true:false' } } },
              'Manager'
            ),
            __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_5_react_bootstrap_table__["TableHeaderColumn"],
              { dataField: 'enabledString', dataFormat: checkboxHandler, editable: { type: 'checkbox', options: { values: 'true:false' } } },
              'Enabled'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'span',
            null,
            'Double click any field to edit it. Fields marked with a * can only be edited by admins.'
          )
        );
      } else {
        return __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
          'div',
          { className: 'text-center' },
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'h1',
            null,
            'Users'
          ),
          usersErrorMessage !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'h3',
            { className: 'red' },
            usersErrorMessage
          ),
          __WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(
            'div',
            null,
            'Loading data... If you see this for more than a few seconds, your session has expired/invalidated and you should logout then log back in.'
          )
        );
      }
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(rowKeys) {
      var dispatch = this.props.dispatch;


      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_users__["b" /* deleteUsers */])(rowKeys));
    }
  }, {
    key: 'handleEdit',
    value: function handleEdit(rowBeforeObject, updatedValueKey, updatedValue) {
      rowBeforeObject[updatedValueKey] = updatedValue;

      var updatedUser = {
        id: rowBeforeObject.id,
        username: rowBeforeObject.username,
        firstName: rowBeforeObject.firstName,
        lastName: rowBeforeObject.lastName,
        email: rowBeforeObject.email,
        enabled: typeof rowBeforeObject.enabledString !== 'undefined' && rowBeforeObject.enabledString === 'true',
        admin: typeof rowBeforeObject.ROLE_ADMIN !== 'undefined' && rowBeforeObject.ROLE_ADMIN === 'true',
        userManager: typeof rowBeforeObject.ROLE_USER_MANAGER !== 'undefined' && rowBeforeObject.ROLE_USER_MANAGER === 'true'
      };

      var dispatch = this.props.dispatch;


      dispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__actions_users__["c" /* updateUser */])(updatedUser));
    }
  }], [{
    key: 'handleBeforeSaveCell',
    value: function handleBeforeSaveCell(rowBeforeObject, updatedValueKey, updatedValue) {
      return rowBeforeObject[updatedValueKey] + '' !== updatedValue;
    }
  }]);

  return Users;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));

Users.propTypes = {
  usersArr: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].array,
  usersErrorMessage: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string,
  isFetchingUsers: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].bool.isRequired,
  role: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].string.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func.isRequired
};

function mapStateToProps(state) {
  var users = state.users,
      auth = state.auth;
  var isFetchingUsers = users.isFetchingUsers,
      usersArr = users.usersArr,
      usersErrorMessage = users.usersErrorMessage;
  var role = auth.role;


  return {
    isFetchingUsers: isFetchingUsers, role: role, usersArr: usersArr, usersErrorMessage: usersErrorMessage
  };
}

/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_react_redux__["connect"])(mapStateToProps)(Users));
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

},["./index.js"]);
//# sourceMappingURL=app-28588322cb2d4d4c58a3.js.map