'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('UsersPhoneRelation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone_no: DataTypes.INTEGER,
    is_active: DataTypes.INTEGER
  }, {
    tableName: 'users_phone_relations',
    underscored: true,
    timestamps: true,
    updatedAt: 'updated_on',
    createdAt: 'created_on',
    classMethods: {
      associate: function associate(models) {
        models.UsersPhoneRelation.belongsTo(models.User, {
          foreignKey: 'user_types_id'
        });
        models.UsersPhoneRelation.belongsTo(models.UsersPhoneRelation, {
          foreignKey: 'updated_by'
        });
        models.UsersPhoneRelation.belongsTo(models.UsersPhoneRelation, {
          foreignKey: 'created_by'
        });
      }
    }
  });
};
//# sourceMappingURL=users_phone_relation.model.js.map
