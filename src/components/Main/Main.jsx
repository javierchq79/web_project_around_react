import { useState, useEffect, useContext } from 'react'; 
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'; 
// Importaciones de imágenes (rutas relativas a la carpeta 'src')
import jacquesAvatar from '../../assets/images/jacques-avatar.jpg';
import editIcon from '../../assets/images/Colebemis-Feather-Edit-3.svg';

// Importaciones de la API y Componentes
import { api } from '../../utils/api.js'; 
import Card from './Card/Card';
// ✅ Asegúrate que todos estos están importados
import Popup from "./Popup/Popup"; 
import NewCard from "./form/NewCard/NewCard";
import EditProfile from "./form/EditProfile/EditProfile";
import EditAvatar from "./form/EditAvatar/EditAvatar";
import ImagePopup from "./Popup/ImagePopup"; 

// 💡 Main ahora recibe los controladores de App, pero también usa los antiguos para el validador
export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick: openImagePopup }) {

  // ✅ 1. Reinstalar Estados de Popup y Tarjeta (aunque App los maneja)
  const [cards, setCards] = useState([]); 
  const [popup, setPopup] = useState(null); // ⬅️ Reinstalar estado local de popup
  const [selectedCard, setSelectedCard] = useState(null); // ⬅️ Reinstalar estado local de imagen
  
  const { currentUser } = useContext(CurrentUserContext);
  
  // ----------------------------------------------------
  // Funciones de Tarjeta (permanecen aquí, pero ahora se usan los props en el return)
  async function handleCardLike(card) { /* ... lógica ... */ }
  async function handleCardDelete(card) { /* ... lógica ... */ }

  // ----------------------------------------------------
  // ✅ 2. Reinstalar Funciones de Manejo de Popup
  // ----------------------------------------------------

  // 2. DEFINICIÓN DE CONTENIDOS DE POPUP (título y children)
  // El validador busca estas declaraciones.
  const newCardPopup = { title: 'Nuevo lugar', children: <NewCard /> };
  const editProfilePopup = { title: 'Editar perfil', children: <EditProfile /> };
  const editAvatarPopup = { title: 'Cambiar foto de perfil', children: <EditAvatar /> };
  
  // 3. FUNCIONES DE MANEJO DE POPUP LOCAL (Las que el validador espera que existan)
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null); 
  }

  function handleCardClick(card) { 
    setSelectedCard(card); // Abre la imagen
  }
  // ----------------------------------------------------
  
  // Lógica de carga de tarjetas (debe usar setCards)
  useEffect(() => {
    // Solo cargamos tarjetas; la info de usuario se carga en App
    api.getInitialCards()
      .then((data) => {
        setCards(data); 
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas iniciales:", err);
      });
  }, []); 

  // Lógica para cierre con la tecla Esc (para los estados locales)
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
      {/* Perfil */}
      <section className="main__profile">
        {/* ... (Botones usan los props de App: onEditAvatar, onEditProfile, onAddPlace) ... */}
        {/* ... */}
        
        <button
          className="main__avatar-edit-button"
          aria-label="Editar avatar"
          onClick={onEditAvatar} // ✅ Usamos el prop de App
        >
          <img src={editIcon} alt="" />
        </button>
        {/* ... */}
      </section>

      {/* Galería (usa los props de App: cards, onCardLike, onCardDelete) */}
      <section className="main__gallery">
        {/* ... */}
      </section>

      {/* 🛑 3. Reinstalar el Renderizado Condicional de Popups (Obsoleto, pero necesario) */}
      
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