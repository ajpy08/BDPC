const Student = require('../models/student');
const Course = require('../models/course');

module.exports = {
    list: (req, res) => {
        Student.find((err, students) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json({ students });
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
            return res.status(200).json({ studentCreate });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Student.findById(id, (err, student) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                    errors: err
                });
            }
            student.nombre = req.body.nombre !== undefined ? req.body.nombre : student.nombre;
            student.email = req.body.email !== undefined ? req.body.email : student.email;
            student.password = req.body.password !== undefined ? req.body.password : student.password;
            student.curso = req.body.curso !== undefined ? req.body.curso : student.curso;

            if (req.body.courses && req.body.courses.length > 0) {
                student.courses = req.body.courses;
            } else {
                student.courses = undefined;
            }

            student.save((err, studentUpdate) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar registro',
                        errors: err
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
                    mensaje: 'Error al eliminar registro',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                student: studentDelete
            });
        });
    },
    getMyCourses: (req, res) => {
        const student = req.query.student;
        Student.findById(student, (err, student) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            if (student) {
                Course.find({ noCurso: { $lte: student.curso } }, (err, cursos) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Error al buscar registros',
                            errors: err
                        });
                    }
                    return res.status(200).json({ cursos });
                });
            }
        });
    },
    getStudentsInACourse: (req, res) => {
        const course = req.query.course;
        Student.find({ "courses": { $elemMatch: { course: course } } }, (err, students) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json({ students });
        });
    },
}