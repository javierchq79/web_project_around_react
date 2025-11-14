import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

// Importa ImagePopup si contiene la lógica CSS de los popups
// Si no tienes ImagePopup importado aquí, no te preocupes, el CSS lo define globalmente

export default function EditProfile({ isOpen, onClose }) {
  // Obtener datos y la función de actualización del contexto
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  // 1. Estado local del formulario con valores iniciales del contexto
  // Usamos el operador de encadenamiento opcional (?) y fusión nula (|| '')
  // para evitar errores si currentUser aún no se ha cargado.
  const [name, setName] = useState(currentUser?.name || ''); 
  const [description, setDescription] = useState(currentUser?.about || ''); 

  // 2. Controladores de cambio para las entradas
  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };
  
  // 3. Controlador de envío para la API
  const handleSubmit = (event) => {
    event.preventDefault(); 

    // Llama a la función del contexto para actualizar la API
    handleUpdateUser({ 
      name: name, 
      about: description 
    }); 
  };
  
  // 4. Lógica para la clase de apertura del Popup
  const popupClass = `popup ${isOpen ? 'popup_opened' : ''}`;

  return (
    // 5. Estructura visual del Popup: Contenedor de fondo
    <div className={popupClass} onClick={onClose}> 
      
      {/* Contenido del Popup: Evita el cierre al hacer clic dentro */}
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        
        <button
          className="popup__close-button"
          type="button"
          aria-label="Cerrar"
          onClick={onClose} 
        >
          &times;
        </button>
        
        <h3 className="popup__title">Editar perfil</h3>
        
        <form
          className='popup__form'
          name='profile-form'
          id='edit-profile-form'
          noValidate
          onSubmit={handleSubmit} // ⬅️ Adjunta el controlador de envío
        >
          {/* 6. INPUT DE NOMBRE */}
          <label className='popup__label'>
            <input
              className='popup__input popup__input_type_name'
              id='owner-name'
              maxLength='40'
              minLength='2'
              name='userName'
              placeholder='Nombre'
              required
              type='text'
              value={name} // Vincula name con el estado
              onChange={handleNameChange} // Agrega el controlador onChange
            />
            <span className='popup__error' id='owner-name-error'></span>
          </label>
          
          {/* 7. INPUT DE DESCRIPCIÓN */}
          <label className='popup__label'>
            <input
              className='popup__input popup__input_type_description'
              id='owner-description'
              maxLength='200'
              minLength='2'
              name='userDescription'
              placeholder='Acerca de mí'
              required
              type='text'
              value={description} // Vincula description con el estado
              onChange={handleDescriptionChange} // Agrega el controlador onChange
            />
            <span className='popup__error' id='owner-description-error'></span>
          </label>
          
          <button className='button popup__button' type='submit'>
            Guardar
          </button>
        </form>
        
      </div>
    </div>
  );
}