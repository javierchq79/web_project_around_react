import { useState, useEffect, useContext } from 'react'; 
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'; 
// Importaciones de imágenes (rutas relativas a la carpeta 'src')
import jacquesAvatar from '../../assets/images/jacques-avatar.jpg';
import editIcon from '../../assets/images/Colebemis-Feather-Edit-3.svg';

// Importaciones de la API y Componentes
import { api } from '../../utils/api.js'; 
import Card from './Card/Card';

// 💡 Main ahora recibe los controladores de popup de App
export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick: openImagePopup }) {
import Popup from "./Popup/Popup";
  
  // HOOKS Y ESTADOS DENTRO DEL COMPONENTE:
  const [cards, setCards] = useState([]); 
  
  // ✅ Obtener currentUser del contexto para el perfil y likes
  const { currentUser } = useContext(CurrentUserContext);
  
  // ----------------------------------------------------
  // A. FUNCIÓN PARA DAR/QUITAR LIKE
  async function handleCardLike(card) {
    // Calcula el estado actual (Si el usuario ID está en el array likes)
    const isCurrentlyLiked = (card.likes || []).some(i => i._id === currentUser?._id);

    try {
      // Enviamos la negación: si está liked -> pedir que lo quite; si no -> pedir que lo ponga
      // La lógica de Api.js debe manejar la inversión: TRUE para like, FALSE para unlike.
      const newCard = await api.changeLikeCardStatus(card._id, !isCurrentlyLiked);

      // Actualiza el estado con la tarjeta que regresó el backend
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    } catch (error) {
      console.error("Error al cambiar estado de like:", error);
    }
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
    // Solo cargamos tarjetas; la info de usuario se carga en App
    api.getInitialCards()
      .then((data) => {
        setCards(data); 
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas iniciales:", err);
      });
  }, []); 
  
  // ----------------------------------------------------

  return (
    <main className="main">
      {/* Perfil */}
      <section className="main__profile">
        <div className="main__avatar">
          <img
            // ✅ Usa el avatar de currentUser
            src={currentUser.avatar || jacquesAvatar} 
            alt={`Foto de perfil de ${currentUser.name || 'usuario'}`}
            className="main__avatar-image"
          />
          <button
            className="main__avatar-edit-button"
            aria-label="Editar avatar"
            onClick={onEditAvatar} // ⬅️ Usa el prop de App
          >
            <img src={editIcon} alt="" />
          </button>
        </div>

        <div className="main__info">
          <div className="main__name-wrapper">
            {/* ✅ Usa el nombre de currentUser */}
            <h1 className="main__name">{currentUser.name || 'Cargando...'}</h1>
            <button
              className="main__edit-button"
              aria-label="Editar perfil"
              onClick={onEditProfile} // ⬅️ Usa el prop de App
            >
              <img src={editIcon} alt="" />
            </button>
          </div>
          {/* ✅ Usa la descripción de currentUser */}
          <p className="main__description">{currentUser.about || 'Explorador'}</p>
        </div>

        <button
          className="main__add-button"
          aria-label="Añadir"
          onClick={onAddPlace} // ⬅️ Usa el prop de App
        >
          +
        </button>
      </section>

      {/* Galería */}
      <section className="main__gallery">
        <div className="main__gallery-list">
          {cards.map((card) => {
            // ✅ Cálculo de isLiked (para la Card)
            const isLiked = (card.likes || []).some(i => i._id === currentUser?._id);

            return (
              <Card
                key={card._id}
                card={card}
                isLiked={isLiked} // ⬅️ Pasar el estado de like calculado
                onCardClick={openImagePopup} // ⬅️ Usar el prop renombrado
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}