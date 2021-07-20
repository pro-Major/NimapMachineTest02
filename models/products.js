'use strict';

module.exports = (sequelize, DataTypes) => {

  const Products = sequelize.define('Products', {
    PName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    Image: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {});

  Products.associate = function (models) {
    Products.belongsTo(models.Category, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE'
    })
    Products.hasMany(models.Cart, {
      foreignKey: 'productid',
      onDelete: 'CASCADE'
    })
  }
  return Products;
};