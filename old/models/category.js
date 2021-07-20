'use strict';


module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    CName:{
      type:DataTypes.STRING, 
      unique : {
        args:true,
        msg:'Category Already exists'
      }   }

  })
  Category.associate = function (models) {
    Category.hasMany(models.Products, {
      foreignKey: 'CategoryId',
      onDelete: 'CASCADE'
    })
  }
  return Category;
};