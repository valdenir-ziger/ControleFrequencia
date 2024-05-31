const {DataTypes} = require("sequelize");
const db          = require("../controllers/db");

const Pessoa = db.sequelize.define('pessoa', { 
     cod_pessoa: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
     },
     administrador: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
     },
     professor: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
     },
     organizador: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
     },
     vinculo_utfpr: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
     },
     cpf_pessoa: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
     },
     senha_pessoa: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     email_pessoa: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
     },
     telefone_pessoa: {
          type: DataTypes.STRING,
          allowNull: false,
     },
     ra_pessoa: {
          type: DataTypes.STRING,
          allowNull: true,
     },
     nome_pessoa: {
          type: DataTypes.STRING,
          allowNull: false,
     },
});

Pessoa.sync();

module.exports = Pessoa;