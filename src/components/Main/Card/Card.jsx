// src/components/Main/Card/Card.jsx

export default function Card(props) {
  // Desestructuración Correcta:
  // 1. Extrae 'card' y 'onCardClick' directamente de props.
  const { card, onCardClick } = props; 
  
  // 2. Extrae las propiedades de la tarjeta desde el objeto 'card'.
  // Puedes renombrar 'card' para que quede limpio en el resto del código.
  const { name, link, isLiked } = card; 

  // Función que se dispara al hacer clic en la imagen
  function handleClick() {
    onCardClick(card); // Llama a la función que recibimos, pasándole los datos de la tarjeta
  }

// 👇 ¡LÍNEA FALTANTE QUE CAUSABA EL ERROR! 👇
  // Crea la clase condicional para el botón de "Me gusta"
  const likeButtonClassName = `main__like-button ${isLiked ? 'main__like-button_active' : ''}`;
  // 👆 ------------------------------------------- 👆

  return (
    // CAMBIO 1: Reemplazar <li> por <article>
    <article className="main__card">
      {/* Botón de Eliminar */}
      <button className="main__delete-button" aria-label="Eliminar">
        <svg
          className="main__delete-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* CAMBIO 2: stroke-width a strokeWidth */}
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
        <button className={likeButtonClassName} aria-label="Me gusta">
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
            {/* CAMBIO 3: stroke-width a strokeWidth */}
            <path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0s-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
