'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _sqldb = require('../../sqldb');

var _oauthjs = require('../../components/oauthjs');

var _oauthjs2 = _interopRequireDefault(_oauthjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/authorise              ->  index
 * POST    /api/authorise              ->  create
 * GET     /api/authorise/:id          ->  show
 * PUT     /api/authorise/:id          ->  update
 * DELETE  /api/authorise/:id          ->  destroy
 */

function handleError(res, argStatusCode, err) {
  var statusCode = argStatusCode || 500;
  return res.status(statusCode).json(err);
}

function index(req, res) {
  return _sqldb.App.findOne({
    where: {
      client_id: req.query.client_id,
      redirect_uri: req.query.redirect_uri
    },
    attributes: ['id', 'name']
  }).then(function (model) {
    if (!model) return res.status(404).json({ error: 'Invalid Client' });
    return res.json(model);
  }).catch(function (err) {
    return handleError(res, 500, err);
  });
}

exports.create = _oauthjs2.default.authCodeGrant(function (req, callback) {
  if (req.body.allow !== 'true') return callback(null, false);
  return callback(null, true, req.user);
});
//# sourceMappingURL=authorise.controller.js.map
