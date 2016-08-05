'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'status',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.Status.hasMany(models.Case);
      }
    }
  });
};
//# sourceMappingURL=status.model.js.map
