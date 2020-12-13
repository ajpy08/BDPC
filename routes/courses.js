const router = require('express').Router();
const coursesController = require('../controllers/coursesController');
const apiKey = require('../controllers/apiKeysController');

router.get('/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        coursesController.list(req, res);
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
        coursesController.insert(req, res);
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
        coursesController.update(req, res);
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
        coursesController.delete(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

module.exports = router;