import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import {useDispatch} from "react-redux";
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

function App() {

  const dispatch = useDispatch();

const logOut = ()=> {
  setAccess(false);
  navigate('/');
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

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = `https://server-rickandmorty.onrender.com/rickandmorty/login/?email=${email}&password=${password}`;
      const response = await axios.get(URL);
      const { data } = response;
  
      const { access } = data;
      setAccess(access);
      if (access) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
   

 const onSearch = async (id) => {
  try {
    const response = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
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
        <Route path="/" element={<Form onLogin={login} />} />
        
      </Routes>
      
    </div>
  );
}

export default App;
