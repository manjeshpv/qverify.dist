'use strict';

var _sqldb = require('../../sqldb');

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = require('oauth2-server')({
  model: {
    getAccessToken: function getAccessToken(bearerToken, callback) {
      _sqldb.AccessToken.findOne({
        where: { access_token: bearerToken },
        attributes: ['access_token', 'expires'],
        include: [{
          model: _sqldb.User,
          include: [_sqldb.Company],
          attributes: ['id', 'name', 'created_at', 'mobile', 'email', 'company_id']
        }]
      }).then(function (accessToken) {
        if (!accessToken) return callback(null, false);
        var token = accessToken.toJSON();
        token.user = token.User;
        callback(null, token);
        return;
      }).catch(callback);
    },

    // serialize App accessing api
    getClient: function getClient(clientId, clientSecret, callback) {
      var options = {
        where: { client_id: clientId },
        attributes: ['id', ['client_id', 'clientId'], ['redirect_uri', 'redirectUri']]
      };
      if (clientSecret) options.where.client_secret = clientSecret;

      _sqldb.App.findOne(options).then(function serializeClient(client) {
        if (!client) return callback(null, false);
        callback(null, client.toJSON());
        return;
      }).catch(callback);
    },

    grantTypeAllowed: function grantTypeAllowed(clientId, grantType, callback) {
      callback(null, true);
      return;
    },

    saveAccessToken: function saveAccessToken(accessToken, client, expires, user, callback) {
      return _sqldb.AccessToken.build({ expires: expires }).set('app_id', client.id).set('access_token', accessToken).set('user_id', user.id).save().then(function (token) {
        return callback(null, token);
      }).catch(callback);
    },

    getAuthCode: function getAuthCode(authCode, callback) {
      _sqldb.AuthCode.findOne({
        where: { auth_code: authCode },
        attributes: [['app_id', 'clientId'], 'expires', ['user_id', 'userId']]
      }).then(function verifyAuthCode(authCodeModel) {
        if (!authCodeModel) return callback(null, false);
        callback(null, authCodeModel.toJSON());
        return;
      }).catch(callback);
    },

    saveAuthCode: function saveAuthCode(authCode, client, expires, user, callback) {
      return _sqldb.AuthCode.build({ expires: expires }).set('app_id', client.id).set('auth_code', authCode).set('user_id', user.id).save().then(function (code) {
        return callback(null, code);
      }).catch(callback);
    },

    getUser: function getUser(username, password, callback) {
      return _sqldb.User.findOne({
        where: { username: username },
        attributes: ['id', 'username', 'name', 'password']
      }).then(function (user) {
        return user.verifyPassword(password, callback);
      }).catch(callback);
    },

    saveRefreshToken: function saveRefreshToken(refreshToken, client, expires, user, callback) {
      return _sqldb.RefreshToken.build({ expires: expires }).set('app_id', client.id).set('refresh_token', refreshToken).set('user_id', user.id).save().then(function (token) {
        return callback(null, token);
      }).catch(callback);
    },

    getRefreshToken: function getRefreshToken(refreshToken, callback) {
      return _sqldb.RefreshToken.findOne({
        where: { refresh_token: refreshToken },
        attributes: [['app_id', 'clientId'], ['user_id', 'userId'], 'expires']
      }).then(function sendRefreshToken(refreshTokenModel) {
        if (!refreshTokenModel) return callback(null, false);
        callback(null, refreshTokenModel.toJSON());
        return;
      }).catch(callback);
    },

    generateToken: function generateToken(type, req, callback) {
      // reissue refreshToken if grantType is refresh_token
      if (type === 'refreshToken' && req.body.grant_type === 'refresh_token') {
        return callback(null, { refreshToken: req.body.refresh_token });
      }

      callback(null, false);
      return;
    }
  },
  grants: ['authorization_code', 'password', 'refresh_token'],
  debug: true
});
//# sourceMappingURL=index.js.map
