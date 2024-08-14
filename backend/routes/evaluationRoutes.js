const express = require('express');
const router = express.Router();
const { createEvaluation, getEvaluations, getStatistics } = require('../controllers/evaluationController');


router.post('/create', createEvaluation);


router.get('/list', getEvaluations);


router.get('/statistics', getStatistics);

module.exports = router;
