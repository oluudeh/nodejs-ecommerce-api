'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_attribute', {
      product_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      attribute_value_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    }, { engine: 'MYISAM' })
    .then(() => {
      return queryInterface.sequelize.query(
        "ALTER TABLE product_attribute ADD CONSTRAINT constraint_name PRIMARY KEY (product_id, attribute_value_id)"
      )
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_attribute');
  }
};