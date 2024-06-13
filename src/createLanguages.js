import pool from "../database/db.js";

async function createLanguages(array) {
    const query = `INSERT INTO game_languages (LANGUAGE, GAME_ID, CREATED_AT) VALUES (?, ?, CURRENT_TIMESTAMP)`;

    const params = array;

    const [ results ] = await pool.execute(query, params);

    return results.insertId;
}

export default createLanguages;