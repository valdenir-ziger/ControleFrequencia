const { Op } = require('sequelize');
const Pessoa = require('../models/pessoa');

module.exports = {
    async getLogin(req, res) {
        if (req.session.login == undefined) {
            res.render('pessoa/pessoaLogin', { layout: 'noMenu.handlebars' });
        }
        else {
            res.redirect('/home');
        }
    },
    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },
    async postLogin(req, res) {
        await Pessoa.findAll({attributes: ['administrador', 'professor', 'nome_pessoa', 'cod_pessoa'],
                              where: {
                                [Op.and]: [{ cpf_pessoa  : req.body.login }, 
                                           { senha_pessoa: req.body.senha }],},
                              }).then((pessoas) => {
            if (pessoas.length <= 0) {
                console.log("Pessoa " + req.body.login + " não encontrado!");
                res.redirect('/login');
            }
            else  if(pessoas.length == 1) {
                var tipo;
                if (pessoas[0].administrador) {
                    tipo = 0;
                } 
                else if (pessoas[0].professor) {
                    tipo = 1;
                }
                else{
                    tipo = 2;
                }

                req.session.login           = req.body.login;
                req.session.user            = pessoas[0].nome_pessoa;
                req.session.tipo            = tipo;
                req.session.user_id         = pessoas[0].cod_pessoa;
                console.log("Pessoa " + req.session.login + "-" + req.session.user +  " acabou de conectar!"); 
                
                res.redirect('/home');
            }
            else{
                console.log("Registro " + req.body.login + " duplicado!");
                res.redirect('/login');
            }
        }).catch(async error => {
            console.log(error);
        });
    },
    async getCreate(req, res) {
        res.render('pessoa/pessoaCreate');
    },
    async postCreate(req, res) {
        const {nome, login, senha, tipo} = req.body;
        const usuario = new Usuario({nome, login, senha, tipo});
        if (tipo == 0){
            usuario.tipo_descricao = "Administrador";
        }
        else if (tipo == 1) {
            usuario.tipo_descricao = "Professor";
        }
        else{
            usuario.tipo_descricao = "Organizador";
        }

        await usuario.save().catch((err) => {
            console.log(err); 
        });

        res.redirect('/home');
    },
    async getList(req, res) {
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            if (req.session.tipo == 0){//administrador
                Usuario.find().then((usuarios) => {
                    res.render('pessoa/pessoaList', { usuarios: usuarios.map(usuarios=> usuarios.toJSON())});
                }).catch((err) => {
                    console.log(err); 
                    res.redirect('/home');
                });
            }
            else{
                Usuario.find({_id: req.session.user_id, excluido: false}).then((usuarios) => {
                    res.render('pessoa/pessoaList', { usuarios: usuarios.map(usuarios=> usuarios.toJSON())});
                }).catch((err) => {
                    console.log(err); 
                    res.redirect('/home');
                });
            }
        }
    },
    async getEdit(req, res) {
        await Usuario.findOne({ _id: req.params.id }).then((usuarios) => {
            console.log('pessoa/pessoaEdit: ' + usuarios); 
            res.render('pessoa/pessoaEdit', { usuarios: usuarios.toJSON() });
        });
    },
    async postEdit(req, res) {
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            var {nome, senha, tipo, tipo_descricao, excluido} = req.body;
            excluido = false;
            if (tipo.length > 1){
                //tipo = tipo[0];//Como tava Antes de Alterar
                tipo = tipo[1];//Como ficou depois
            }

            if (tipo == 0){
                tipo_descricao = "Administrador";
            }
            else if (tipo == 1) {
                tipo_descricao = "Professor";
            }
            else{
                tipo_descricao = "Organizador";
            }

            await Usuario.findOneAndUpdate({_id:req.body.id}, {nome, senha, tipo, tipo_descricao, excluido});
            res.redirect('/pessoaList');
        }
    },
    async getDelete(req, res) {
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            var excluido = true;
            await Usuario.findOneAndUpdate({ _id: req.params.id }, {excluido});
            res.redirect('/pessoaList');
        }
    },
    async getParticipante(req, res) {
        res.render('participante/participanteCreate');
    },
    async postParticipanteCreate(req, res) {
        const {nome, login, senha, tipo} = req.body;
        const usuario = new Usuario({nome, login, senha, tipo});
        if (tipo == 0){
            usuario.tipo_descricao = "Administrador";
        }
        else if (tipo == 1) {
            usuario.tipo_descricao = "Professor";
        }
        else{
            usuario.tipo_descricao = "Organizador";
        }

        await usuario.save().catch((err) => {
            console.log(err); 
        });

        res.redirect('/home');
    },
}   