import React, { useState, useEffect } from 'react';
import './Evaluation.css';

const Evaluation = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [evaluations, setEvaluations] = useState([]);
  const [userEvaluation, setUserEvaluation] = useState(null);

  const evaluatorId = localStorage.getItem('userId');
  const evaluatorRole = localStorage.getItem('userRole');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/evaluations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, rating, evaluatorId, evaluatorRole })
      });
      if (response.ok) {
        const newEvaluation = await response.json();
        setEvaluations((prevEvaluations) => {
          const index = prevEvaluations.findIndex(e => e.evaluatorId === evaluatorId && e.evaluatorRole === evaluatorRole);
          if (index >= 0) {
            prevEvaluations[index] = newEvaluation;
            return [...prevEvaluations];
          } else {
            return [...prevEvaluations, newEvaluation];
          }
        });
        setUserEvaluation(newEvaluation);
        setComment('');
        setRating(0);
      } else {
        alert('Failed to submit evaluation');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/evaluations/list');
        const data = await response.json();
        setEvaluations(data);
        const existingEvaluation = data.find(e => e.evaluatorId === evaluatorId && e.evaluatorRole === evaluatorRole);
        if (existingEvaluation) {
          setUserEvaluation(existingEvaluation);
          setComment(existingEvaluation.comment || ''); // Ensure comment is handled properly
          setRating(existingEvaluation.rating);
        }
      } catch (error) {
        console.error('Error fetching evaluations:', error);
      }
    };

    fetchEvaluations();
  }, [evaluatorId, evaluatorRole]);

  return (
    <div className="evaluation-container">
      <h1 className="evaluation-title">Evaluation</h1>
      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-group">
          <label htmlFor="comment">Comment (optional):</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <div className="rating-stars">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <span
                  key={index}
                  className={index <= (hover || rating) ? 'star filled' : 'star'}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
        </div>
        <button type="submit" className="submit-button">
          {userEvaluation ? 'Update' : 'Submit'}
        </button>
      </form>
      <h2 className="previous-evaluations-title">Previous Evaluations</h2>
      <ul className="evaluation-list">
        {evaluations.map((evaluation) => (
          <li key={evaluation.id} className="evaluation-item">
            <p>{evaluation.comment || 'No comment'}</p>
            <p>Rating: {evaluation.rating}</p>
            <p>Evaluator: {evaluation.evaluatorRole}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evaluation;
