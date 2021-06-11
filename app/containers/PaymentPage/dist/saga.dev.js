"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaymentGateways = getPaymentGateways;
exports["default"] = paymentGatewaysSaga;

var _effects = require("redux-saga/effects");

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _request = _interopRequireDefault(require("../../utils/request"));

var _actions = require("./actions");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getPaymentGateways),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(paymentGatewaysSaga);

// * Account
function getPaymentGateways() {
  var requestUrl, response, error;
  return regeneratorRuntime.wrap(function getPaymentGateways$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          requestUrl = process.env.BASE_W_URL + '/wp-json/cocart/v1/pgs';
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_request["default"], requestUrl, {
            method: 'GET'
          });

        case 4:
          response = _context.sent;
          _context.next = 7;
          return (0, _effects.put)((0, _actions.paymentGatewaysSuccess)(response.data));

        case 7:
          _context.next = 16;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          _context.next = 13;
          return _context.t0;

        case 13:
          error = _context.sent;
          _context.next = 16;
          return (0, _effects.put)((0, _actions.paymentGatewaysFailure)(error));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 9]]);
}

function paymentGatewaysSaga() {
  return regeneratorRuntime.wrap(function paymentGatewaysSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)(_constants.PAYMENT_GATEWAYS_REQUEST, getPaymentGateways);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}