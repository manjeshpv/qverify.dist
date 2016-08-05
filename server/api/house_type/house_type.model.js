'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('HouseType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'house_types',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.HouseType.hasMany(models.CaseAddressVerification);
      }
    }
  });
};
//# sourceMappingURL=house_type.model.js.map
