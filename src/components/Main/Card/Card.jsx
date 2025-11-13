import React from 'react'; 
// O import { memo } from 'react'; si prefieres la desestructuración.

function Card(props) {
  // 1. Desestructurar las nuevas props: onCardLike y onCardDelete
  const { card, onCardClick, onCardLike, onCardDelete } = props; 
  
  // Desestructurar propiedades de la tarjeta (incluyendo likes para el contador)
  const { name, link, isLiked, likes } = card; 

  // Función para abrir el popup de imagen
  function handleClick() {
    onCardClick(card); 
  }
  
  // 2. Controlador para dar/quitar "Me gusta"
  function handleLikeClick() {
  console.log("➡️ CARD: Clic detectado en tarjeta:", card._id); // ✅ Log 1
  onCardLike(card); 
}
  
  // 3. Controlador para eliminar la tarjeta
  function handleDeleteClick() {
    onCardDelete(card); // Llama a la función que recibimos de Main
  }

  // Crea la clase condicional para el botón de "Me gusta"
  const likeButtonClassName = `main__like-button ${isLiked ? 'main__like-button_active' : ''}`;
  
  // Asumimos que el contador de likes se muestra con likes.length
  
  return (
    <article className="main__card">
      {/* Botón de Eliminar */}
      <button 
        className="main__delete-button" 
        aria-label="Eliminar"
        onClick={handleDeleteClick} // ⬅️ Adjuntar controlador de eliminación
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

      <div className="main__card-footer">
        {/* Título */}
        <h2 className="main__title">{name}</h2>

        {/* Botón de Like */}
        <div className="main__like-wrapper">
          <button 
            className={likeButtonClassName} 
            aria-label="Me gusta"
            onClick={handleLikeClick} // ⬅️ Adjuntar controlador de "Me gusta"
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
        {/* 4. Mostrar el contador de likes */}
        <span className="main__like-count">{likes ? likes.length : 0}</span> 
        </div>
        
      </div>
    </article>
  );
}

// 🎯 Optimización: Exportar el componente envuelto en React.memo
export default React.memo(Card);