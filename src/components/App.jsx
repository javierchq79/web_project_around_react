import React, { useState, useEffect } from 'react';
import { api } from './utils/api.js'; 
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
// Importaciones de Popups (Asegúrate de que las rutas sean correctas para tu proyecto)
import EditProfile from './components/Main/form/EditProfile/EditProfile'; 
import EditAvatar from './components/Main/form/EditAvatar/EditAvatar';
import NewCard from './components/Main/form/NewCard/NewCard'; // ⬅️ Asumiendo que esta es la ruta de tu componente AddPlace
import ImagePopup from './components/Main/Popup/ImagePopup';

// Importar el objeto de contexto
import { CurrentUserContext } from './contexts/CurrentUserContext.js'; 

export default function App() {
  // 1. Estados Levantados: Usuario y Tarjetas
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]); // ⬅️ Estado de tarjetas movido aquí
  
  // 2. Estado para el control de Popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); // ⬅️ Nuevo estado
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); 

  // ----------------------------------------------------
  // 3. EFECTOS: Carga Inicial de Usuario y Tarjetas
  // ----------------------------------------------------
  useEffect(() => {
    // Carga de Usuario
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Error al obtener la información del usuario:", err);
      });
      
    // Carga de Tarjetas (Movido de Main)
    api.getInitialCards()
      .then((data) => {
        setCards(data); 
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas iniciales:", err);
      });
  }, []); 

  // ----------------------------------------------------
  // 4. CONTROLADORES DE TARJETA (Movidos de Main)
  // ----------------------------------------------------

  async function handleCardLike(card) {
    const isCurrentlyLiked = (card.likes || []).some(i => i._id === currentUser?._id);
    
    await api.changeLikeCardStatus(card._id, !isCurrentlyLiked) 
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard
        ));
      })
      .catch((error) => console.error("Error al cambiar estado de like:", error));
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((error) => console.error("Error al eliminar tarjeta:", error));
  }
  
  // 5. FUNCIÓN PARA AÑADIR NUEVA TARJETA
const handleAddPlaceSubmit = async (data) => {
    try {
        const newCard = await api.addCard(data); 
        
        // ✅ CORRECCIÓN FINAL: Usar la forma funcional del setter.
        // Esto garantiza que siempre tienes el array 'cards' más reciente (state)
        // para aplicar el spread, evitando la necesidad de refrescar.
        setCards((prevCards) => [newCard, ...prevCards]); 
        
        closeAllPopups(); 
    } catch (error) {
        console.error("Error al crear nueva tarjeta:", error);
    }
};

  // ----------------------------------------------------
  // 6. FUNCIONES DE MANEJO DE POPUPS Y USUARIO
  // ----------------------------------------------------

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  
  const handleAddPlaceClick = () => { // ⬅️ Handler para el botón de Añadir
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };
  
  const handleUpdateUser = async (data) => {
    try {
      const newData = await api.setUserInfo(data);
      setCurrentUser(newData); 
      closeAllPopups();        
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
    }
  };
  
  const handleUpdateAvatar = async (data) => {
    try {
      const newData = await api.setUserAvatar(data);
      setCurrentUser(newData);
      closeAllPopups();
    } catch (error) {
      console.error("Error al actualizar avatar:", error);
    }
  };


  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}> 
      <div className="page__content">
        <Header />
        
        {/* 7. Pasar los controladores y el estado 'cards' a Main como props */}
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick} // ⬅️ Pasar handler de apertura de Añadir
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          
          cards={cards} // ⬅️ Estado de tarjetas
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        
        <Footer />
        
        {/* Renderizado condicional de Popups */}
        
        {isEditProfilePopupOpen && (
            <EditProfile 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
            />
        )}
        
        {isEditAvatarPopupOpen && (
            <EditAvatar 
                isOpen={isEditAvatarPopupOpen} 
                onClose={closeAllPopups} 
            />
        )}
        
        {isAddPlacePopupOpen && ( // ⬅️ Renderizado del Popup de Añadir Lugar
            <NewCard
                onClose={closeAllPopups}
                onSubmit={handleAddPlaceSubmit} // ⬅️ Pasar el handler de envío
                isOpen={isAddPlacePopupOpen}
            />
        )}

        {selectedCard && (
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
        )}
        
      </div>
    </CurrentUserContext.Provider>
  );
}