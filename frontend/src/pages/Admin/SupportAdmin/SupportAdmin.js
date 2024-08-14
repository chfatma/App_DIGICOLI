import React, { useState } from 'react';
import './SupportAdmin.css';

const Support = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const questions = [
    {
      question: "Comment modifier mon adresse dans mon profil ?",
      answer: 
        "Pour modifier votre adresse :\n" +
        "1. Cliquez sur votre photo de profil ou votre nom en haut à droite de l'écran pour accéder à votre profil.\n" +
        "2. Dans votre profil, cliquez sur le bouton 'Modifier l'adresse'.\n" +
        "3. Un formulaire s'affichera. Entrez votre nouvelle adresse dans les champs appropriés.\n" +
        "4. Une fois terminé, cliquez sur 'Enregistrer' pour confirmer les modifications.\n" +
        "Si vous rencontrez des difficultés, assurez-vous que tous les champs sont correctement remplis."
    },
    {
      question: "Comment suivre un colis pour un client ?",
      answer: 
        "Pour suivre un colis :\n" +
        "1. Rendez-vous dans la section 'Suivi des colis' depuis le menu principal de votre tableau de bord.\n" +
        "2. Demandez au client le numéro de suivi de son colis.\n" +
        "3. Entrez le numéro de suivi dans le champ dédié et cliquez sur 'Rechercher'.\n" +
        "4. Vous verrez alors les informations de suivi du colis, telles que l'état actuel et l'historique des étapes de livraison.\n" +
        "Si vous ne trouvez pas le colis, vérifiez que le numéro de suivi est correct."
    },
    {
      question: "Comment ajouter un nouveau livreur au système ?",
      answer: 
        "Pour ajouter un nouveau livreur :\n" +
        "1. Accédez à la section 'Gestion des livreurs' à partir du menu de gauche.\n" +
        "2. Cliquez sur le bouton 'Ajouter un livreur' pour ouvrir le formulaire d'ajout.\n" +
        "3. Remplissez toutes les informations requises, telles que le nom, le prénom, l'adresse email, et le numéro de téléphone du livreur.\n" +
        "4. Assurez-vous que toutes les informations sont correctes, puis cliquez sur 'Enregistrer'.\n" +
        "Le nouveau livreur sera alors ajouté au système et pourra être assigné à des livraisons."
    },
    {
      question: "Comment gérer les évaluations des livraisons ?",
      answer: 
        "Pour gérer les évaluations des livraisons :\n" +
        "1. Allez dans la section 'Évaluations' depuis le tableau de bord.\n" +
        "2. Vous verrez la liste des évaluations laissées par les clients pour chaque livraison.\n" +
        "3. Cliquez sur une évaluation pour voir plus de détails. Vous pouvez également y répondre pour améliorer la satisfaction client.\n" +
        "4. Si une évaluation semble injuste ou incorrecte, vous pouvez contacter le client pour clarifier la situation.\n" +
        "N'oubliez pas que ces évaluations aident à améliorer la qualité du service de livraison."
    },
    {
      question: "Comment visualiser les statistiques des livraisons ?",
      answer: 
        "Pour visualiser les statistiques des livraisons :\n" +
        "1. Accédez à la section 'Statistiques' à partir de votre tableau de bord.\n" +
        "2. Vous y trouverez des graphiques et des rapports détaillés sur les performances de livraison, y compris le nombre de colis livrés, les délais moyens de livraison, et les évaluations des clients.\n" +
        "3. Utilisez les filtres disponibles pour affiner les statistiques par période ou par livreur.\n" +
        "Ces statistiques vous aident à suivre l'efficacité du service et à identifier les domaines à améliorer."
    },
    {
      question: "Comment contacter le support technique si j'ai un problème ?",
      answer: 
        "Pour contacter le support technique :\n" +
        "1. Si vous avez un problème, vous pouvez utiliser l'icône de chat située en bas à droite de l'écran pour discuter en direct avec un membre de l'équipe de support.\n" +
        "2. Si le chat n'est pas disponible, vous pouvez envoyer un email à support@exemple.com avec une description détaillée de votre problème.\n" +
        "3. N'oubliez pas d'inclure des captures d'écran si nécessaire pour aider le support à comprendre et résoudre votre problème plus rapidement."
    },
    {
      question: "Comment attribuer un colis à un livreur spécifique ?",
      answer: 
        "Pour attribuer un colis à un livreur spécifique :\n" +
        "1. Accédez à la section 'Liste des colis' depuis le menu de gestion des colis.\n" +
        "2. Trouvez le colis que vous souhaitez attribuer à un livreur.\n" +
        "3. Cliquez sur le colis pour ouvrir les détails, puis sélectionnez un livreur dans le menu déroulant des livreurs disponibles.\n" +
        "4. Une fois le livreur sélectionné, cliquez sur 'Attribuer'. Le livreur recevra alors une notification pour la prise en charge du colis.\n" +
        "Assurez-vous que le livreur est disponible avant de lui attribuer le colis."
    }
  ];

  const handleQuestionClick = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="support-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Support</h1>
      </div>
      <div className="support-container">
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
    </div>
  );
};

export default Support;
