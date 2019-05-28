'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shipping_region', {
      shipping_region_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shipping_region: {
        allowNull: false,
        type: Sequelize.STRING(100)
      }
    }, { engine: 'MYISAM'});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shipping_region');
  }
};