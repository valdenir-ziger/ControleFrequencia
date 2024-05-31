const { Sequelize, DataTypes} = require("sequelize");
const db                      = require("../controllers/db.js");

const Evento = db.sequelize.define("evento", {
     cod_evento: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
     },
     nome_evento: {
          type: Sequelize.STRING,
          allowNull: false,
     },
     ano_evento: {
          type: Sequelize.STRING,
          allowNull: false,
     },
     cidade_evento: {
          type: Sequelize.STRING,
          allowNull: false,
     },
     data_inicio: {
          type: DataTypes.DATE,
          allowNull: false,
     },
     imagem_evento: {
          type: Sequelize.STRING,
          allowNull: false,
     },
});

Evento.sync();

module.exports = Evento;