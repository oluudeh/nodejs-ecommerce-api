'use strict';

const sql = "-- Populate department table" +
  "INSERT INTO `department` (`department_id`, `name`, `description`) VALUES" +
  "     (1, 'Regional', 'Proud of your country? Wear a T-shirt with a national symbol stamp!')," +
  "     (2, 'Nature', 'Find beautiful T-shirts with animals and flowers in our Nature department!')," +
  "     (3, 'Seasonal', 'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.');"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      "INSERT INTO `department` (`department_id`, `name`, `description`) VALUES  (1, 'Regional', 'Proud of your country? Wear a T-shirt with a national symbol stamp!');"
      )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('department', null, {});
  }
};
