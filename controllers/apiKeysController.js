const ApiKey = require('../models/apikey');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    listApi: async (req, res) => {
        const uuid = req.params.uuid;
        let ok = true;
        let error;
        try {
            const l = await ApiKey.find({'ApiKey': uuid}, (err, autenticado) => {
                if (err) {
                    error = {
                        ok: false,
                        mensaje: 'Error al buscar ApiKey',
                        errors: err
                    }
                    return error;
                }
                if (autenticado === null || autenticado === undefined || autenticado.length == 0) {
                    ok = false;
                    return ok;
                } else {
                    ok = true
                    return ok
                }
            });
        } catch (e) {
            return res.status(400).json({
                error: error
            });
        }
        return ok;
    },
    createApi: (req, res) => {
        const ApiKeys = uuidv4();
        let apis = new ApiKey ({
            ApiKey: ApiKeys
        });
        apis.save((err, apiGuardada) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar ApiKey',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                clave: apiGuardada
            });
        });
    }
}