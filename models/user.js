'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number:DataTypes.STRING,
    password: DataTypes.STRING,
    roles: {
      type : DataTypes.STRING,
      defaultValue: "user",
    }
  }, {})

  User.associate = function (models) {
    User.hasMany(models.Cart, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    })

  User.hasMany(models.Order, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    })

  }
  return User;
};