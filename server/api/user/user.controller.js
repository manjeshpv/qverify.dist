/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.login = login;
exports.register = register;
exports.client = client;
exports.vendor = vendor;
exports.me = me;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rp = require('request-promise');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    return entity.updateAttributes(updates).then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Users
function index(req, res) {
  return _sqldb.User.findAll({
    attributes: ['id', 'name'],
    where: whereClause,
    include: [{ model: _sqldb.Company, attributes: ['name'] }]
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single User from the DB
function show(req, res) {
  return _sqldb.User.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new User in the DB
function create(req, res) {

  return _sqldb.User.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing User in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.User.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a User from the DB
function destroy(req, res) {
  return _sqldb.User.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

// Creates a new User in the DB
function login(req, res) {
  //console.log(req.params);
  //console.log(req.query);
  //console.log(req.body);
  if (!req.body) return handleError(res, 400, { message: "Bad Request" });
  return _sqldb.User.find({
    where: { username: req.body.username },
    include: [{ model: _sqldb.Company }]
  }).then(function (user) {
    var oAuthChatOptions = {
      method: 'POST',
      url: _environment2.default.DOMAIN + '/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      auth: {
        user: 'accounts',
        pass: 'accountssecret'
      },
      form: {
        grant_type: 'password',
        username: req.body.username,
        password: req.body.password
      }
    };
    rp(oAuthChatOptions).then(function (body) {
      return res.json(body);
    }).catch(function (err) {
      return res.status(500).send(err);
    });
  }).catch(function (err) {
    console.log(err);
    return res.status(500).send(err);
  });
}
function register(req, res) {
  //console.log(req.params);
  //console.log(req.query);
  //console.log(req.body);

  return _sqldb.User.create(req.body).then(function (user) {
    return res.json(user);
  }).catch(function (err) {
    console.log(err);
    return res.status(404).json("Invalid data");
  });
}

function client(req, res) {
  return _sqldb.User.findAll({
    include: [{ model: _sqldb.Company, where: { user_type_id: 2 } }]
  }).then(respondWithResult(res)).catch(handleError(res));
}

function vendor(req, res) {
  return _sqldb.User.findAll({
    include: [{ model: _sqldb.Company, where: { user_type_id: 3 } }]
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Users
function me(req, res) {
  return res.json(req.user || { message: "not authorized" });
}
//# sourceMappingURL=user.controller.js.map
