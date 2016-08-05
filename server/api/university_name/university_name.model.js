'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('UniversityName', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'university_names',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: function associate(models) {
        models.UniversityName.hasMany(models.CaseEducationVerification);
      }
    }
  });
};
//# sourceMappingURL=university_name.model.js.map
