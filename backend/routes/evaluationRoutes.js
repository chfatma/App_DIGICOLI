const express = require('express');
const router = express.Router();
const { createEvaluation, getEvaluations, getStatistics } = require('../controllers/evaluationController');

// Route to create a new evaluation
router.post('/create', createEvaluation);

// Route to get all evaluations
router.get('/list', getEvaluations);

// Route to get statistics
router.get('/statistics', getStatistics);

module.exports = router;
