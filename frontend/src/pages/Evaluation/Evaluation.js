import React, { useState } from 'react';
import './Evaluation.css';

const Evaluation = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  const handleMouseOver = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className="evaluation-container">
      <h2 className="evaluation-title">Rate Us!</h2>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star, index) => {
          let starClass = 'star';
          if (star <= (hover || rating)) {
            starClass += ' filled';
          }
          return (
            <span
              key={index}
              className={starClass}
              onClick={() => handleClick(star)}
              onMouseOver={() => handleMouseOver(star)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </span>
          );
        })}
      </div>
      <div className="rating-text">
        {rating !== 0 ? (
          <p>Thank you for rating us {rating} {rating === 1 ? 'star' : 'stars'}!</p>
        ) : (
          <p>Hover over the stars and click to rate.</p>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
