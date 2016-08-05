'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    is_admin: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_at',
    instanceMethods: {
      resetPassword: function resetPassword(models) {
        var _this = this;

        return this.generateRandomPassword().then(function (password) {
          return _this.updateAttributes({ password: password }).then(function (u) {
            var user = u.toJSON();
            _this.revokeTokens(models);
            models.QueuedTask.resetPasswordNotify(user, password);
            return _promise2.default.resolve(user);
          });
        });
      },

      generateRandomPassword: function generateRandomPassword() {
        return new _promise2.default(function (resolve, reject) {
          return crypto.randomBytes(6, function (err, buf) {
            if (err) return reject(err);
            return resolve(buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, ''));
          });
        });
      },

      revokeTokens: function revokeTokens(models) {
        return _promise2.default.all([models.AccessToken.update({ status: 0 }, { where: { user_id: this.id } }), models.RefreshToken.update({ status: 0 }, { where: { user_id: this.id } })]);
      },

      verifyPasswordAsync: function verifyPassword(password) {
        var hashedPass = crypto.createHash('md5').update(salt + password).digest('hex');
        return hashedPass === this.password ? _.pick(this.toJSON(), ['id']) : new Error('Check password!');
      },
      verifyPassword: function verifyPassword(password, cb) {
        return this.hashPassword(password) === this.password ? cb(null, this.toJSON()) : cb(new Error('Check password!'));
      },

      hashPassword: function hashPassword(password) {
        return crypto.createHash('md5').update(salt + password).digest('hex');
      }
    },
    classMethods: {
      associate: function associate(models) {
        //models.User.belongsTo(models.UserType, {
        //  foreignKey: `user_type_id`
        //});
        models.User.belongsTo(models.Company, {
          foreignKey: 'company_id'
        });
        models.User.belongsTo(models.User, {
          foreignKey: 'updated_by'
        });
        models.User.belongsTo(models.User, {
          foreignKey: 'created_by'
        });
        models.User.hasMany(models.Case);
        models.User.hasMany(models.Allocation);
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(instance) {
        if (instance.changed('password')) {
          instance.set('password', instance.hashPassword(instance.password));
        }
      },

      beforeUpdate: function beforeUpdate(instance) {
        if (instance.changed('password')) {
          instance.set('password', instance.hashPassword(instance.password));
        }
      }
    }
  });
};

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var salt = 'DYhG93b0fIxfs2guVoUubasdfajfkljasdjfaklsdjflakrfWwvniR2G0FgaC9mi';
var _ = require('lodash');
//# sourceMappingURL=user.model.js.map
