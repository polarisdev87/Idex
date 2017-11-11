webpackHotUpdate(0,{

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
      dsf;
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

/***/ })

})
//# sourceMappingURL=0.28588322cb2d4d4c58a3.hot-update.js.map