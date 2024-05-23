const config   = require('../config/db_postgres');
const { Pool } = require('pg');

async function Conectar() {
    if (global.connection)
        return global.connection.connect();

    const pool = new Pool({
        connectionString: config.connection
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Conectado em: " + config.connection);
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

Conectar();