'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.TEXT,
    created_on: DataTypes.DATE
  }, {
    freezeTableName: true,
    tableName: 'review'
  });
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};