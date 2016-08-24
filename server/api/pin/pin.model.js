'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Pin', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'pins',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.Pin.hasMany(models.Case);
      }
    }
  });
};
//# sourceMappingURL=pin.model.js.map
