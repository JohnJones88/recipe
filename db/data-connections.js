const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ('recipe_db', 'root', 'password',{
    host: 'localhost',
  dialect: 'mysql'

});

const connectToDb = async () => {
    try {
  
      sequelize.sync({ force: false });
  
      await sequelize.authenticate();
      console.log("Connected to Database")
  
    } catch (error) {
      console.log(error)
  
    }
  }




module.exports = { sequelize , connectToDb}