'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      shipped_on: {
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      comments: {
        type: Sequelize.STRING(255)
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      auth_code: {
        type: Sequelize.STRING(50)
      },
      reference: {
        type: Sequelize.STRING(50)
      },
      shipping_id: {
        type: Sequelize.INTEGER
      },
      tax_id: {
        type: Sequelize.INTEGER
      }
    }, { engine: 'MYISAM'})
    .then(() => {
      return Promise.all([
        queryInterface.addIndex('orders',
            ['customer_id'],
            {
              name: 'idx_orders_customer_id'
            }),
        queryInterface.addIndex('orders',
            ['shipping_id'],
            {
              name: 'idx_orders_shipping_id'
            }),
        queryInterface.addIndex('orders',
            ['tax_id'],
            {
              name: 'idx_orders_tax_id'
            })
      ])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};