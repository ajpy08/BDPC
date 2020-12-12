const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'ESTAS CONECTADO A LA API DE DACODES'
    });
});

const ApiKey = require('./apiKeys');
router.use('/apiKey', ApiKey);

const students = require('./students');
router.use('/students', students);

module.exports = router