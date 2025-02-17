
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno primero

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});



/*
        console.log("USER: " +  process.env.DB_USER);
        console.log("PASSWORD: " +  process.env.DB_PASSWORD);
*/

const pool2 = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

pool.connect()
    .then(client => {
        console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
        client.release(); // Liberar el cliente una vez que se conecte
    })
    .catch(err => console.error('❌ Error en la conexión a la base de datos PostgreSQL', err.stack));

// Exporta ambos pools
export default pool;
