'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shopping_cart', {
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart_id: {
        allowNull: false,
        type: Sequelize.CHAR(32)
      },
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attributes: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      buy_now: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      added_on: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      return queryInterface.addIndex('shopping_cart',
          ['cart_id'], 
          { 
            indexName: 'idx_shopping_cart_cart_id',
            indexType: 'BTREE'
          })
   });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shopping_cart');
  }
};