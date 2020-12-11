const express = require('express');
const app = express();
const enviroment = require('./config/config').config();
const db = require('./db');
app.use(express.json({limit: '50mb'}));
const router = require('./routes/index.js');
app.use('/api', router);

const port = enviroment.PORT;

app.listen(port, () => {
    console.log('Express Server ' + port + ': \x1b[32m%s\x1b[0m', 'ONLINE');
})