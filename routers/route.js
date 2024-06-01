const express              = require('express');
const controllerPessoa     = require('../controllers/controllerPessoa');
const controllerRelatorio  = require('../controllers/controllerRelatorio');
const controllerFrequencia = require('../controllers/controllerFrequencia');
const multer               = require('multer');
const route                = express.Router();
module.exports             = route;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
      req.imageName = req.body.nome+'.png'
      cb(null,  req.imageName)
    },
})

const upload = multer({storage})
route.get("/home", function(req,res){
    res.render('home');
});
route.get("/logout", controllerPessoa.getLogout);

//Controller Pessoa
//Pessoa - Login e Recuperação de Senha
route.get("/"      , controllerPessoa.getLogin);
route.post("/login", controllerPessoa.postLogin);
//Pessoa - CRUD
route.get("/pessoaCreate"    , controllerPessoa.getCreate);
route.post("/pessoaCreate"   , controllerPessoa.postCreate);
route.get("/pessoaList"      , controllerPessoa.getList);
route.get("/pessoaEdit/:id"  , controllerPessoa.getEdit);
route.post("/pessoaEdit"     , controllerPessoa.postEdit);
route.get("/pessoaDelete/:id", controllerPessoa.getDelete);
//Participante - CRUD
route.get("/participanteCreate"     , controllerPessoa.getParticipante);
route.post("/participanteCreate"    , controllerPessoa.postParticipanteCreate);
route.get("/participanteProcura"    , controllerPessoa.getParticipanteProcurar);
route.post("/participanteRelacionar", controllerPessoa.postParticipanteRelacionar);

//Controller Frequencia
//Frequencia-CRUD
route.get("/frequencia"       , controllerFrequencia.getFrequencia);
route.post("/frequenciaCreate", controllerFrequencia.postFrequencia);

//Controller Relatório
//Relatório-CRUD
route.get("/relatorio" , controllerRelatorio.getRelatorio);