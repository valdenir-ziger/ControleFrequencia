const Apresentacao = require('../models/models_nosql/apresentacao');
const Evento       = require('../models/models_nosql/evento');

module.exports = {
    async getRelatorio(req, res) {
        res.render('relatorio/relatorio');
    }
}