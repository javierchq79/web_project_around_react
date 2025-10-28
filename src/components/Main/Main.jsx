// src/components/Main/Main.jsx

import { useState, useEffect } from 'react';
// Importaciones de imágenes (rutas relativas a la carpeta 'src')
import jacquesAvatar from '../../assets/images/jacques-avatar.jpg';
import editIcon from '../../assets/images/Colebemis-Feather-Edit-3.svg';

// Importaciones de componentes de Popups y Contenido
import Popup from "./Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import EditProfile from "./form/EditProfile/EditProfile";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import Card from './Card/Card';
import ImagePopup from "./Popup/ImagePopup"; // Importación correcta

// Constante de tarjetas (Debe estar fuera de la función Main)
const cards = [
  {
    isLiked: false,
    _id: '5d1f0611d321eb4bdcd707dd',
    name: 'Yosemite Valley',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:10:57.741Z',
    likes: 5,
  },
  {
    isLiked: false,
    _id: '5d1f064ed321eb4bdcd707de',
    name: 'Lake Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    owner: '5d1f0611d321eb4bdcd707dd',
    createdAt: '2019-07-05T08:11:58.324Z',
    likes: 12,
  },
];
console.log(cards);

// ----------------------------------------------------

export default function Main() {
  // HOOKS Y ESTADOS DENTRO DEL COMPONENTE:
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); // <-- CORRECCIÓN: MOVIDO AQUÍ

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

  function handleCardClick(card) { // <-- CORRECCIÓN: Declaración única
    setSelectedCard(card); // Abre la imagen
  }

  // Lógica para cierre con la tecla Esc
  useEffect(() => {
    // Solo registramos el evento si hay un popup abierto (popup o selectedCard)
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
  }, [popup, selectedCard]); // Dependencia actualizada para ambos estados

  // ----------------------------------------------------

  return (
    <main className="main">
      {/* Perfil */}
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

          {/* Iteración de tarjetas */}
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
            />
          ))}

        </div>
      </section>

      {/* RENDERIZADO CONDICIONAL DE POPUP GENÉRICO */}
      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
        >
          {popup.children}
        </Popup>
      )}

      {/* RENDERIZADO CONDICIONAL DE IMAGE POPUP */}
      {selectedCard && (
        <ImagePopup
          card={selectedCard}
          onClose={handleClosePopup}
        />
      )}

    </main>
  );
}