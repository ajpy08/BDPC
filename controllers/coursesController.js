const Course = require('../models/course');
const Student = require('../models/student');
const Varias = require("../public/varias");

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
            return res.status(200).json({ course });
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
            return res.status(200).json({ courseCreate });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Course.findById(id, (err, course) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                    errors: err
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
                        errors: err
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
                    mensaje: 'Error al eliminar registro',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                course: courseDelete
            });
        });
    },
    getCoursesStudents: (req, res) => {
        let resp = [];
        Course.find(async(err, courses) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }

            const start = async () => {
                await Varias.asyncForEach(courses, async (c) => {
                    await Student.find({ "courses": { $elemMatch: { course: c._id } } }, (err, students) => {
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                mensaje: 'Error al buscar registros',
                                errors: err
                            });
                        }
                        if (students.length > 0) {
                            resp.push({
                                course: c,
                                students: students
                            });
                        }
                    });
                });
            };
            await start();
            return res.status(200).json({ cursos: resp });
        });
    }
}