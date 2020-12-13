const Course = require('../models/course');

module.exports = {
    list: (req, res) => {
        Course.find((err, course) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json(course);
        });
    },
    insert: (req, res) => {
        const course = new Course(req.body);
        course.save((err, courseCreate) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar nuevo registro',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                course: courseCreate
            });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Course.findById(id, (err, course) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                });
            }
            // course.nombre = req.body.nombre !== undefined ? req.body.nombre : course.nombre;
            course.noCurso = req.body.noCurso !== undefined ? req.body.noCurso : course.noCurso;
            if (req.body.lessons && req.body.lessons.length > 0) {
                course.lessons = req.body.lessons;
            } else {
                course.lessons = undefined;
            }

            course.save((err, courseUpdate) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar registro',
                    });
                }
                res.status(200).json({
                    ok: true,
                    course: courseUpdate
                });
            });
        });
    },
    delete: (req, res) => {
        const id = req.body._id;
        Course.findByIdAndRemove(id, (err, courseDelete) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar registro'
                });
            }
            res.status(200).json({
                ok: true,
                course: courseDelete
            });
        });
    },
    
}