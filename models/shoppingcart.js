'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    cart_id: DataTypes.CHAR,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    buy_now: DataTypes.BOOLEAN,
    added_on: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'shopping_cart'
  });
  ShoppingCart.associate = function(models) {
    // associations can be defined here
  };
  return ShoppingCart;
};