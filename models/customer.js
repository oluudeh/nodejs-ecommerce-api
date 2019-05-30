'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    credit_card: DataTypes.TEXT,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    country: DataTypes.STRING,
    shipping_region_id: DataTypes.INTEGER,
    day_phone: DataTypes.STRING,
    eve_phone: DataTypes.STRING,
    mob_phone: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'customer',
    timestamps: false
  });
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};