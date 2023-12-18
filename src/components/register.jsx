import React, { useState, useEffect } from 'react';
import styles from "./register.module.css";
import { createUser } from '../Redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { checkEmail } from '../Redux/actions';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [emailConfirmErrors, setEmailConfirmErrors] = useState([]);
  const [passwordConfirmErrors, setPasswordConfirmErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  useEffect(() => {
    validateEmailConfirm(confirmEmail);
  }, [confirmEmail]);

  useEffect(() => {
    validatePasswordConfirm(confirmPassword);
  }, [confirmPassword]);

  const validateEmail = async (value) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!value) {
      errors.push("The Email is required");
    } else if (!emailRegex.test(value)) {
      errors.push("Please enter a valid email");
    } else {
      const emailExists = await checkEmail(value);
      if (emailExists) {
        errors.push("This email is already in use");
      }
    }
  
    setEmailErrors(errors);
  };

  const validatePassword = (value) => {
    const errors = [];
    
    if (!value) {
      errors.push("The Password is required");
    } else if (value.length < 6) {
        errors.push("The Password  must have at least 6 characters");
    } else if (value.length > 20) {
        errors.push("The Password cannot exceed 20 characters");
      }
    
    setPasswordErrors(errors);
  };

  const validateEmailConfirm = (value) => {
    const errors = [];
    if (!value) {
      errors.push("Confirm your email");
    } else if (value !== email) {
      errors.push("The emails do not match.");
    }
    setEmailConfirmErrors(errors);
  };

  const validatePasswordConfirm = (value) => {
    const errors = [];
    if (!value) {
      errors.push("Confirm your password");
    } else if (value !== password) {
      errors.push("The passwords do not match.");
    }
    setPasswordConfirmErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    if (
      emailErrors.length === 0 &&
      passwordErrors.length === 0 &&
      emailConfirmErrors.length === 0 &&
      passwordConfirmErrors.length === 0
    ) {
      
      dispatch(
        createUser({
          email,
          password,
        })
      )
      .catch(error => {
        console.error('Error al crear usuario:', error);
      });
  
     
     
        
        setSuccessMessage('User Created');
        resetForm();
        navigate('/');
     
    }
  };
  
  

 const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmEmail('');
    setConfirmPassword('');
    setEmailErrors([]);
    setPasswordErrors([]);
    setEmailConfirmErrors([]);
    setPasswordConfirmErrors([]);
    setSuccessMessage('');
  };

 
  return (
    <div className={styles.all}>
      <Link to= "/">
      <button className={styles.backButton}>LOGIN</button>
      </Link>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.h1}>Create your account!</h1>
          <div className={styles.inputGroup}>
            <label className={styles.labels}>
              Email:
              <input type="email" value={email} onChange={(e) => {setEmail(e.target.value); validateEmail(e.target.value); }}  />
              <p className={styles.errorMessage}>{emailErrors.join(', ')}</p>
            </label>
            <br />

            <label className={styles.labels}>
              Confirm Email:
              <input type="email" value={confirmEmail} onChange={(e) => {setConfirmEmail(e.target.value); validateEmailConfirm(e.target.value);}}  />
              <p className={styles.errorMessage}>{emailConfirmErrors.join(', ')}</p>
            </label>
            <br />

            <label className={styles.labels}>
              Password:
              <input type="password" value={password} onChange={(e) => {setPassword(e.target.value); validatePassword(e.target.value); }}  />
              <p className={styles.errorMessage}>{passwordErrors.join(', ')}</p>
            </label>
            <br />

            <label className={styles.labels}>
              Confirm Password:
              <input type="password" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); validatePasswordConfirm(e.target.value);}}  />
              <p className={styles.errorMessage}>{passwordConfirmErrors.join(', ')}</p>
            </label>
            <br />

            <button className={styles.buttonSignUp} type="submit">Sign Up</button>
            {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
