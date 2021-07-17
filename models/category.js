'use strict';


module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    CName: DataTypes.STRING

  })
  Category.associate = function (models) {
    Category.hasMany(models.Products, {
      foreignKey: 'CategoryId',
    })
  }
  return Category;
};