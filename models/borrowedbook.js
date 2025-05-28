'use strict';
module.exports = (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    borrowDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  });

  BorrowedBook.associate = function(models) {
    BorrowedBook.belongsTo(models.User, { foreignKey: 'userId' });
    BorrowedBook.belongsTo(models.Book, { foreignKey: 'bookId' });
  };

  return BorrowedBook;
};
