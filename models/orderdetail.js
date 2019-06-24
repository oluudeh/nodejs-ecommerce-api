'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    product_name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    unit_cost: DataTypes.DECIMAL
  }, {
    tableName: 'order_detail',
    freezeTableName: true,
    timestamps: false
  });
  OrderDetail.associate = function(models) {
    // associations can be defined here
  };
  return OrderDetail;
};