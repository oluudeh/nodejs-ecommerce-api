'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Department,
        key: 'department_id'
      }
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    engine: 'MYISAM', 
    indexes: [
      {
        name: 'idx_category_department_id',
        method: 'BTREE',
        fields: ['department_id']
      }
    ]
  });
  Category.associate = function(models) {
    Category.belongsTo(models.Department, {
      foreignKey: 'department_id',
      targetKey: 'department_id'
    })
  };
  return Category;
};