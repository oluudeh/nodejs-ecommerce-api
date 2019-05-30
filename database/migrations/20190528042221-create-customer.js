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
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      address_1: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      address_2: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      city: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      region: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      postal_code: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      country: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      shipping_region_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      day_phone: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      eve_phone: {
        type: Sequelize.STRING(100),
        defaultValue: ''
      },
      mob_phone: {
        type: Sequelize.STRING(100),
        defaultValue: ''
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