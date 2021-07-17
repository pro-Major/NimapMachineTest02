'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
const products = sequelize.define('Products', {
    PName: DataTypes.STRING, 
    price: DataTypes.INTEGER,
    Image: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
},{});
products.associate = function (models) {
  products.belongsTo(models.Category, {
    foreignKey: 'CategoryId',
  })
}
  return products;
};