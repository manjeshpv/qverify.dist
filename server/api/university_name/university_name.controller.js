/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/university_names              ->  index
 * POST    /api/university_names              ->  create
 * GET     /api/university_names/:id          ->  show
 * PUT     /api/university_names/:id          ->  update
 * DELETE  /api/university_names/:id          ->  destroy
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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sqldb = require('../../sqldb');

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

// Gets a list of UniversityNames
function index(req, res) {
  return _sqldb.UniversityName.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single UniversityName from the DB
function show(req, res) {
  return _sqldb.UniversityName.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new UniversityName in the DB
function create(req, res) {
  return _sqldb.UniversityName.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing UniversityName in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.UniversityName.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a UniversityName from the DB
function destroy(req, res) {
  return _sqldb.UniversityName.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=university_name.controller.js.map
