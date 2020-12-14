const router = require('express').Router();
const lessonsController = require('../controllers/lessonsController');
const apiKey = require('../controllers/apiKeysController');

router.get('/:uuid', async (req, res)=> {
    // le paso por query el usuario loggeado para hacerlo sencillo,
    // normalmente usaria JWToken y cuando valide el token traigo el user en el metodo verify
    const userLogged = req.body.userLogged;
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        if (userLogged.role === ROLES.PROFESOR_ROLE) {
            lessonsController.list(req, res);
        } else{
            return res.status(400).json({
                mensaje: 'Solo los profesores pueden realizar esta acción',
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.post('/create/:uuid', async (req, res) => {
    const userLogged = req.body.userLogged;
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        if (userLogged.role === ROLES.PROFESOR_ROLE) {
            lessonsController.insert(req, res);
        } else{
            return res.status(400).json({
                mensaje: 'Solo los profesores pueden realizar esta acción',
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.put('/update/:uuid', async (req, res) => {
    const userLogged = req.body.userLogged;
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        if (userLogged.role === ROLES.PROFESOR_ROLE) {
            lessonsController.update(req, res);
        } else{
            return res.status(400).json({
                mensaje: 'Solo los profesores pueden realizar esta acción',
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
})

router.delete('/delete/:uuid', async (req, res) => {
    const userLogged = req.body.userLogged;
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        if (userLogged.role === ROLES.PROFESOR_ROLE) {
            lessonsController.delete(req, res);
        } else{
            return res.status(400).json({
                mensaje: 'Solo los profesores pueden realizar esta acción',
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

router.get('/lessons-by-course/:uuid', async (req, res)=> {
    const userLogged = req.body.userLogged;
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        if (userLogged.role === ROLES.PROFESOR_ROLE) {
            lessonsController.getLessonsByCourse(req, res);
        } else{
            return res.status(400).json({
                mensaje: 'Solo los profesores pueden realizar esta acción',
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error de Autenticación ApiKey',
        });
    }
});

module.exports = router;