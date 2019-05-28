'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    attribute_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'attribute'
  });
  Attribute.associate = function(models) {
    // associations can be defined here
  };
  return Attribute;
};