'use strict';

const Promise = require('bluebird');
const env = require('../environment');

function setup() {
    const mysql = require('mysql');

    Promise.promisifyAll(mysql);
    Promise.promisifyAll(require('mysql/lib/Connection').prototype);
    Promise.promisifyAll(require('mysql/lib/Pool').prototype);
    const config = {
        host: env.db.host,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
        debug: env.db.debug == 'true',
    };
    console.log('MYSQL CONNECTED!');

    global.pool = mysql.createPool(config);
}

function getSqlConnection() {
    const pool = global.pool;
    return pool.getConnectionAsync().disposer(function (connection) {
        connection.release();
    });
}

function querySql(query, params) {
    return Promise.using(getSqlConnection(), function (connection) {
        if (typeof params !== 'undefined') {
            return connection.queryAsync(query, params);
        } else {
            return connection.queryAsync(query);
        }
    });
}

module.exports = {
    getSqlConnection,
    querySql,
    setup,
};
