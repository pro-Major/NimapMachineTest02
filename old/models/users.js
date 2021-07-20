'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      unique : {
        args:true,
        msg:'Email Already Exist'
      }   },
    number:{
      type:DataTypes.STRING,
      unique:{
        args:true,
        
        msg:"Number Already Exist."
      },
      validate : {
        len: [10]
      }
    },
    password: DataTypes.STRING,
    roles: {
     type: DataTypes.STRING,
     defaultValue :"user"},
  }, {})

  User.associate = function (models) {
    User.hasMany(models.Cart, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    })
  }
  return User;
};