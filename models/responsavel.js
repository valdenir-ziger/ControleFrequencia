const { Sequelize} = require("sequelize");
const db           = require("../controllers/db");

const Responsavel = db.sequelize.define('responsavel', {
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
});

Responsavel.sync();

module.exports = Responsavel;