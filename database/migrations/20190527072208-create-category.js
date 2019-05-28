'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('category', {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      department_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'department',
          key: 'department_id'
        }
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.STRING(1000)
      }
    }, { engine: 'MYISAM'})
    .then(() => {
      return queryInterface.addIndex('category',
          ['department_id'], 
          { 
            name: 'idx_category_department_id',
          })
   })
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('category');
  }
};