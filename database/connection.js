const { Sequelize, DataTypes } = require("sequelize");

// database name znz, username root , password null (empty), host localhost
const sequelize = new Sequelize(process.env.database, process.env.userDatabase, "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to ccript=>");
  })
  .catch((error) => {
    console.error("something went wrong, DB not connected!");
  });

module.exports = sequelize;