import styles from "./About.module.css"



const about = ()=>{
   return (
  
    <div className={styles.container}>
      <div className={styles.container1}>
 <h1 className={styles.title}>Sobre Mi!</h1>
 <img className= {styles.image} src="https://media.licdn.com/dms/image/D4D03AQGygetwIoiimw/profile-displayphoto-shrink_800_800/0/1695763565896?e=1703116800&v=beta&t=0QSxCbIVibltowEutYegdFJtG8AVdiTiA40LQapELIk" alt="SobreMi" />
    </div>
    <div className={styles.container2}>
 <p className={styles.description}>Hola, mi nombre es Agustin Prieto, tengo 24 años y soy oriundo de la ciudad de Cordoba Argentina. Actualmente soy estudiante de Henry y aspiro a ser un desarrollador full stack y este es mi primer proyecto integrador.</p>
 <h2 className={styles.title}>Contactame!</h2>
 <div className={styles.imageContainer}>
 <a href="https://github.com/AgPrieto" target="_blank" rel="noopener noreferrer" >
      <img className={styles.image1} src="https://e7.pngegg.com/pngimages/1009/39/png-clipart-github-computer-icons-repository-github-white-cat-like-mammal.png" alt="git" />
    </a>
    <a href="https://www.linkedin.com/in/agust%C3%ADn-prieto-259784292/" target="_blank" rel="noopener noreferrer" >
 <img className= {styles.image1} src="https://cdn-icons-png.flaticon.com/512/38/38669.png" alt="git" />
 </a>
 </div>
    </div>

    </div>
    
  

    
   )
}


export default about;