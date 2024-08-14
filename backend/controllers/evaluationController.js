const Evaluation = require('../models/Evaluation');

exports.createEvaluation = async (req, res) => {
  const { comment, rating, evaluatorId, evaluatorRole } = req.body;

  try {
    // Check if an evaluation by the same evaluator exists
    let evaluation = await Evaluation.findOne({
      where: { evaluatorId, evaluatorRole }
    });

    if (evaluation) {
      // Update existing evaluation
      evaluation.comment = comment;
      evaluation.rating = rating;
      await evaluation.save();
      res.status(200).json(evaluation);
    } else {
      // Create new evaluation
      evaluation = await Evaluation.create({ comment, rating, evaluatorId, evaluatorRole });
      res.status(201).json(evaluation);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();

    const ratingsByRole = evaluations.reduce((acc, evaluation) => {
      if (!acc[evaluation.evaluatorRole]) {
        acc[evaluation.evaluatorRole] = 0;
      }
      acc[evaluation.evaluatorRole]++;
      return acc;
    }, {});

    const ratingsByStar = evaluations.reduce((acc, evaluation) => {
      if (!acc[evaluation.rating]) {
        acc[evaluation.rating] = 0;
      }
      acc[evaluation.rating]++;
      return acc;
    }, {});

    res.json({
      ratingsByRole: Object.keys(ratingsByRole).map(role => ({
        evaluatorRole: role,
        count: ratingsByRole[role]
      })),
      ratingsByStar: Object.keys(ratingsByStar).map(rating => ({
        rating: parseInt(rating),
        count: ratingsByStar[rating]
      }))
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
