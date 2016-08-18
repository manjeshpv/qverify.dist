/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cases              ->  index
 * POST    /api/cases              ->  create
 * GET     /api/cases/:id          ->  show
 * PUT     /api/cases/:id          ->  update
 * DELETE  /api/cases/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.vendorUploaded = vendorUploaded;
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
  statusCode = statusCode || 500;
  res.status(statusCode).send(err);
}

// Gets a list of Cases
function index(req, res) {
  if (!req.user.id) return res.status(404).json([{ message: "not authorized" }]);
  var whereClause = void 0;
  if (req.user.Company.user_type_id != 1) {
    whereClause = {
      user_id: req.user.id
    };
  }
  return _sqldb.Case.findAll({
    where: whereClause,
    include: [_sqldb.Status, _sqldb.CaseType]
  }).then(respondWithResult(res)).catch(function (err) {
    return handleError(res, 500, err);
  });
}

// Gets a single Case from the DB
function show(req, res) {
  return _sqldb.Case.find({
    where: {
      id: req.params.id
    },
    include: [{ model: _sqldb.CaseCriminalVerification, include: [_sqldb2.default.Designation] }, { model: _sqldb.CaseAddressVerification, include: [_sqldb2.default.HouseType] }, { model: _sqldb.CaseEducationVerification, include: [_sqldb2.default.Degree, _sqldb2.default.Designation] }, { model: _sqldb.CaseSiteVerification, include: [_sqldb2.default.Designation] }, { model: _sqldb.User }]
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(function (err) {
    return handleError(res, 500, err);
  });
}

// Gets a single Case from the DB
function vendorUploaded(req, res) {
  return _sqldb.Case.findAll({
    include: [_sqldb.Status],
    where: { status_id: [2, 3, 4] }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(function (err) {
    return handleError(res, 500, err);
  });
}

function getFile(req, res) {
  return _sqldb.Case.findById(req.params.id).then(function (caseObj) {
    return res.json(caseObj.pdf);
    return _sqldb.Minio.downloadLink({
      object: caseObj.pdf
    }).then(function (link) {
      return res.redirect(link);
    });
  }).catch(function (err) {
    return handleError(res, 500, err);
  });
}

// Creates a new Case in the DB
function create(req, res) {
  req.body.status_id = 1;
  return _sqldb2.default.Case.create(req.body).then(function (caseObj) {
    /* Start Minio */
    var _req$body$logo = req.body.logo;
    var base64String = _req$body$logo.base64;
    var filename = _req$body$logo.filename;

    var extention = filename.substring(filename.lastIndexOf('.') + 1);

    // only upload if valid file extension
    if (~['doc', 'docx', 'pdf', 'rtf', 'txt', 'png', 'jpeg'].indexOf(extention)) {
      (function () {

        var rangeFolder = caseObj.id - caseObj.id % 100000;
        var minioObject = {
          // object: 'cases/0/5/5.pdf'
          object: 'cases/' + rangeFolder + '/' + caseObj.id + '/' + caseObj.id + '.' + extention.toLowerCase(),
          base64String: base64String
        };

        // Async
        _sqldb.Minio.base64Upload(minioObject).then(function (re) {
          return caseObj.update({ pdf: minioObject.object });
          console.log("file saved success");
        }).catch(function (err) {
          return console.log(err);
        });
      })();
    }

    /* End Minio */

    var casePr = void 0;
    switch (req.body.case_type_id) {
      case 1:
        req.body.address = {};
        req.body.address.case_id = caseObj.id;
        casePr = _sqldb2.default.CaseAddressVerification.create(req.body.address);
        break;
      case 2:
        req.body.criminal.case_id = caseObj.id;
        casePr = _sqldb2.default.CaseCriminalVerification.create(req.body.criminal);
        break;
      case 3:
        req.body.education.case_id = caseObj.id;
        casePr = _sqldb2.default.CaseEducationVerification.create(req.body.education);
        break;
      case 4:
        req.body.site = {};
        req.body.site.case_id = caseObj.id;
        casePr = _sqldb2.default.CaseSiteVerification.create(req.body.site);
        break;
    }

    return casePr.then(function () {
      return res.json(caseObj);
    });
  }).catch(function (err) {
    return handleError(res, 500, err);
  });
}
//export function update(req, res) {
//  var model = req.body;
//  var uploadFlag = model.flag;
//  if(uploadFlag == true){
//    // upload state file if exists
//    if (req.body.case && req.body.case.filename) {
//      const { base64, filename } = req.body.case;
//      const extention = filename.substring(filename.lastIndexOf('.') + 1);
//
//      // only upload if valid file extension
//      if (~['doc', 'docx', 'pdf', 'rtf', 'txt'].indexOf(extention)) {
//        const rangeFolder = model.applicant_id - (model.applicant_id % 10000);
//        const path = `Applicants/${rangeFolder}/${model.applicant_id}/` +
//          `${moment().format('D-MM-YY-h_mm_ss')}.${extention}`;
//
//        // Write file to QDMS
//        fs.writeFile(`${config.QDMS_PATH}/${path}`, base64, 'base64', err => {
//          if (err) return logger.error(model.id, err);
//          return db.Case.build({
//              applicant_state_id: model.applicant_state_id,
//              path, created_by: req.user.id,
//            })
//            .save()
//            .then(stateFile => {
//              return stateFile.update({path:path})
//                .then(result => {
//                  return res.json({message: "success"});
//                })
//            }) // save file path to database
//            .catch(logger.error);
//        });
//      } else {
//        logger.error(model.id, 'Invalid applicant state file upload');
//      }
//    }
//  }else{
//    // upload state file if exists
//    if (req.body.state_file && req.body.state_file.filename) {
//      const { base64, filename } = req.body.state_file;
//      const extention = filename.substring(filename.lastIndexOf('.') + 1);
//
//      // only upload if valid file extension
//      if (~['doc', 'docx', 'pdf', 'rtf', 'txt'].indexOf(extention)) {
//        const rangeFolder = model.applicant_id - (model.applicant_id % 10000);
//        const path = `Applicants/${rangeFolder}/${model.applicant_id}/` +
//          `${moment().format('D-MM-YY-h_mm_ss')}.${extention}`;
//
//        // Write file to QDMS
//        fs.writeFile(`${config.QDMS_PATH}/${path}`, base64, 'base64', err => {
//          if (err) return logger.error(model.id, err);
//          return  db.StateFile.find({
//              where: {
//                id: model.id
//              }
//            })
//            .then(handleEntityNotFound(res))
//            .then(stateFile => {
//              return stateFile.update({path:path})
//                .then(result => {
//                  return res.json({message: "success"});
//                })
//            })
//            .catch(err => handleError(res, 500, err));
//        });
//      } else {
//        logger.error(model.id, 'Invalid applicant state file upload');
//      }
//    }
//  }
//}

// Updates an existing Case in the DB
function update(req, res) {
  if (!req.query) {
    return res.status(404).json({ message: 'Invalid data' });
  }
  return _sqldb.Case.update(req.query, {
    where: {
      id: req.params.id
    }
  }).then(respondWithResult(res)).catch(function (err) {
    return handleError(res, 500, err);
  });
}

// Deletes a Case from the DB
function destroy(req, res) {
  return _sqldb.Case.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(function (err) {
    return handleError(res, 500, err);
  });
}
//# sourceMappingURL=case.controller.js.map
