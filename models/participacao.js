const { Sequelize, DataTypes } = require("sequelize");
const db                       = require("../controllers/db.js");

const Participacao = db.sequelize.define("participacao", {
     cod_atividade: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
               model: 'atividades',
               key: 'cod_atividade',
          },
          onDelete: 'CASCADE',
     },
     cod_pessoa: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
               model: 'pessoas',
               key: 'cod_pessoa',
          },
          onDelete: 'CASCADE',
     },
     inscricao: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
     },
     participacao: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
     },
});

Participacao.sync();

module.exports = Participacao;