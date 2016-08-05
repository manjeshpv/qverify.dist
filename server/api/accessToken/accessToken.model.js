'use strict';

var moment = require('moment');

module.exports = function AccessTokenModel(sequelize, DataTypes) {
  var AccessToken = sequelize.define('AccessToken', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    access_token: {
      type: DataTypes.STRING(256),
      validate: {
        len: {
          args: [10, 256],
          msg: 'Maximum length for value field is 255'
        }
      },
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function setExpires() {
        return moment().add(1, 'hours');
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
    },
    scope: DataTypes.STRING(256)
  }, {
    tableName: 'access_tokens',
    timestamps: false,
    underscored: true,
    defaultScope: {
      where: { status: 1 }
    },

    classMethods: {
      associate: function associate(models) {
        //AccessToken.belongsToMany(models.Scope, {
        //  through: {
        //    model: models.ItemScope,
        //    unique: false,
        //    scope: {
        //      scopable: 'access_token',
        //    },
        //  },
        //  foreignKey: 'scopable_id',
        //  constraints: false,
        //});

        AccessToken.belongsTo(models.App, {
          foreignKey: 'app_id'
        });

        AccessToken.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return AccessToken;
};
//# sourceMappingURL=accessToken.model.js.map
