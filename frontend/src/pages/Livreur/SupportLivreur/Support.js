import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questions = [
    {
      question: "Comment modifier mon adresse ?",
      answer: (
        <>
          <p>Pour modifier votre adresse, suivez ces étapes :</p>
          <ol>
            <li>
              <strong>Connectez-vous à votre compte :</strong> Ouvrez l'application ou le site web et connectez-vous avec vos identifiants.
            </li>
            <li>
              <strong>Accédez à la section 'Profil' :</strong> Cliquez sur votre avatar ou votre nom en haut à droite de la page, puis sélectionnez 'Profil'.
            </li>
            <li>
              <strong>Cliquez sur 'Modifier l'adresse' :</strong> Vous trouverez ce bouton généralement près de vos informations actuelles.
            </li>
            <li>
              <strong>Entrez votre nouvelle adresse :</strong> Remplissez les champs avec les détails de votre nouvelle adresse. Assurez-vous que toutes les informations sont correctes.
            </li>
            <li>
              <strong>Enregistrez les modifications :</strong> Cliquez sur le bouton 'Enregistrer' ou 'Sauvegarder'. Vous recevrez une confirmation que votre adresse a été mise à jour.
            </li>
          </ol>
          <p>
            Si vous rencontrez des problèmes, vous pouvez contacter notre support pour obtenir de l'aide.
          </p>
        </>
      )
    },
    {
      question: "Comment suivre mon colis ?",
      answer: (
        <>
          <p>Pour suivre votre colis, suivez ces étapes :</p>
          <ol>
            <li>
              <strong>Accédez à la section 'Suivi des colis' :</strong> Trouvez cette section dans le menu principal ou dans votre tableau de bord.
            </li>
            <li>
              <strong>Entrez le numéro de suivi :</strong> Saisissez le numéro de suivi que vous avez reçu dans l'email de confirmation ou sur votre facture.
            </li>
            <li>
              <strong>Cliquez sur 'Rechercher' :</strong> Après avoir entré le numéro, cliquez sur le bouton 'Rechercher' pour voir les détails du suivi.
            </li>
            <li>
              <strong>Consultez les détails :</strong> Vous pourrez voir l'emplacement actuel de votre colis ainsi que son historique de livraison.
            </li>
          </ol>
          <p>
            Si les informations ne sont pas disponibles, vérifiez que vous avez entré le numéro de suivi correctement ou contactez notre support.
          </p>
        </>
      )
    },
    {
      question: "Comment contacter le support ?",
      answer: (
        <>
          <p>Voici comment vous pouvez contacter notre support :</p>
          <ol>
            <li>
              <strong>Utiliser l'icône de chat :</strong> Vous pouvez discuter en direct avec un conseiller en cliquant sur l'icône de chat située en bas à droite de votre écran. Un popup apparaîtra pour commencer la conversation.
            </li>
            <li>
              <strong>Envoyer un email :</strong> Si vous préférez un contact par email, envoyez votre message à support@exemple.com. Veuillez inclure les détails de votre demande pour une réponse plus rapide.
            </li>
            <li>
              <strong>Consulter la section 'Aide' :</strong> Vous trouverez également des guides utiles et des FAQ dans la section 'Aide' de notre site ou application. Cela peut répondre à vos questions sans avoir besoin de contacter le support.
            </li>
          </ol>
          <p>
            Nous nous efforçons de répondre à toutes les demandes dans les plus brefs délais. Merci de votre patience.
          </p>
        </>
      )
    },
    {
      question: "Comment évaluer une livraison ?",
      answer: (
        <>
          <p>Pour évaluer une livraison, procédez comme suit :</p>
          <ol>
            <li>
              <strong>Accédez à la section 'Évaluations' :</strong> Cette section est généralement disponible dans votre tableau de bord ou sous la rubrique 'Livraisons'.
            </li>
            <li>
              <strong>Sélectionnez la livraison :</strong> Choisissez la livraison que vous souhaitez évaluer en cliquant sur le numéro de commande ou sur un lien spécifique.
            </li>
            <li>
              <strong>Remplissez le formulaire d'évaluation :</strong> Vous pourrez attribuer une note et laisser un commentaire sur votre expérience. Soyez précis pour aider à améliorer nos services.
            </li>
            <li>
              <strong>Soumettez votre évaluation :</strong> Cliquez sur le bouton 'Soumettre' pour envoyer votre avis. Vous recevrez une confirmation que votre évaluation a été enregistrée.
            </li>
          </ol>
          <p>
            Vos retours sont précieux pour nous aider à améliorer la qualité de nos services.
          </p>
        </>
      )
    }
  ];

  const handleQuestionClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return ( 
  <div className="support-pageliv">
    <div className="dashboard-header">
      <h1 className="dashboard-title">Support</h1>
    </div>
    <div className="support-containerliv">
      <ul className="faq-listliv">
        {questions.map((item, index) => (
          <li key={index} className="faq-itemliv">
            <button className="faq-questionliv" onClick={() => handleQuestionClick(index)}>
              {item.question}
            </button>
            {openQuestion === index && <p className="faq-answerliv">{item.answer}</p>}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Support;
