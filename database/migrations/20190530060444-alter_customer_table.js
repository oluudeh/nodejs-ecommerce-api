'use strict';

//change the size of the password column to accommodate hashed passwords
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('customer', 'password', Sequelize.STRING(60))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('customer', 'password', Sequelize.STRING(50))
  }
};
