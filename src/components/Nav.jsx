import {Link} from "react-router-dom";
import SearchBar from './SearchBar.jsx';
import styles from "./Nav.module.css";
import LogoutButton from "../components/loginButton";

const Nav = ({onSearch, logOut})=> {
    return(
     <div className={styles.navContent}>

 <Link  to= "/home">
 <button className={styles.navButton}>Home</button>
 </Link>

 <Link  to= "/favorites">
 <button className={styles.navButton}>Favorites</button>
 </Link>

 <SearchBar onSearch={onSearch}/>
 <Link  to= "/about">
 <button className={styles.navButton}>About</button>
 </Link>
<button className={styles.logoutButton} onClick={logOut}>Log Out</button>
<button><LogoutButton /></button>


     </div>
    )
}

export default Nav;