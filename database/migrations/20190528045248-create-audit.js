'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('audit', {
      audit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      code: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }, { engine: 'MYISAM' })
    .then (() => {
      return queryInterface.addIndex('audit', ['order_id'], {
        name: 'idx_audit_order_id'
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('audit');
  }
};