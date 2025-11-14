import React, { useState, useEffect } from 'react';


export default function NewCard({ isOpen, onClose, onSubmit }) {
    // 1. Estados gestionados para los inputs (asumiendo que usas useState)
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

// ✅ LIMPIEZA AL ABRIR/CERRAR:
    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]); // Se ejecuta cada vez que el valor de 'isOpen' cambia

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Llamada al handler que está en App.jsx para crear la tarjeta
        onSubmit({ name, link }); 
        
        // Limpiar el formulario después del envío exitoso (si la API tiene éxito)
        // Nota: El formulario se limpiará automáticamente con la lógica de cierre en App
    };

    // 2. Lógica para la clase de apertura del Popup
    const popupClass = `popup ${isOpen ? 'popup_opened' : ''}`;

    return (
        // 3. Estructura visual del Popup: Contenedor de fondo
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
                
                <h3 className="popup__title">Nuevo lugar</h3>
                
                <form 
                    className='popup__form' 
                    name='new-card-form' 
                    onSubmit={handleSubmit} // ⬅️ Adjunta el envío
                    noValidate
                >
                    <label className='popup__label'>
                        <input
                            className='popup__input popup__input_type_title'
                            name='name'
                            placeholder='Título'
                            required
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>

                    <label className='popup__label'>
                        <input
                            className='popup__input popup__input_type_link'
                            name='link'
                            placeholder='Enlace de la imagen'
                            required
                            type='url'
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </label>

                    <button className='button popup__button' type='submit'>
                        Crear
                    </button>
                </form>
            </div>
        </div>
    );
}