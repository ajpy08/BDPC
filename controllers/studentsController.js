const Student = require('../models/student');
const Course = require('../models/course');

module.exports = {
    list: (req, res) => {
        Student.find((err, student) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json(student);
        });
    },
    insert: (req, res) => {
        const student = new Student(req.body);
        student.save((err, studentCreate) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar nuevo registro',
                    errors: err
                });
            }
            return res.status(200).json({
                ok: true,
                student: studentCreate
            });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Student.findById(id, (err, student) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                });
            }
            student.nombre = req.body.nombre !== undefined ? req.body.nombre : student.nombre;
            student.email = req.body.email !== undefined ? req.body.email : student.email;
            student.password = req.body.password !== undefined ? req.body.password : student.password;
            student.curso = req.body.curso !== undefined ? req.body.curso : student.curso;

            student.save((err, studentUpdate) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar registro',
                    });
                }
                res.status(200).json({
                    ok: true,
                    student: studentUpdate
                });
            });
        });
    },
    delete: (req, res) => {
        const id = req.body._id;
        Student.findByIdAndRemove(id, (err, studentDelete) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar registro'
                });
            }
            res.status(200).json({
                ok: true,
                student: studentDelete
            });
        });
    },
    myCourses: (req, res) => {
        var curso = req.query.curso;
        Course.find({ noCurso: { $lte: curso } }, (err, cursos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json(cursos);
        });
    }
}