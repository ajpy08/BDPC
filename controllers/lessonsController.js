const Lesson = require('../models/lesson');
const Student = require('../models/student');

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
    },
    getLessonsByCourse: (req, res) => {
        const course = req.query.course;
        let filtro = '{';

        if (course != undefined && course != '')
            filtro += '\"course\":' + '\"' + course + '\",';

        if (filtro != '{')
            filtro = filtro.slice(0, -1);
        filtro = filtro + '}';

        const jsonFilter = JSON.parse(filtro);

        // let filtroAggregation = '{';

        // filtroAggregation += '\"lessons\":' + 1;

        // filtroAggregation = filtroAggregation + '}';

        // const jsonAggregation = JSON.parse(filtroAggregation);

        Lesson.find(jsonFilter, (err, lessons) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            Student.find({ "courses": { $elemMatch: { course: course } } }, (err, students) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al buscar registros',
                        errors: err
                    });
                }
                return res.status(200).json({ lessons, studentsAccess : students });
            });
        });
    }
}