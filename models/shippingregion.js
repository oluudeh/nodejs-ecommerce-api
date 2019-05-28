'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShippingRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    shipping_region: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'shipping_region'
  });
  ShippingRegion.associate = function(models) {
    // associations can be defined here
  };
  return ShippingRegion;
};