'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_detail', {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attributes: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unit_cost: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      }
    }, { engine: 'MYISAM' })
    .then(() => {
        return queryInterface.addIndex('order_detail', ['order_id'], {
          name: 'idx_order_detail_order_id'
        })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_detail');
  }
};