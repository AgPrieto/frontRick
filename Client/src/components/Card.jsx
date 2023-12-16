import React, { useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { addFav, removeFav } from "../Redux/actions.js";
import styles from "./Card.module.css"
const Card = ({name,status,species,gender,origin,image,onClose,id})=>{
  
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (Array.isArray(myFavorites)) {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
    }
 }, [myFavorites, id]);
  
 const handleFavorite = () => {
  if (isFav) {
    setIsFav(false);
    dispatch(removeFav(id));
  } else {
    setIsFav(true);
    dispatch(addFav({name,status,species,gender,origin,image,onClose,id}));
  }
};

const handleButtonClick = () => {
   onClose(id);
 };

 return (
   <div className={styles.card}>
    
       
     {
isFav ? (
   <button className={styles.button} onClick={handleFavorite}>❤️</button>
) : (
   <button className={styles.button} onClick={handleFavorite}>🤍</button>
)
}
     <button className={styles.button} onClick={handleButtonClick}>X</button>
     <Link to={`/detail/${id}`} >
     <div>
       <img  className= {styles.imageCard} src={image} alt={name} />
     </div>
     </Link>
    
       <h1 className={styles.cardTitle}>{name}</h1>
       <h2>{status}</h2>
       <h2>{species}</h2>
       <h2>{gender}</h2>
       <h2>{origin}</h2>
     
    
     
     
   </div>
 );
};

export default Card;


  





