'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      discounted_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: '0.00'
      },
      image: {
        type: Sequelize.STRING(150)
      },
      image_2: {
        type: Sequelize.STRING(150)
      },
      thumbnail: {
        type: Sequelize.STRING(150)
      },
      display: {
        allowNull: false,
        type: Sequelize.INTEGER(6),
        defaultValue: 0
      }
    }, { engine: 'INNODB'}) //using MyISAM engine throws a key length error during index creation
    .then (() => {
      queryInterface.addIndex('product',
      ['name', 'description'], 
      {
        indicesType: 'FULLTEXT',
        indexName: 'idx_ft_product_name_description'
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product');
  }
};