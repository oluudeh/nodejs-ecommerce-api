'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    total_amount: DataTypes.DECIMAL,
    created_on: DataTypes.DATE,
    shipped_on: DataTypes.DATE,
    status: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,
    reference: DataTypes.STRING,
    shipping_id: DataTypes.INTEGER,
    tax_id: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};