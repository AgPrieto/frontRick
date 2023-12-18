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
            setErrors({ ...errors, password: "Invalid password. Must be between 6 and 10 characters and contain at least one number" });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        
        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (errors.email === "" && errors.password === "") {
            const loginSuccessful = await props.onLogin(userData);
    
            if (!loginSuccessful) {
                setErrors({ ...errors, login: "Acceso denegado. Correo electrónico o contraseña incorrectos." });
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                <label className={styles.labels}>Email: </label>
                <input type="text" value={userData.email} onChange={handleChange} onBlur={validateEmail} name="email" />
                {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
                <br />
                <label className={styles.labels}>Password: </label>
                <input type="password" value={userData.password} onChange={handleChange} name="password" />
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