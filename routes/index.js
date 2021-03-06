const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'ESTAS CONECTADO A LA API DE DACODES'
    });
});

const ApiKey = require('./apiKeys');
router.use('/apiKey', ApiKey);

const students = require('./students');
router.use('/students', students);

const professors = require('./professors');
router.use('/professors', professors);

const courses = require('./courses');
router.use('/courses', courses);

const lessons = require('./lessons');
router.use('/lessons', lessons);

const questions = require('./questions');
router.use('/questions', questions);

module.exports = router