'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  });

  Book.associate = function(models) {
    Book.hasMany(models.BorrowedBook, { foreignKey: 'bookId' });
  };

  return Book;
};
