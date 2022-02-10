const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
var path = require('path');
const dataBaseCreate = require('./modules/dataBaseHandler');
const handleRequest = require('./modules/requestHandler');

const app = express();
const port = process.env.PORT || 5050;

app.use(express.static(`${__dirname}/../../dist`));
app.use(serveStatic(__dirname + "/../../dist"));
app.use(express.json({limit: '50mb'}));
app.use(history());


let dataBase;
dataBaseCreate().then((res) => (dataBase = res));

app.get('/vacancies', async (req, res) => {
    handleRequest(dataBase, req, res, 'get');
});
app.post('/vacancy', async (req, res) => {
    handleRequest(dataBase, req, res, 'add');
});
app.post('/vacancies', async (req, res) => {
    handleRequest(dataBase, req, res, 'addAll');
});
app.put('/vacancy/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'update');
});
app.delete('/vacancy/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'del');
});
app.delete('/vacancies', async (req, res) => {
    handleRequest(dataBase, req, res, 'delAll');
});
app.get('/user', async (req, res) => {
    handleRequest(dataBase, req, res, 'getUser');
});
app.post('/user', async (req, res) => {
    handleRequest(dataBase, req, res, 'login');
});
app.put('/user/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'updateUser');
});
app.post('/user_photo/:id', async (req, res) => {
    handleRequest(dataBase, req, res, 'updateUserPhoto');
});
app.get('/provider', async (req, res) => {
    handleRequest(dataBase, req, res, 'provider');
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../dist/index.html'));
});

app.listen(port, () => { console.log(`listen at port ${port}...`); });
