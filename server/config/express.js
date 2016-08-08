/**
 * Express configuration
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  var env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(_express2.default.static(_path2.default.join(_environment2.default.root, '.tmp')));
  }

  if (env === 'production') {
    app.use((0, _serveFavicon2.default)(_path2.default.join(_environment2.default.root, 'client', 'favicon.ico')));
  }

  app.use((0, _morgan2.default)('dev'));
  app.set('appPath', _path2.default.join(_environment2.default.root, 'client'));
  app.use(_express2.default.static(app.get('appPath')));

  app.set('views', _environment2.default.root + '/server/views');
  app.set('view engine', 'jade');
  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());
  app.use((0, _methodOverride2.default)());
  app.use((0, _cookieParser2.default)());
  app.use('/api/open/users', require('../api/user'));
  app.oauth = _oauthjs2.default;

  // OAuth Token authorization_code, password, refresh_token
  app.all('/oauth/token', app.oauth.grant());

  app.oauth.authenticate = require('./../components/oauthjs/authenticate');

  // OAuth Authorise from Third party applications
  app.use('/authorise', app.oauth.authenticate(), require('./../api/authorise')); // /authorise
  app.use('/api/authorise', app.oauth.authenticate(), require('./../api/authorise')); // /authorise

  (0, _routes2.default)(app);
  //// Persist sessions with MongoStore / sequelizeStore
  //// We need to enable sessions for passport-twitter because it's an
  //// oauth 1.0 strategy, and Lusca depends on sessions
  //app.use(session({
  //  secret: config.secrets.session,
  //  saveUninitialized: true,
  //  resave: false,
  //  store: new Store(sqldb.sequelize)
  //}));

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if ('test' !== env) {
    //app.use(lusca({
    //  csrf: {
    //    angular: true
    //  },
    //  xframe: 'SAMEORIGIN',
    //  hsts: {
    //    maxAge: 31536000, //1 year, in seconds
    //    includeSubDomains: true,
    //    preload: true
    //  },
    //  xssProtection: true
    //}));
  }
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _oauthjs = require('./../components/oauthjs');

var _oauthjs2 = _interopRequireDefault(_oauthjs);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

var _routes = require('./../routes.js');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=express.js.map
