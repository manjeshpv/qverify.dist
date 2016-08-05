'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('UserType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    tableName: 'user_types',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.UserType.hasMany(models.Company);
      }
    }
  });
};
//# sourceMappingURL=user_type.model.js.map
