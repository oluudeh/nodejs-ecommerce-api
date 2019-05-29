'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, { 
    engine: 'MYISAM',
    freezeTableName: true,
    tableName: 'department',
    timestamps: false
  });
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};