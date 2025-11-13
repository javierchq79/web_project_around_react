// src/components/Main/Main.jsx

import { useState, useEffect, useContext } from 'react'; // ⬅️ Importar useContext
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'; // ⬅️ Importar Contexto
// Importaciones de imágenes (rutas relativas a la carpeta 'src')
import jacquesAvatar from '../../assets/images/jacques-avatar.jpg';
import editIcon from '../../assets/images/Colebemis-Feather-Edit-3.svg';

// Importaciones de la API y Componentes
import { api } from '../../utils/api.js'; // ⬅️ 1. Importar la instancia de la API
import Popup from "./Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import EditProfile from "./form/EditProfile/EditProfile";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import Card from './Card/Card';
import ImagePopup from "./Popup/ImagePopup";

export default function Main() {
  // HOOKS Y ESTADOS DENTRO DEL COMPONENTE:
  
  // ⬅️ 2. Agregar la variable de estado 'cards'
  const [cards, setCards] = useState([]); 
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); 
  const currentUser = useContext(CurrentUserContext);
  
  // A. FUNCIÓN PARA DAR/QUITAR LIKE

// src/components/Main/Main.jsx

// En Main.jsx

async function handleCardLike(card) {
    // 1. Calcula el estado actual (Si el usuario ID está en el array likes)
    const isCurrentlyLiked = (card.likes || []).some(i => i._id === currentUser?._id);
    
    // 2. Envía la NEGACIÓN del estado actual.
    // Si isCurrentlyLiked es TRUE, enviamos FALSE (Quitar).
    // Si isCurrentlyLiked es FALSE, enviamos TRUE (Poner).
    await api.changeLikeCardStatus(card._id, !isCurrentlyLiked) 
        .then((newCard) => {
            // 3. Actualiza el estado de las tarjetas de forma inmutable
            setCards((state) => state.map((currentCard) => 
                currentCard._id === card._id ? newCard : currentCard
            ));
        })
        .catch((error) => console.error("Error al cambiar estado de like:", error));
}

  // B. FUNCIÓN PARA ELIMINAR TARJETA
  async function handleCardDelete(card) {
    // Llama a la API para eliminar la tarjeta
    await api.deleteCard(card._id)
      .then(() => {
        // Filtra y excluye la tarjeta eliminada del estado
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((error) => console.error("Error al eliminar tarjeta:", error));
  }

  // ----------------------------------------------------
  // 3. AGREGAR useEffect para obtener las tarjetas de la API
  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        // 4. Configurar los datos recibidos en el estado 'cards'
        setCards(data); 
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas iniciales:", err);
      });
  }, []); // Array de dependencias vacío para ejecutarse SOLO al montar

  // ----------------------------------------------------

  // 2. DEFINICIÓN DE CONTENIDOS DE POPUP (título y children)
  const newCardPopup = { title: 'Nuevo lugar', children: <NewCard /> };
  const editProfilePopup = { title: 'Editar perfil', children: <EditProfile /> };
  const editAvatarPopup = { title: 'Cambiar foto de perfil', children: <EditAvatar /> };

  // 3. FUNCIONES DE MANEJO DE POPUP
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null); // Cierra también el popup de imagen
  }

  function handleCardClick(card) { 
    setSelectedCard(card); // Abre la imagen
  }

  // Lógica para cierre con la tecla Esc
  useEffect(() => {
    if (popup || selectedCard) {
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          handleClosePopup();
        }
      }

      document.addEventListener('keydown', handleEscClose);

      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [popup, selectedCard]); 

  // ----------------------------------------------------

  return (
    <main className="main">
      {/* Perfil (No modificado) */}
      <section className="main__profile">
        <div className="main__avatar">
          <img
            src={jacquesAvatar}
            alt="Foto de perfil de Jacques Cousteau"
            className="main__avatar-image"
          />
          <button
            className="main__avatar-edit-button"
            aria-label="Editar avatar"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img src={editIcon} alt="" />
          </button>
        </div>

        <div className="main__info">
          <div className="main__name-wrapper">
            <h1 className="main__name">Jacques Cousteau</h1>
            <button
              className="main__edit-button"
              aria-label="Editar perfil"
              onClick={() => handleOpenPopup(editProfilePopup)}
            >
              <img src={editIcon} alt="" />
            </button>
          </div>
          <p className="main__description">Explorador</p>
        </div>

        <button
          className="main__add-button"
          aria-label="Añadir"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          +
        </button>
      </section>

      {/* Galería */}
      <section className="main__gallery">
        <div className="main__gallery-list">

          {/* Iteración de tarjetas: Ahora usa el estado 'cards' que viene de la API */}
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}      // ⬅️ Agregado: Función para dar/quitar like
              onCardDelete={handleCardDelete}  // ⬅️ Agregado: Función para eliminar
            />
          ))}

        </div>
      </section>

      {/* ... (Popups renderizados condicionalmente) ... */}
      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
        >
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={handleClosePopup}
        />
      )}

    </main>
  );
}