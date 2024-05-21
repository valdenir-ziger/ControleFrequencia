module.exports = {
    logRegister(req, res, next) {
        console.log('Url: ' + req.url + ' - Método: ' + req.method + ' - Data: ' + new Date())
        next();
    },
    sessionControl(req, res, next) {
        res.locals.titulo = 'Controle de Frequência';
        res.locals.logado = false;
        if (req.session.login != undefined){
            res.locals.user            = req.session.user;
            res.locals.user_id         = req.session.user_id;
            res.locals.isAdministrador = (req.session.tipo == 0);
            res.locals.isProfessor     = (req.session.tipo == 1);
            res.locals.isOrganizador   = (req.session.tipo == 2);
            if (res.locals.isAdministrador) {
                res.locals.tipo_descricao  = 'Administrador';
            } 
            else if (res.locals.isProfessor){
                res.locals.tipo_descricao  = 'Professor';
            } 
            else if (res.locals.isOrganizador){
                res.locals.tipo_descricao  = 'Organizador';
            }
            res.locals.logado = true;
            next();
        }
        else if ((req.url == '/') && (req.method == 'GET')) 
            next();
        else if ((req.url == '/login') && (req.method == 'POST'))
            next();
        else if ((req.url).split('/')[1] == 'usuarioCreate')
            next();
        else res.redirect('/');
    }
};