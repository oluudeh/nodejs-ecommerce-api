'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, { engine: 'MYISAM' });
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};