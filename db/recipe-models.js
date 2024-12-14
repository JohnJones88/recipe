const { sequelize } = require('./data-connections');
const { DataTypes } = require('sequelize');
const Users = require('./users-models');

const Recipe = sequelize.define('recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false

  },
  meat_Type: {
    type: DataTypes.ENUM('Beef', 'Pork', 'Chicken', 'Non-meat(Plant Based)')
  },
  steps: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
 
 imageUrl: {
    type: DataTypes.STRING(256),
    allowNull: false
  }
})

Users.hasMany(Recipe);
Recipe.belongsTo(Users);


module.exports = Recipe;