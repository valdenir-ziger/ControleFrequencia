const { Sequelize, DataTypes} = require("sequelize");
const db                      = require("../controllers/db");

const Atividade= db.sequelize.define('atividade', {
     cod_atividade: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
     },
     nome_atividade: {
          type: Sequelize.STRING,
          allowNull: false,
     },
     carga_horaria: {
          type: Sequelize.INTEGER,
          allowNull: false,
     },
     cod_evento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
               model: 'eventos',
               key: 'cod_evento',
          },
          onDelete: 'CASCADE',
     },
     data_atividade: {
          type: DataTypes.DATE,
          allowNull: false,
     },
     hora_inicio: {
          type: Sequelize.TIME,
          allowNull: false,
     },
     hora_final: {
          type: Sequelize.TIME,
          allowNull: false,
     },
});

Atividade.sync();

module.exports = Atividade;