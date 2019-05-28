'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tax', {
      tax_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tax_type: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      tax_percentage: {
        allowNull: false,
        type: Sequelize.NUMERIC(10,2)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tax');
  }
};