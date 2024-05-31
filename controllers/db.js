var Sequelize = require('sequelize');
var config    = require('../config/db_postgres');
var sequelize = new Sequelize(config.connection, {dialect: 'postgres'});

async function Conectar() {
    try {
          await sequelize.authenticate();
          console.log("Conectado em: " + config.connection);

          const result = await sequelize.sync({ alter: true });
          console.log(result);
    } catch (error) {
          console.error('Não foi possível conectar na database:', error);
    }
}
Conectar();

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}