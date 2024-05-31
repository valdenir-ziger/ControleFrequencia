// conferir ordem de criação para gerar as chaves estrangeiras corretamente
const Evento       = require('../models/evento');
const Atividade    = require('../models/atividade');
const Responsavel  = require('../models/responsavel');
const Participacao = require('../models/participacao');

module.exports = {
    async getFrequencia(req, res) {
        res.render('frequencia/frequencia');
    }
}