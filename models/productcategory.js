'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'product_category'
  });
  ProductCategory.associate = function(models) {
    // associations can be defined here
  };
  return ProductCategory;
};