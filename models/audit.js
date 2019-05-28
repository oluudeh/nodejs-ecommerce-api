'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define('Audit', {
    audit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    order_id: DataTypes.INTEGER,
    created_on: DataTypes.DATE,
    message: DataTypes.TEXT,
    code: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'audit'
  });
  Audit.associate = function(models) {
    // associations can be defined here
  };
  return Audit;
};