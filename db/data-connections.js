const { Sequelize } = require('sequelize');

const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

const connectToDb = async () => {
    try {
  
      sequelize.sync({ force: process.env.DB_FORCE_UPDATE });
  
      await sequelize.authenticate();
      console.log("Connected to Database")
  
    } catch (error) {
      console.log(error)
  
    }
  }




module.exports = { sequelize , connectToDb}