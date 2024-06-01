// conferir ordem de criação para gerar as chaves estrangeiras corretamente
const { Op }       = require('sequelize');
const Pessoa       = require('../models/pessoa');
const Evento       = require('../models/evento');
const Atividade    = require('../models/atividade');
const Responsavel  = require('../models/responsavel');
const Participacao = require('../models/participacao');

module.exports = {
    async getFrequencia(req, res) {
        res.render('frequencia/frequencia', {sucesso : true});
    },
    async postFrequencia(req, res) { 
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            var {procurar} = req.body;
            if (procurar.length == 11){
                Pessoa.findAll({where: {[Op.and]: [{cpf_pessoa: procurar}],},}).then((pessoas) => {
                    var mensagemSucesso = 'Frequência Registrada para ' + pessoas[0].nome_pessoa + ' em Curso Teste.';
                    res.render('frequencia/frequencia',{pessoas: pessoas.map(pessoas=> pessoas.toJSON()),
                                                        sucesso : true,
                                                        mensagem : mensagemSucesso});
                }).catch((err) => {
                    console.log(err); 
                    var mensagemErro = 'Para Registrar a Frequência Deve Ser Informado um CPF ou RA!';
                    res.render('frequencia/frequencia',{sucesso : false, mensagem : mensagemErro});
                }); 
            }                       
            else if (procurar.length == 7){
                Pessoa.findAll({where: {[Op.and]: [{ra_pessoa: procurar}],},}).then((pessoas) => {
                    var mensagemSucesso = 'Frequência Registrada para ' + pessoas[0].nome_pessoa + ' em Curso Teste.';
                    res.render('frequencia/frequencia',{pessoas: pessoas.map(pessoas=> pessoas.toJSON()),
                                                        sucesso : true,
                                                        mensagem : mensagemSucesso});
                }).catch((err) => {
                    console.log(err); 
                    var mensagemErro = 'Não foi possivel registrar a frequência!';
                    res.render('frequencia/frequencia',{sucesso : false, mensagem : mensagemErro});
                });
            }
            else{
                var mensagemErro = 'Não foi possivel registrar a frequência!';
                res.render('frequencia/frequencia',{sucesso : false, mensagem : mensagemErro});
            }
        }
    }
}