/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/case_education_verifications              ->  index
 * POST    /api/case_education_verifications              ->  create
 * GET     /api/case_education_verifications/:id          ->  show
 * PUT     /api/case_education_verifications/:id          ->  update
 * DELETE  /api/case_education_verifications/:id          ->  destroy
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

// Gets a list of CaseEducationVerifications
function index(req, res) {
  return _sqldb.CaseEducationVerification.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single CaseEducationVerification from the DB
function show(req, res) {
  return _sqldb.CaseEducationVerification.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new CaseEducationVerification in the DB
function create(req, res) {
  return _sqldb.CaseEducationVerification.create(req.body).then(function (caseTypeObj) {
    return _sqldb.Case.update({ status_id: 2 }, {
      where: { id: caseTypeObj.case_id }
    }).then(function () {
      return res.json(caseTypeObj);
    });
  }).catch(handleError(res));
}

// Updates an existing CaseEducationVerification in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.CaseEducationVerification.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a CaseEducationVerification from the DB
function destroy(req, res) {
  return _sqldb.CaseEducationVerification.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=case_education_verification.controller.js.map
