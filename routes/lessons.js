const router = require('express').Router();
const lessonsController = require('../controllers/lessonsController');
const apiKey = require('../controllers/apiKeysController');

router.get('/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        lessonsController.list(req, res);
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
        lessonsController.insert(req, res);
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
        lessonsController.update(req, res);
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
        lessonsController.delete(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.get('/lessons-by-course/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        lessonsController.getLessonsByCourse(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

module.exports = router;