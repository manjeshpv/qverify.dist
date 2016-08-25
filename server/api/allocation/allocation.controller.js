/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/allocations              ->  index
 * POST    /api/allocations              ->  create
 * GET     /api/allocations/:id          ->  show
 * PUT     /api/allocations/:id          ->  update
 * DELETE  /api/allocations/:id          ->  destroy
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
exports.vendorUpload = vendorUpload;
exports.byStatusId = byStatusId;

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
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Allocations
function index(req, res) {
  if (!req.user.id) return res.status(404).json([{ message: "not authorized" }]);
  var whereClause = void 0;
  if (req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return _sqldb.Allocation.findAll({
    where: whereClause,
    include: [{
      model: _sqldb.Case,
      include: [_sqldb2.default.User, _sqldb2.default.Status, _sqldb2.default.CaseType]
    }, { model: _sqldb2.default.User }, { model: _sqldb2.default.AllocationStatus }]
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Allocation from the DB
function show(req, res) {
  return _sqldb.Allocation.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Allocation in the DB
function create(req, res) {
  req.body.allocation_status_id = 1;
  return _sqldb.Allocation.create(req.body).then(function (allocation) {
    _sqldb.Case.update({ status_id: 1 }, {
      where: {
        id: req.body.case_id
      }
    }).then(function () {
      return res.json(allocation);
    });
  }).catch(handleError(res));
}

// Updates an existing Allocation in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Allocation.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Allocation from the DB
function destroy(req, res) {
  return _sqldb.Allocation.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

// Gets a list of Allocations
function vendorUpload(req, res) {
  if (!req.user.id) return res.status(404).json([{ message: "not authorized" }]);
  return _sqldb.Allocation.findAll({
    where: {
      user_id: req.user.id
    },
    include: [{
      model: _sqldb.Case,
      where: { status_id: 3 },
      include: [_sqldb2.default.User, _sqldb2.default.Status, _sqldb2.default.CaseType]
    }, { model: _sqldb2.default.User }, { model: _sqldb2.default.AllocationStatus }]
  }).then(respondWithResult(res)).catch(handleError(res));
}

function byStatusId(req, res) {
  if (!req.user.id) return res.status(404).json([{ message: "not authorized" }]);
  if (!req.params.status_id) return res.status(404).json([{ message: "Invalid request" }]);
  var whereClause = void 0;
  if (req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return _sqldb.Allocation.findAll({
    where: whereClause,
    include: [{
      model: _sqldb.Case,
      where: { status_id: req.params.status_id.split(',') },
      include: [_sqldb2.default.User, _sqldb2.default.Status, _sqldb2.default.CaseType]
    }, { model: _sqldb2.default.User }, { model: _sqldb2.default.AllocationStatus }]
  }).then(respondWithResult(res)).catch(handleError(res));
}
//# sourceMappingURL=allocation.controller.js.map
