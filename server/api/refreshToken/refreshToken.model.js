'use strict';

var moment = require('moment');

module.exports = function RefreshTokenModel(sequelize, DataTypes) {
  var RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    refresh_token: {
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
        return moment().add(1, 'months');
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
    tableName: 'refresh_tokens',
    timestamps: false,
    underscored: true,

    classMethods: {
      associate: function associate(models) {
        //RefreshToken.belongsToMany(models.Scope, {
        //  through: {
        //    model: models.ItemScope,
        //    unique: false,
        //    scope: {
        //      scopable: 'refresh_token',
        //    },
        //  },
        //  foreignKey: 'scopable_id',
        //  constraints: false,
        //});

        RefreshToken.belongsTo(models.App, {
          foreignKey: 'app_id'
        });

        RefreshToken.belongsTo(models.User, {
          foreignKey: 'user_username'
        });
      }
    }
  });

  return RefreshToken;
};
//# sourceMappingURL=refreshToken.model.js.map
