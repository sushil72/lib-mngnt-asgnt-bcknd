'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    isApproved: DataTypes.BOOLEAN
  });

  User.associate = function(models) {
    User.hasMany(models.BorrowedBook, { foreignKey: 'userId' });
  };

  return User;
};
