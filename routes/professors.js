const router = require('express').Router();
const professorsController = require('../controllers/professorsController');
const apiKey = require('../controllers/apiKeysController');

router.get('/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        professorsController.list(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.post('/create/:uuid', async (req, res) => {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        professorsController.insert(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.put('/update/:uuid', async (req, res) => {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        professorsController.update(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
})

router.delete('/delete/:uuid', async (req, res) => {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        professorsController.delete(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

module.exports = router;