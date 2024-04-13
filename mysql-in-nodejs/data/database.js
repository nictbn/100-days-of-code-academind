const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'blog',
    user: 'root',
    password: 'example'
});

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'example',
        database: 'mysql',
    });
    await connection.query('CREATE DATABASE IF NOT EXISTS blog');
    await connection.query(
        'CREATE TABLE IF NOT EXISTS `blog`.`authors` (' +
        '`id` INT NOT NULL AUTO_INCREMENT, ' +
        '`name` VARCHAR(255) NOT NULL, ' +
        '`email` VARCHAR(255) NOT NULL, ' +
        'PRIMARY KEY (`id`));'
    );

    await connection.query(
        'CREATE TABLE IF NOT EXISTS `blog`.`posts` (' +
        '`id` INT NOT NULL AUTO_INCREMENT, ' +
        '`title` VARCHAR(255) NOT NULL, ' +
        '`summary` VARCHAR(255) NOT NULL, ' +
        '`body` TEXT NOT NULL, ' +
        '`date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP, ' +
        '`author_id` INT NOT NULL, ' +
        'PRIMARY KEY (`id`));'
    );

    const [countObject] = await pool.query('SELECT COUNT(1) AS count FROM authors');
    const countResult = countObject[0].count;
    if (countResult === 0) {
        await pool.query(
            "INSERT INTO authors (name, email) VALUES('Maximilian Schwarzmüller', 'max@test.com')"
        );
        await pool.query(
            "INSERT INTO authors (name, email) VALUES('Manuel Lorenz', 'manuel@test.com')"
        );
    }

}

module.exports = {pool, initializeDatabase};