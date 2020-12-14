const router = require('express').Router();
const questionsController = require('../controllers/questionsController');
const apiKey = require('../controllers/apiKeysController');
const ROLES = require('../config/config').ROLES;

router.get('/:uuid', async (req, res)=> {
    // le paso por query el usuario loggeado que debo recibir del front para hacerlo sencillo,
    // no valido que exista ya que el request debe venir de un usuario logueado
    // normalmente usaria JWToken y cuando valide el token traigo el user en el metodo verify
    const userLogged = req.body.userLogged;
    const keyAuthentication = await apiKey.listApi(req, res);
    if (keyAuthentication) {
        if (userLogged.role === ROLES.PROFESOR_ROLE) {
            questionsController.list(req, res);
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
            questionsController.insert(req, res);
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
            questionsController.update(req, res);
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
            questionsController.delete(req, res);
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