import axios from 'axios';
import { BounceLoader, ClipLoader, MoonLoader, RingLoader } from "react-spinners";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from "./Detail.module.css"

const Detail = () => {    
    const { id } = useParams();

    const [character, setCharacter] = useState({})

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
          ({ data }) => {
            if (data.name) {
              setCharacter(data);
            } else {
              window.alert('No hay personajes con ese ID');
            }
          }
        );
    }, [id]);

    return (
        <div className={styles.container}>
            {character.name ? (
                <>
                    <div className={styles.icontainer}>
                        <img className={styles.image} src={character.image} alt={character.name} />
                    </div>
                    <div className={styles.infoContainer}>
                        <h1 className={styles.words}>{character.name}</h1>
                        <h2 className={styles.words}>STATUS: {character.status}</h2>
                        <h2 className={styles.words}>SPECIE: {character.species}</h2>
                        <h2 className={styles.words}>GENDER: {character.gender}</h2>
                        <h2 className={styles.words}>ORIGIN: {character.origin}</h2>
                    </div>
                </>
            ) : (
                <div className={styles.loadingContainer}>
                   <RingLoader color="#000000" loading={true} size={60} margin={2} />
                    <p className={styles.loadingMessage}>Loading Data...</p>
                    
                </div>
            )}
        </div>
    );
};

export default Detail;