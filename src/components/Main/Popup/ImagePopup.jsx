// src/components/Main/Popup/ImagePopup.jsx

// Este componente representa el popup completo de la imagen ampliada.

export default function ImagePopup(props) {
  // Desestructuramos la tarjeta y la función de cierre
  const { card, onClose } = props;
  
  // Condicional para verificar si hay una tarjeta seleccionada (evitar errores)
  const isOpened = !!card; 

  // Función que maneja el clic en el fondo (Overlay)
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  // Si no hay tarjeta seleccionada, no renderizamos nada (aunque Main.jsx ya lo verifica)
  if (!isOpened) {
    return null; 
  }

  return (
    // Usa la clase 'popup_opened' para la visibilidad y el handleOverlayClick
    <div 
      className="popup popup_opened popup_type_image" // <-- Clase específica para el popup de imagen si la tienes
      onClick={handleOverlayClick}
    >
      <div className="popup__figure-container"> {/* <-- Contenedor específico para la imagen */}
        
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          &times;
        </button>
        
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>

      </div>
    </div>
  );
}