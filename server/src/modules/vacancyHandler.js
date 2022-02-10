const format = require('pg-format');
const dataBaseQuery = require('../db/modules/query');
const DB_CONFIG = require('../db/dataBaseConfig');

async function getFromDB(dataBase, payload) {
    try {
        const sql = `SELECT * FROM %I WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableVacancies}`, Object.keys(payload), Object.values(payload)));
        if (result && result.rows && result.rows.length) {
            return result.rows;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('==> failed get vacancies ' + err);
        return null;
    }
}

async function addToDB(dataBase, payload, req) {
    try {
        const newVacancy = Object.assign(payload, req.body);
        const sql = `INSERT INTO %I(%s) VALUES (%L)`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableVacancies}`, Object.keys(newVacancy).toString(), Object.values(newVacancy)));
        return (result);
    }
    catch (err) {
        console.log('==> failed post vacancy ' + err);
        return null;
    }
}

async function addAllToDB(dataBase, payload, req) {
    try {
        const newVacancies = req.body.map((vacancy) => { return Object.assign(vacancy, payload) });
        const newVacanciesVal = newVacancies.map((vacancy) => { return Object.values(vacancy) });
        let sql = `INSERT INTO %I(%s) VALUES %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableVacancies}`, Object.keys(newVacancies[0]).toString(), newVacanciesVal));
        return (result);
    }
    catch (err) {
        console.log('==> failed post vacancies ' + err);
        return null;
    }
}

async function delFromDB(dataBase, payload, req) {
    try {
        const sql = `DELETE FROM %I WHERE %I = %L;`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableVacancies}`, 'origin_id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed delete vacancy ' + err);
        return null;
    }
}

async function delAllFromDB(dataBase, payload, req) {
    try {
        const sql = `DELETE FROM %I WHERE %I = %L AND pinned = 'false'`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableVacancies}`, Object.keys(payload), Object.values(payload)));
        return (result);
    }
    catch (err) {
        console.log('==> failed delete vacancies ' + err);
        return null;
    }
}

async function updateDB(dataBase, payload, req) {
    try {
        const sql = `UPDATE %I SET %I = %L WHERE %I = %L`;
        const result = await dataBaseQuery(dataBase, format(sql,
            `${DB_CONFIG.tableVacancies}`, 'pinned', req.body.pinned, 'origin_id', req.params.id));
        return (result);
    }
    catch (err) {
        console.log('==> failed update vacancy ' + err);
        return null;
    }
}

module.exports = { getFromDB, addToDB, addAllToDB, delFromDB, delAllFromDB, updateDB };
