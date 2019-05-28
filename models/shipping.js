'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shipping_id: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    shipping_type: DataTypes.STRING,
    shipping_cost: DataTypes.NUMERIC,
    shipping_region_id: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'shipping'
  });
  Shipping.associate = function(models) {
    // associations can be defined here
  };
  return Shipping;
};