'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tax_type: DataTypes.STRING,
    tax_percentage: DataTypes.NUMERIC
  }, {
    freezeTableName: true,
    tableName: 'tax'
  });
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};