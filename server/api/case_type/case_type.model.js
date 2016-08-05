'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('CaseType', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    tableName: 'case_types',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.CaseType.hasMany(models.Case);
      }
    }
  });
};
//# sourceMappingURL=case_type.model.js.map
