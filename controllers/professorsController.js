const Professor = require('../models/professor');

module.exports = {
    list: (req, res) => {
        Professor.find((err, professor) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json(professor);
        });
    },
    insert: (req, res) => {
        const professor = new Professor(req.body);
        professor.save((err, professorCreate) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar nuevo registro',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                professor: professorCreate
            });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Professor.findById(id, (err, professor) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                });
            }
            professor.nombre = req.body.nombre !== undefined ? req.body.nombre : professor.nombre;
            professor.email = req.body.email !== undefined ? req.body.email : professor.email;
            professor.password = req.body.password !== undefined ? req.body.password : professor.password;

            professor.save((err, professorUpdate) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar registro',
                    });
                }
                res.status(200).json({
                    ok: true,
                    professor: professorUpdate
                });
            });
        });
    },
    delete: (req, res) => {
        const id = req.body._id;
        Professor.findByIdAndRemove(id, (err, professorDelete) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar registro'
                });
            }
            res.status(200).json({
                ok: true,
                professor: professorDelete
            });
        });
    }
}