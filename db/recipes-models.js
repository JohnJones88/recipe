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
  food_Type: {
    type: DataTypes.ENUM('Beef', 'Pork', 'Chicken', 'Plant Based', 'No Meat','Starch', 'Vegetable', 'Dessert', 'Fruit')

  },
 /* meat_Type: {
    type: DataTypes.ENUM('Beef', 'Pork', 'Chicken', 'Plant Based', 'No Meat')

  },
  non_Meat_Type: {
    type: DataTypes.ENUM('None','Starch', 'Vegetable', 'Dessert', 'Fruit'),
    allowNull: true

  }, */
 description:{
    type:DataTypes.STRING(64),
    allowNull: false

},
step:{
  type:DataTypes.JSON,
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