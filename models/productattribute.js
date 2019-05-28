'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    product_id: DataTypes.INTEGER,
    attribute_value_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'product_attribute'
  });
  ProductAttribute.associate = function(models) {
    // associations can be defined here
  };
  return ProductAttribute;
};