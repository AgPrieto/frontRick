import styles from "./Cards.module.css"
import Card from './Card';



const Cards = ({characters, onClose})=> {   

   

   return (
      <div className={styles.div}>
         {
            characters.map(character => (
               <Card 
                  key ={character.id}
                  id={character.id}
                  name={character.name}
                  status={character.status}
                  species={character.species}
                  gender={character.gender}
                  origin={character.origin}
                  image={character.image}
                  onClose={(id) => onClose(id, "home")}
                 
               />
            ))
         }

         
      </div>
   )
}





export default Cards;