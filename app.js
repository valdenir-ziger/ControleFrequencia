// const db_mongoose  = require('./config/db_mongoose');
const routes       = require('./routers/route');
// const mongoose     = require('mongoose');
const handlebars   = require('express-handlebars');
var   cookieParser = require('cookie-parser');
var   session      = require('express-session');
const middlewares  = require('./middlewares/middlewares');
const express      = require('express');
const app          = express();
const path         = require('path');
const db           = require("./controllers/db");
//Execute npm init -y para gerar um pacote e automaticamente e aceitar todos os padrões.

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser()); 
app.use(session({secret:'valdenirziger',
                 resave: true,
                 saveUninitialized:true, 
                 cookie:{maxAge: 1000 * 60 * 100}}));
app.engine('handlebars', handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewares.logRegister,middlewares.sessionControl)
app.use(routes);

app.use(express.urlencoded({extended:true}))
process.env.TZ = 'America/Sao_Paulo';
console.log(process.env.TZ);

app.listen(8080,function(){
    console.log("Servidor executando no link http://localhost:8080")
});