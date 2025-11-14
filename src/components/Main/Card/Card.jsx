import React, { useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  // Datos de la tarjeta
  const { name, link, likes } = card;

  // ✔ Determinar si el usuario actual ya dio like
  
  const isLiked = card.isLiked === true;



  // ✔ Clase del botón
  const likeButtonClassName = `main__like-button ${
    isLiked ? "main__like-button_active" : ""
  }`;

  // Handlers
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    console.log("LIKE CLICK en card:", card._id, "isLiked:", isLiked);
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  console.log("CARD:", card._id, "LIKES:", card.likes);

  console.log("CARD COMPLETA:", JSON.stringify(card, null, 2));

  return (
    <article className="main__card">
      
      {/* Botón de eliminar */}
      <button
        className="main__delete-button"
        aria-label="Eliminar"
        onClick={handleDeleteClick}
      >
        <svg
          className="main__delete-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
          />
        </svg>
      </button>

      {/* Imagen */}
      <img
        src={link}
        alt={name}
        className="main__image"
        onClick={handleClick}
      />

      {/* Footer */}
      <div className="main__card-footer">
        <h2 className="main__title">{name}</h2>

        <div className="main__like-wrapper">
          <button
            className={likeButtonClassName}
            aria-label="Me gusta"
            onClick={handleLikeClick}
          >
            <svg
              className="main__like-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#888"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" />
            </svg>
          </button>

          {/* Contador de likes */}
<span className="main__like-count">
  {card.isLiked ? 1 : 0}
</span>

        </div>
      </div>
    </article>
  );
}

export default React.memo(Card);
