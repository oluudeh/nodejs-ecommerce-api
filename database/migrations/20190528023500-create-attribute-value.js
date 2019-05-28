'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attribute_value', {
      attribute_value_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      attribute_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING(100)
      }
    }, { engine: 'MYISAM'})
    .then(() => {
      return queryInterface.addIndex('attribute_value',
        ['attribute_id'], 
        { 
          name: 'idx_attribute_value_attribute_id'
        })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attribute_value');
  }
};