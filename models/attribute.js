'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('Attribute', {
    attribute_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
    tableName: 'attribute',
    timestamps: false
  });
  Attribute.associate = function(models) {
    // associations can be defined here
  };
  return Attribute;
};