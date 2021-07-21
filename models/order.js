'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order',{
    user: DataTypes.STRING,
    product: DataTypes.STRING,
    quantity: DataTypes.STRING
  },{});
  
  Order.associate = function (models)
   {

    Order.belongsTo(models.User, {
      foreignKey: 'user',
      onDelete: 'CASCADE'
    })

    Order.belongsTo(models.Products, {
      foreignKey: 'product',
      onDelete: 'CASCADE'
    })
  }

  return Order;
};