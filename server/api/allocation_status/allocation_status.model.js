'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('AllocationStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    tableName: 'allocation_status',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.AllocationStatus.hasMany(models.Allocation);
      }
    }
  });
};
//# sourceMappingURL=allocation_status.model.js.map
