import {useState} from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({onSearch}) => {
   const [id, setId] = useState("");

const [randomNumber, setRandomNumber] = useState(null);

const generateRandomNumber = () => {
   const min = 1
   const max = 826
   const randomNum = Math.floor(Math.random() * 100) + 1;
   setRandomNumber(onSearch(randomNum));}
   
   const handleChange = (e) => {
      setId(e.target.value);
   };
   return (
      <div className={styles.searchBar}>
          <input className={styles.searchInput} onChange={handleChange} type='search' value={id} />
         <button className={styles.barButton} onClick={()=> onSearch(id)}>Agregar</button> 
         <button className={styles.barButton} onClick={generateRandomNumber}>Random</button> 
      </div>
   );
}

export default SearchBar;