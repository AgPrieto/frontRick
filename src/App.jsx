import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import {useDispatch} from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './App.css';
import {removeFav} from "./Redux/actions.js";
import Form from "./components/Form";
import Detail from "./components/Detail";
import Nav from './components/Nav.jsx';
import Cards from './components/Cards.jsx';
import About from './components/about.jsx';
import Favorites from './components/Favorites';
import Register from './components/register';
import Profile from './components/profile';


function App() {

  const dispatch = useDispatch();

const logOut = ()=> {
  const { logout } = useAuth0();
  
}


  const navigate = useNavigate();
  const location = useLocation();
  const [access, setAccess] = useState(true);
  const [characters, setCharacters] = useState([]);

  
  useEffect(() => {
    if (!access && location.pathname !== '/' && location.pathname !== '/register') {
      navigate('/');
    }
  }, [access, location.pathname, navigate]);

  async function login() {
    try {
      const { loginWithRedirect } = useAuth0();
  
      // Llama a la función de Auth0 para iniciar sesión
      await loginWithRedirect();
  
      // No es necesario el código de navegación aquí, ya que Auth0 manejará la redirección
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
   

 const onSearch = async (id) => {
  try {
    const response = await axios(`https://server-rickandmorty.onrender.com/rickandmorty/character/${id}`);
    const { data } = response;

    if (data.id) {
      const characterExists = characters.find((character) => character.id === data.id);
      if (!characterExists) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        window.alert('¡Este personaje ya ha sido añadido!');
      }
    } else {
      window.alert('¡No hay personajes con este ID!');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};

  const onClose = (id, route) => {
    if (route === "home") {
    setCharacters((oldChars) => oldChars.filter((char) => char.id !== id));
    } else if (route === "favorites") {
    dispatch(removeFav(id)); 
    }
  };

  return (
    <div className='App'>
       
      {location.pathname !== '/' && location.pathname !== '/register' && <Nav onSearch={onSearch} logOut= {logOut}/>}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Cards onClose={onClose} characters={characters} />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites onClose={onClose}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Form onLogin={login} />} />
        
      </Routes>
      
    </div>
  );
}

export default App;
