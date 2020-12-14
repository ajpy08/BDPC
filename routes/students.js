const router = require('express').Router();
const studentsController = require('../controllers/studentsController');
const apiKey = require('../controllers/apiKeysController');

router.get('/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        studentsController.list(req, res);
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
        studentsController.insert(req, res);
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
        studentsController.update(req, res);
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
        studentsController.delete(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.get('/my-courses/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        studentsController.getMyCourses(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.get('/students-in-a-course/:uuid', async (req, res)=> {
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        studentsController.getStudentsInACourse(req, res);
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

module.exports = router;