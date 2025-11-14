import React, { useRef, useContext, useEffect } from 'react';
// 🎯 RUTA CORREGIDA: Se necesitan tres niveles de '..' para subir de 'Main/form/EditAvatar' a 'src'
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext'; 

export default function EditAvatar({ isOpen, onClose }) {
  // Obtener la función de actualización del contexto
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  
  // Crear la ref para acceder directamente al input
  const avatarRef = useRef();

  // Efecto para limpiar el campo cada vez que se abre/cierra el popup
  useEffect(() => {
    if (avatarRef.current) {
      avatarRef.current.value = '';
    }
  }, [isOpen]); 

  // Controlador de envío para la API (usando el valor de la ref)
  function handleSubmit(e) {
    e.preventDefault();

    // Llama a la función del contexto con el valor actual de la ref
    handleUpdateAvatar({
      avatar: avatarRef.current.value, 
    });
  }
  
  // Lógica para la clase de apertura del Popup (Estructura visual)
  const popupClass = `popup ${isOpen ? 'popup_opened' : ''}`;

  return (
    // Estructura visual del Popup: Contenedor de fondo
    <div className={popupClass} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        >
          &times; {/* Botón de cierre visible */}
        </button>
        
        <h3 className="popup__title">Cambiar foto de perfil</h3>
        
        <form 
          className="popup__form" 
          name="avatar-form" 
          onSubmit={handleSubmit} // ⬅️ Adjunta el envío
          noValidate
        >
          <label className="popup__label">
            <input
              className="popup__input popup__input_type_url"
              id="avatar-link"
              name="link"
              placeholder="Enlace de la imagen"
              required
              type="url"
              ref={avatarRef} // ⬅️ Asigna la ref al input
            />
            <span className="popup__error" id="avatar-link-error"></span>
          </label>
          
          <button className="button popup__button" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}