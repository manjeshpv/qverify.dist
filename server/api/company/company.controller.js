/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/companys              ->  index
 * POST    /api/companys              ->  create
 * GET     /api/companys/:id          ->  show
 * PUT     /api/companys/:id          ->  update
 * DELETE  /api/companys/:id          ->  destroy
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
exports.companyUsers = companyUsers;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sqldb = require('../../sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Gets a list of Companys
function index(req, res) {
  return _sqldb.Company.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Company from the DB
function show(req, res) {
  return _sqldb.Company.find({
    where: {
      id: req.params.id
    },
    include: [_sqldb2.default.Location]
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Company in the DB
function create(req, res) {
  //console.log('Body :'+  req.body);
  return _sqldb.Company.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Company in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Company.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Company from the DB
function destroy(req, res) {
  return _sqldb.Company.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function companyUsers(req, res) {
  console.log(req.params.id);
  return _sqldb.User.findAll({
    where: {
      company_id: req.params.id
    }
  }).then(function (users) {
    if (!users) return res.status(404).json({ message: "Resource not found" });
    return res.json(users);
  }).catch(function (err) {
    return console.log(err);
  });
}
//# sourceMappingURL=company.controller.js.map
