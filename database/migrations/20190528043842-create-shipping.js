'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shipping', {
      shipping_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shipping_type: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      shipping_cost: {
        allowNull: false,
        type: Sequelize.NUMERIC(10, 2)
      },
      shipping_region_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }, { engine: 'MYISAM'})
    .then (() => {
      return queryInterface.addIndex('shipping', ['shipping_region_id'], {
        name: 'idx_shipping_shipping_region_id'
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shipping');
  }
};