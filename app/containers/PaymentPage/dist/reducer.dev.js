"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.initialState = void 0;

var _immer = _interopRequireDefault(require("immer"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  error: null,
  isError: false,
  isSuccess: false,
  pgsData: []
};
exports.initialState = initialState;

var paymentGatewaysReducer = function paymentGatewaysReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _immer["default"])(state, function (draft) {
    switch (action.type) {
      // * Account
      case _constants.PAYMENT_GATEWAYS_REQUEST:
        draft.loading = true;
        draft.pgsData = {};
        draft.isError = false;
        draft.isSuccess = false;
        break;

      case _constants.PAYMENT_GATEWAYS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccess = true;
        break;

      case _constants.PAYMENT_GATEWAYS_SUCCESS:
        draft.loading = false;
        draft.pgsData = action.payload;
        draft.isError = false;
        draft.isSuccess = true;
        break;

      default:
        return _objectSpread({}, draft);
    }
  });
};

var _default = paymentGatewaysReducer;
exports["default"] = _default;