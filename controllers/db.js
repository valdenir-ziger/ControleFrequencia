const config    = require('../config/db_postgres');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.connection, {dialect: 'postgres'});

async function Conectar() {
    try {
        await sequelize.authenticate();
        console.log("Conectado em: " + config.connection);
    } catch (error) {
        console.error('Não foi possível conectar na database:', error);
    }
}

Conectar();

module.exports = sequelize