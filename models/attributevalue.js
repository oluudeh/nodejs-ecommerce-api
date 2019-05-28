'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define('AttributeValue', {
    attribute_value_id: DataTypes.INTEGER,
    attribute_id: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'attribute_value'
  });
  AttributeValue.associate = function(models) {
    // associations can be defined here
  };
  return AttributeValue;
};