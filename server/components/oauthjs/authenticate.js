'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Manjesh on 15-05-2016.
 */

module.exports = function () {
  return function (req, res, next) {
    if (_environment2.default.AUTH === 'false') {
      // OAuth Proxy - Set your user id, group_id, client_id in /server/config/local.env
      var request = req;
      request.user = _environment2.default.USER;
      return next();
    } else {
      // OAuth Authentication Middleware
      return _index2.default.authorise()(req, res, next);
    }
  };
};
//# sourceMappingURL=authenticate.js.map
