/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/case_address_verifications              ->  index
 * POST    /api/case_address_verifications              ->  create
 * GET     /api/case_address_verifications/:id          ->  show
 * PUT     /api/case_address_verifications/:id          ->  update
 * DELETE  /api/case_address_verifications/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.index = index;
exports.show = show;
exports.getFile = getFile;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

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

function handleError(res, statusCode, err) {
  console.log(err);
  return res.status(statusCode).send(err);
}

// Gets a list of CaseAddressVerifications
function index(req, res) {
  return _sqldb.CaseAddressVerification.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single CaseAddressVerification from the DB
function show(req, res) {
  return _sqldb.CaseAddressVerification.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function getFile(req, res) {
  return _sqldb.CaseAddressVerification.findById(req.params.id).then(function (caseObj) {
    console.log(caseObj.image);
    if (!caseObj.image) return res.status(404).json({ message: 'not found' });
    return _sqldb.Minio.downloadLink({
      object: caseObj.image,
      download: true
    }).then(function (link) {
      return res.redirect(link);
    });
  }).catch(function (err) {
    return handleError(res, 500, err);
  });
}

// Creates a new CaseAddressVerification in the DB
function create(req, res) {
  req.body.status_id = 1;
  return _sqldb2.default.CaseAddressVerification.create(req.body).then(function (caseObj) {
    var _req$body$img = req.body.img;
    var base64String = _req$body$img.base64;
    var filename = _req$body$img.filename;

    var extention = filename.substring(filename.lastIndexOf('.') + 1);

    // only upload if valid file extension
    if (~['doc', 'docx', 'pdf', 'rtf', 'txt'].indexOf(extention)) {
      var _ret = function () {

        var rangeFolder = caseObj.id - caseObj.id % 10000;
        var minioObject = {
          // object: 'cases/0/5/5.pdf'
          object: 'case_address_verifications/' + rangeFolder + '/' + caseObj.id + '/' + caseObj.id + '.' + extention.toLowerCase(),
          base64String: base64String
        };

        return {
          v: _sqldb.Minio.base64Upload(minioObject).then(function (re) {
            return caseObj.update({ image: minioObject.object }).then(function () {

              console.log("file saved success");
              return _sqldb.Case.update({ status_id: 2 }, {
                where: { id: caseObj.case_id }
              }).then(function () {
                return res.json(caseObj);
              }).catch(function (err) {
                return handleError(res, 500, err);
              });
            });
          }).catch(function (err) {
            return handleError(res, 500, err);
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }
    return res.json(caseObj);
  }).catch(function (err) {
    return handleError(res, 500, err);
  });
}

// Updates an existing CaseAddressVerification in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.CaseAddressVerification.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a CaseAddressVerification from the DB
function destroy(req, res) {
  return _sqldb.CaseAddressVerification.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=case_address_verification.controller.js.map
