import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3307,
    database: 'gamestorrentanywhere',
    user: 'root',
    password: 'C24EB441FA21678B20A3F23C9A181652D808CC1FD8E503911915BFA8E546DF7D',
    rowsAsArray: false,
    waitForConnections: true
});

export default pool;