const router = require('express').Router();
const apiKeysControllers = require('../controllers/apiKeysController');

router.post('/generateApi', (req, res) => {
    apiKeysControllers.createApi(req, res);
});

router.get('/getApiKey/:uuid', (req, res) => {
    apiKeysControllers.listApi(req, res);
})

module.exports = router;