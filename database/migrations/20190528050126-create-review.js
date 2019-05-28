'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('review', {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      review: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rating: {
        allowNull: false,
        type: Sequelize.TEXT('small')
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { engine: 'MYISAM' })
    .then (() => {
      return Promise.all([
        queryInterface.addIndex('review', ['customer_id'], {
          name: 'idx_review_customer_id'
        }),
        queryInterface.addIndex('review', ['product_id'], {
          name: 'idx_review_product_id'
        })
      ])
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('review');
  }
};