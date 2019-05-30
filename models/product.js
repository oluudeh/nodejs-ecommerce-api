'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discounted_price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    image_2: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    display: DataTypes.INTEGER
  }, {
    engine: 'MYISAM', 
    freezeTableName: true,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: 'idx_ft_product_name_description',
        type: 'FULLTEXT',
        fields: ['name','description']
      }
    ]
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};