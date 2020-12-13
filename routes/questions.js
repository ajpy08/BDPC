const router = require('express').Router();
const questionsController = require('../controllers/questionsController');
const apiKey = require('../controllers/apiKeysController');

router.get('/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        questionsController.list(req, res);
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
        questionsController.insert(req, res);
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
        questionsController.update(req, res);
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
        questionsController.delete(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

module.exports = router;