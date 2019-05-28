'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attribute', {
      attribute_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        comment: 'E.g. Color, Size'
      }
    }, { engine: 'MYISAM'});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attribute');
  }
};