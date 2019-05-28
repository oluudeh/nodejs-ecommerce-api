'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer', {
      customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: 'idx_customer_email'
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      credit_card: {
        type: Sequelize.TEXT
      },
      address_1: {
        type: Sequelize.STRING(100)
      },
      address_2: {
        type: Sequelize.STRING(100)
      },
      city: {
        type: Sequelize.STRING(100)
      },
      region: {
        type: Sequelize.STRING(100)
      },
      postal_code: {
        type: Sequelize.STRING(100)
      },
      country: {
        type: Sequelize.STRING(100)
      },
      shipping_region_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      day_phone: {
        type: Sequelize.STRING(100)
      },
      eve_phone: {
        type: Sequelize.STRING(100)
      },
      mob_phone: {
        type: Sequelize.STRING(100)
      }
    }, { engine: 'MYISAM' })
    .then(() => {
      return Promise.all([
        queryInterface.addIndex('customer', ['email'], {
          type: 'UNIQUE',
          name: 'idx_customer_email'
        }),
        queryInterface.addIndex('customer', ['shipping_region_id'], {
          name: 'idx_customer_shipping_region_id'
        })
      ])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer');
  }
};