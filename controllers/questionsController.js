const Question = require('../models/question');

module.exports = {
    list: (req, res) => {
        Question.find((err, question) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registros',
                    errors: err
                });
            }
            return res.status(200).json({ question });
        });
    },
    insert: (req, res) => {
        const question = new Question(req.body);
        question.save((err, questionCreate) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    mensaje: 'Error al guardar nuevo registro',
                    errors: err
                });
            }
            return res.status(200).json({ questionCreate });
        })
    },
    update: (req, res) => {
        const id = req.body._id;
        Question.findById(id, (err, question) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al buscar registro',
                    errors: err
                });
            }
            question.titulo = req.body.titulo !== undefined ? req.body.titulo : question.titulo;
            question.tipoCalificacion = req.body.tipoCalificacion !== undefined ? req.body.tipoCalificacion : question.tipoCalificacion;
            question.score = req.body.score !== undefined ? req.body.score : question.score;
            if (req.body.answers && req.body.answers.length > 0) {
                question.answers = req.body.answers;
            } else {
                question.answers = undefined;
            }

            question.save((err, questionUpdate) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar registro',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    question: questionUpdate
                });
            });
        });
    },
    delete: (req, res) => {
        const id = req.body._id;
        Question.findByIdAndRemove(id, (err, questionDelete) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al eliminar registro',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                question: questionDelete
            });
        });
    }
}