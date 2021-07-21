'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order,',{
    user: DataTypes.STRING,
    product: DataTypes.STRING,
    quantity: DataTypes.STRING
  },{});
  
  Order.associate = function (models) {

    Order.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    })

    Order.belongsTo(models.Products, {
      foreignKey: 'productid',
      onDelete: 'CASCADE'
    })
  }

  return Order;
};