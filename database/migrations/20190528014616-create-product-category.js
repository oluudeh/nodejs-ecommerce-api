'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_category', {
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }, { engine: 'MYISAM' })
    .then(() => {
      return queryInterface.sequelize.query(
        "ALTER TABLE product_category ADD CONSTRAINT constraint_name PRIMARY KEY (product_id, category_id)"
      )
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_category');
  }
};