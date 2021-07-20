'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roles: DataTypes.STRING
  }, {})

  User.associate = function (models) {
    User.hasMany(models.Cart, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    })

    // User.hasMany(models.Orders, {
    //   foreignKey: 'userid',
    //   onDelete: 'CASCADE'
    // })

  }
  return User;
};