import pool from "../database/db.js";

async function createFileRoutes(array) {
    const query = `INSERT INTO game_files (EXT_FILE_ROUTE_1, GAME_ID, CREATED_AT) VALUES (?, ?, CURRENT_TIMESTAMP)`;

    const params = array;

    const [ results ] = await pool.execute(query, params);

    return results.insertId;
}

export default createFileRoutes;