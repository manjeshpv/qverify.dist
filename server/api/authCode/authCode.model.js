'use strict';

var moment = require('moment');

module.exports = function AuthCodeModel(sequelize, DataTypes) {
  var AuthCode = sequelize.define('AuthCode', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    auth_code: {
      type: DataTypes.STRING(256),
      validate: {
        len: [10, 256]
      },
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function setExpires() {
        return moment().add(30, 'seconds');
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'auth_codes',
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        //AuthCode.belongsToMany(models.Scope, {
        //  through: {
        //    model: models.ItemScope,
        //    unique: false,
        //    scope: {
        //      scopable: 'auth_code',
        //    },
        //  },
        //  foreignKey: 'scopable_id',
        //  constraints: false,
        //});

        AuthCode.belongsTo(models.App, {
          foreignKey: 'app_id'
        });

        AuthCode.belongsTo(models.User, {
          foreignKey: 'user_username'
        });
      }
    }
  });

  return AuthCode;
};
//# sourceMappingURL=authCode.model.js.map
