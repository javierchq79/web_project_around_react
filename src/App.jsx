import React, { useState, useEffect } from 'react';
import { api } from './utils/api.js'; 
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

// Importar el objeto de contexto
import { CurrentUserContext } from './contexts/CurrentUserContext.js'; 

export default function App() {
  // 1. Crear la variable de estado currentUser
  const [currentUser, setCurrentUser] = useState({
      name: '', 
      about: '', 
      avatar: ''
  }); 

  // 2. Obtener información del usuario al montar el componente
  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        // 3. Actualizar el estado con el valor recibido
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Error al obtener la información del usuario:", err);
      });
  }, []); // Array de dependencias vacío para ejecutarse solo al montar

  return (
    // 4. Utilizar el proveedor y pasar el estado currentUser como valor
    <CurrentUserContext.Provider value={currentUser}> 
      <div className="page__content">
        <Header />
        <Main /> {/* El componente Main y sus hijos ahora pueden acceder a currentUser */}
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}