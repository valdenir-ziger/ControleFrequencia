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
        const {nome, senha, email, telefone, cpf, ra, tipo} = req.body;
        var isProfessor   = false;
        var isOrganizador = false;
        if (tipo == '2') {
            isOrganizador = true;
        }
        if (tipo == '1') {
            isProfessor = true;
        }

        const resultado = await Pessoa.create({
            nome_pessoa: nome,
            cpf_pessoa: cpf.replaceAll(' ',''),
            senha_pessoa: senha.replaceAll(' ',''),
            vinculo_utfpr : true,
            professor : isProfessor,
            organizador :isOrganizador,
            email_pessoa : email.replaceAll(' ',''),
            telefone_pessoa : telefone,
            ra_pessoa : ra.replaceAll(' ','') 
        })
        console.log(resultado);

        res.redirect('/home');
    },
    async getList(req, res) {
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            if (req.session.tipo == 0){//administrador
                Pessoa.findAll().then((pessoas) => {
                    res.render('pessoa/pessoaList', { pessoas: pessoas.map(pessoas=> pessoas.toJSON())});
                }).catch((err) => {
                    console.log(err); 
                    res.redirect('/home');
                });
            }
            else{
                Pessoa.findByPk(req.session.user_id).then((pessoas) => {
                    res.render('pessoa/pessoaList', { pessoas: pessoas.map(pessoas=> pessoas.toJSON())});
                }).catch((err) => {
                    console.log(err); 
                    res.redirect('/home');
                });
            }
        }
    },
    async getEdit(req, res) {
        await Pessoa.findByPk(req.params.id).then((pessoas) => {
            console.log('pessoa/pessoaEdit: ' + pessoas); 
            res.render('pessoa/pessoaEdit', { pessoas: pessoas.toJSON() });
        });
    },
    async postEdit(req, res) {
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            var {id, nome, senha} = req.body;

            const pessoa = await Pessoa.findByPk(id);
            pessoa.nome_pessoa  = nome; 
            pessoa.senha_pessoa = senha.replaceAll(' ','');

            const resultadoSave =await pessoa.save(); 
            console.log(resultadoSave);

            res.redirect('/pessoaList');
        }
    },
    async getDelete(req, res) {
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            const pessoa = await Pessoa.findByPk(req.params.id);
            pessoa.destroy();
            res.redirect('/pessoaList');
        }
    },
    async getParticipante(req, res) {
        res.render('participante/participanteCreate');
    },
    async postParticipanteCreate(req, res) {
        const {nome, email, telefone, cpf, ra} = req.body;
        var numeroRA = null;
        if (ra != '') {
            numeroRA = ra;
        }

        const resultado = await Pessoa.create({
            nome_pessoa: nome,
            cpf_pessoa: cpf,
            vinculo_utfpr : true,
            email_pessoa : email,
            telefone_pessoa : telefone,
            ra_pessoa : numeroRA
        }).catch((err) => {
            console.log(err); 
        });
        console.log(resultado);

        res.redirect('/home');
    },
    async getParticipanteProcurar(req, res) {
        res.render('participante/participanteProcura');
    },
    async postParticipanteRelacionar(req, res) { 
        if(req.session.login == undefined){
            res.redirect('/login');
        }else{
            var {procurar} = req.body;
            if (procurar.length == 11){
                Pessoa.findAll({where: {[Op.and]: [{cpf_pessoa: procurar}],},}).then((pessoas) => {
                    res.render('participante/participanteProcura',{ pessoas: pessoas.map(pessoas=> pessoas.toJSON())});
                }).catch((err) => {
                    console.log(err); 
                    res.redirect('/home');
                });
            }
            else if (procurar.length == 7){
                Pessoa.findAll({where: {[Op.and]: [{ra_pessoa: procurar}],},}).then((pessoas) => {
                    res.render('participante/participanteProcura',{ pessoas: pessoas.map(pessoas=> pessoas.toJSON())});
                }).catch((err) => {
                    console.log(err); 
                    res.redirect('/home');
                });
            }
        }
    },
}   