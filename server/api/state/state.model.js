'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('State', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'states',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.State.hasMany(models.Case);
      }
    }
  });
};
//# sourceMappingURL=state.model.js.map
