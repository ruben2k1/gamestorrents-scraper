import pool from "../database/db.js";

async function createGame(array) {
    const query = `INSERT INTO games
    (TITLE, DESCRIPTION, TYPE, FORMAT, PLATFORM, SIZE, VERSION,
    UPLOADER, EXT_IMG_URL, TRAILER_URL, RELEASED_AT, CREATED_AT)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;

    const params = array;

    const [ results ] = await pool.execute(query, params);

    return results.insertId;
}

export default createGame;