const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'ESTAS CONECTADO A LA API DE DACODES'
    });
});

module.exports = router