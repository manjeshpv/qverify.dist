/**
 * Sequelize initialization module
 */

'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _minio = require('minio');

var _minio2 = _interopRequireDefault(_minio);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = {
  Sequelize: _sequelize2.default,
  sequelizeQverify: new _sequelize2.default(_environment2.default.qverify.database, _environment2.default.qverify.username, _environment2.default.qverify.password, _environment2.default.qverify),
  Minio: new _minio2.default(_environment2.default.MINIO)
};

// Insert models below
db.UniversityName = db.sequelizeQverify.import('../api/university_name/university_name.model');
db.UsersPhoneRelation = db.sequelizeQverify.import('../api/users_phone_relation/users_phone_relation.model');
db.HouseType = db.sequelizeQverify.import('../api/house_type/house_type.model');
db.Designation = db.sequelizeQverify.import('../api/designation/designation.model');
db.Degree = db.sequelizeQverify.import('../api/degree/degree.model');
db.CaseType = db.sequelizeQverify.import('../api/case_type/case_type.model');
db.Status = db.sequelizeQverify.import('../api/status/status.model');
db.AllocationStatus = db.sequelizeQverify.import('../api/allocation_status/allocation_status.model');
db.Allocation = db.sequelizeQverify.import('../api/allocation/allocation.model');
db.Case = db.sequelizeQverify.import('../api/case/case.model');
db.CaseSiteVerification = db.sequelizeQverify.import('../api/case_site_verification/case_site_verification.model');
db.CaseEducationVerification = db.sequelizeQverify.import('../api/case_education_verification/case_education_verification.model');
db.CaseCriminalVerification = db.sequelizeQverify.import('../api/case_criminal_verification/case_criminal_verification.model');
db.CaseAddressVerification = db.sequelizeQverify.import('../api/case_address_verification/case_address_verification.model');
db.Location = db.sequelizeQverify.import('../api/location/location.model');
db.Company = db.sequelizeQverify.import('../api/company/company.model');
db.UserType = db.sequelizeQverify.import('../api/user_type/user_type.model');
db.User = db.sequelizeQverify.import('../api/user/user.model');
//db.Manager = db.sequelizeQverify.import('../api/manager/manager.model');

// OAuth
db.RefreshToken = db.sequelizeQverify.import('../api/refreshToken/refreshToken.model');
db.AccessToken = db.sequelizeQverify.import('../api/accessToken/accessToken.model');
db.App = db.sequelizeQverify.import('../api/app/app.model');
db.AuthCode = db.sequelizeQverify.import('../api/authCode/authCode.model');

(0, _keys2.default)(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

_bluebird2.default.promisifyAll((0, _getPrototypeOf2.default)(db.Minio));

db.Minio.bufferUpload = function (minioObject) {
  minioObject.bucket = minioObject.bucket || 'qverify'; // Bucket name always in lowercaseObj
  return db.Minio.putObjectAsync(minioObject.bucket, minioObject.object, minioObject.buffer, 'application/octet-stream');
};

function qualifyBucket(bucketName) {
  var bucket = bucketName;
  if (typeof bucket === 'string' && bucket[0] === '/') {
    bucket = bucket.slice(1);
  }
  return bucket.toLowerCase();
}

db.Minio.base64Upload = function (minioObject) {
  minioObject.buffer = Buffer.from(minioObject.base64String, 'base64');
  return db.Minio.bufferUpload(minioObject);
};

db.Minio.downloadLinkBase = function (minioObject) {
  var minObj = minioObject;
  minObj.bucket = minObj.bucket || 'qverify'; // Bucket name always in lowercaseObj
  minObj.expires = minObj.expires || 24 * 60 * 60; // Expired in one day
  minObj.headers = {
    'response-content-disposition': 'attachment; filename="' + minObj.name.replace(/[^a-zA-Z0-9-_\.]/g, '') + '"' };
  return db.Minio.presignedGetObjectAsync(minObj.bucket.toLowerCase(), qualifyBucket(minObj.object), minObj.expires, minObj.headers);
};

db.Minio.downloadLink = function (minioObject) {
  var minObj = minioObject;
  minObj.bucket = minObj.bucket || 'qverify'; // Bucket name always in lowercase
  return db.Minio.statObjectAsync(minObj.bucket, qualifyBucket(minObj.object)).then(function () {
    return db.Minio.downloadLinkBase(minObj);
  }).catch(function (err) {
    console.log('Minio: File not found', minObj, err);
    return _environment2.default.PREFIX + 'api.' + _environment2.default.DOMAIN + '/api/404.pdf';
  });
};

module.exports = db;
//# sourceMappingURL=index.js.map
