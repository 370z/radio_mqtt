const { Sequelize } = require('sequelize');
console.log("TESTTTTTTT",process.env.MARIADB_URI)
const URI = process.env.MARIADB_URI;
const sequelize = new Sequelize(URI);

module.exports = sequelize;
