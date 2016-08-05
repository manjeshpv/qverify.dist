'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'locations',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.Location.hasMany(models.Company);
      }
    }
  });
};
//# sourceMappingURL=location.model.js.map
