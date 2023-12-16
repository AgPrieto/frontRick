import {ADD_FAV, REMOVE_FAV, FILTER, ORDER, CREATE_USER_FAILURE, CREATE_USER_SUCCESS} from "./action-types";
import axios from 'axios';

export const addFav = (character) =>  {
  
  try {
    
    return async (dispatch) => {
    console.log(character);
    const endpoint = 'https://server-rickandmorty.onrender.com/rickandmorty/fav';
    const response = await axios.post(endpoint, character);
    
    const { data } = response;
    console.log(data);
 

    return dispatch({
      type: ADD_FAV,
      payload: data,
    });}
     
   } catch (error) {
     console.error('Error adding favorite:', error);
     
   }
 };

 export const removeFav = (id) => async (dispatch) => {
   try {
     const endpoint = `https://server-rickandmorty.onrender.com/rickandmorty/fav/${id}`;
     const response = await axios.delete(endpoint);
     const { data } = response;
 
     dispatch({
       type: REMOVE_FAV,
       payload: data,
     });
   } catch (error) {
     console.error('Error removing favorite:', error);
    
   }
 };

export const filterCards = (gender) => {
    return { type: FILTER, payload: gender };
}


export const orderCards = (order) => {
    return {
        type: ORDER,
        payload: order
    }
};

export const checkEmail = async (email) => {
  try {
    const response = await axios.get(`https://server-rickandmorty.onrender.com/rickandmorty/register?email=${email}`);
    const exists = response.data;  

    if (exists) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking email:', error);
    
    return false;
  }
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`https://server-rickandmorty.onrender.com/rickandmorty/login`, user);
      const newUser = response.data;

      if (newUser) {
        dispatch({ type: CREATE_USER_SUCCESS, payload: newUser });
        return newUser;
      } else {
        dispatch({ type: CREATE_USER_FAILURE, payload: 'User creation failed' });
        return null;
      }
    } catch (error) {
      console.error('Error creating user:', error);
      dispatch({ type: CREATE_USER_FAILURE, payload: 'Error creating user' });
      return null;
    }
  };
};




