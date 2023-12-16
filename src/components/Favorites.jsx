import {useDispatch, useSelector} from "react-redux";
import Card from "./Card";
import styles from "./Favorites.module.css"
import { filterCards, orderCards } from "../Redux/actions";

const Favorites = ({onClose})=> {
    const myFavorites = useSelector((state) => state.myFavorites);
    
    const dispatch = useDispatch();

    const handleOrder = event => {
      dispatch(orderCards(event.target.value));
  }

  const handleFilter = event => {
      dispatch(filterCards(event.target.value));
  }

    return(
       <div>
       <div className={styles.selects}>
                <select 
                    name="order"
                    id="order"
                    onChange={handleOrder}
                >
                    <option value="A">Ascendent</option>
                    <option value="D">Descendent</option>
                </select>
                <select 
                
                    name="filter"
                    id="filter"
                    onChange={handleFilter}
                >
                    <option value="All">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">unknown</option>
                </select>
            </div>
            <div className={styles.div}>
     {
            Array.isArray(myFavorites) && myFavorites.map(favorito => (
                <Card 
                  key ={favorito.id}
                  id={favorito.id}
                  name={favorito.name}
                  status={favorito.status}  
                  species={favorito.species}
                  gender={favorito.gender}
                  origin={favorito.origin}
                  image={favorito.image}
                  onClose={(id) => onClose(id, "favorites")}
                />
              ))
            }
           </div>

     </div>
    )
}

export default Favorites;








