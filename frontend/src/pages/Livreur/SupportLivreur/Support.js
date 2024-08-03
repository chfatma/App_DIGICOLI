import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questions = [
    {
      question: "Comment modifier mon adresse ?",
      answer: "Pour modifier votre adresse, allez dans la section 'Profil', cliquez sur 'Modifier l'adresse' et suivez les instructions."
    },
    {
      question: "Comment suivre mon colis ?",
      answer: "Pour suivre votre colis, allez dans la section 'Suivi des colis', entrez le numéro de suivi et cliquez sur 'Rechercher'."
    },
    {
      question: "Comment contacter le support ?",
      answer: "Vous pouvez contacter le support en cliquant sur l'icône de chat en bas à droite de l'écran ou en envoyant un email à support@exemple.com."
    },
    {
      question: "Comment évaluer une livraison ?",
      answer: "Pour évaluer une livraison, allez dans la section 'Évaluations', sélectionnez la livraison que vous souhaitez évaluer et donnez une note."
    }
  ];

  const handleQuestionClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="support-container">
      <h1>Support</h1>
      <ul className="faq-list">
        {questions.map((item, index) => (
          <li key={index} className="faq-item">
            <button className="faq-question" onClick={() => handleQuestionClick(index)}>
              {item.question}
            </button>
            {openQuestion === index && <p className="faq-answer">{item.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Support;
