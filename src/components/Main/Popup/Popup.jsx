// src/components/Main/Popup/Popup.jsx

export default function Popup(props) {
  const { onClose, title, children } = props;

  // Función que maneja el clic en el fondo (Overlay)
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    // Aplicamos el manejador de clic externo al div principal
    <div 
      className="popup popup_opened" 
      onClick={handleOverlayClick}
    >
      <div 
        // APLICACIÓN CONDICIONAL DE CLASE MODIFICADORA
        className={`popup__container ${
          !title ? "popup__container_content_image" : ""
        }`} 
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        > 
          &times;
        </button>
        
        {/* RENDERIZADO CONDICIONAL DEL TÍTULO */}
        {title && <h3 className="popup__title">{title}</h3>}

        {children}
      </div>
    </div>
  );
}