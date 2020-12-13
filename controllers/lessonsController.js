const Lesson = require('../models/lesson');

module.exports = {
    list: (req, res) => {
        Lesson.find((err, lesson) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json({ lesson });
        });
    },
    insert: (req, res) => {
        const lesson = new Lesson(req.body);
        lesson.save((err, lessonCreate) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar nuevo registro',
                    errors: err
                });
            }
            return res.status(200).json({ lessonCreate });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Lesson.findById(id, (err, lesson) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                });
            }
            lesson.nombre = req.body.nombre !== undefined ? req.body.nombre : lesson.nombre;
            lesson.consecutivo = req.body.consecutivo !== undefined ? req.body.consecutivo : lesson.consecutivo;
            lesson.calificacionMin = req.body.calificacionMin !== undefined ? req.body.calificacionMin : lesson.calificacionMin;
            lesson.course = req.body.course !== undefined ? req.body.course : lesson.course;
            if (req.body.questions && req.body.questions.length > 0) {
                lesson.questions = req.body.questions;
            } else {
                lesson.questions = undefined;
            }

            lesson.save((err, lessonUpdate) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar registro',
                    });
                }
                res.status(200).json({
                    ok: true,
                    lesson: lessonUpdate
                });
            });
        });
    },
    delete: (req, res) => {
        const id = req.body._id;
        Lesson.findByIdAndRemove(id, (err, lessonDelete) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar registro'
                });
            }
            res.status(200).json({
                ok: true,
                lesson: lessonDelete
            });
        });
    }
}