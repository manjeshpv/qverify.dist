'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Case', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    pdf: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'cases',
    underscored: true,
    timestamps: true,
    classMethods: {
      associate: function associate(models) {
        models.Case.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
        models.Case.belongsTo(models.CaseType, {
          foreignKey: 'case_type_id'
        });
        //models.Case.belongsTo(models.User, {
        //  foreignKey: `updated_by`
        //    as: 'Owner'
        //});
        //models.Case.belongsTo(models.User, {
        //  foreignKey: `created_by`
        //    as: 'Editor'
        //});
        models.Case.belongsTo(models.Status, {
          foreignKey: 'status_id'
        });
        models.Case.hasMany(models.Allocation);
        models.Case.hasMany(models.CaseAddressVerification);
        models.Case.hasMany(models.CaseEducationVerification);
        models.Case.hasMany(models.CaseSiteVerification);
        models.Case.hasMany(models.CaseCriminalVerification);
      }
    }
  });
};
//# sourceMappingURL=case.model.js.map
