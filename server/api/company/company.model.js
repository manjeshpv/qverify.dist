'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'companys',
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    classMethods: {
      associate: function associate(models) {
        models.Company.belongsTo(models.Location, {
          foreignKey: 'location_id'
        });
        models.Company.belongsTo(models.UserType, {
          foreignKey: 'user_type_id'
        });
        models.Company.belongsTo(models.User, {
          foreignKey: 'created_by'
        });
        models.Company.belongsTo(models.User, {
          foreignKey: 'updated_by'
        });
        models.Company.hasMany(models.User);
      }
    }
  });
};
//# sourceMappingURL=company.model.js.map
