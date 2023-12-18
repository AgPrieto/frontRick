import React, { useState } from "react";
import styles from "./Form.module.css"
import {Link} from "react-router-dom";


const Form = (props) => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    

    const validateEmail = () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email) && userData.email.length !== 0 && userData.email.length < 35) {
            setErrors({ ...errors, email: "" });
        } else {
            setErrors({ ...errors, email: "The email is not valid or is auto-completed. " });
        }
    };

    const validatePassword = () => {
        if (userData.password.length >= 6 && userData.password.length <= 10 && /\d/.test(userData.password)) {
            setErrors({ ...errors, password: "" });
        } else {
            setErrors({ ...errors, password: "Contraseña no válida. Debe tener entre 6 y 10 caracteres y contener al menos un número." });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        
        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        
        if (errors.email === "" && errors.password === "") {
          props.onLogin(userData);
        } else {
          
          setErrors({
            email: "Email incorrecto",
            password: "Contraseña incorrecta",
          });
        }
      };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                <label className={styles.labels}>Email: </label>
                <input type="text" value={userData.email} onChange={handleChange} onBlur={validateEmail} name="email" className={`${styles.input} ${errors.email && styles.errorInput}`} />
                {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
                <br />
                <label className={styles.labels}>Password: </label>
                <input type="password" value={userData.password} onChange={handleChange} name="password" className={`${styles.input} ${errors.password && styles.errorInput}`} />
                {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
               
                <button className={styles.buttonLogin} type="submit">Submit</button>
                <Link to="/register">    
                <p>You still don't have an account? Sign up</p>
                </Link>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Form;