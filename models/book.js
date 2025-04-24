const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ✅ Import the Sequelize instance

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: '',
  }
});

module.exports = Book;
