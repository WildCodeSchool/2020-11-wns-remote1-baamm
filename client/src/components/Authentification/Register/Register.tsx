/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Register.style.css';
import OwlLogin from '../../../pictures/owlLogin.png';

import AuthService from '../../../services/auth.service';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');

  function handleRegister(data: any) {
    AuthService.register(
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.role,
    ).then(
      (response) => {
        setMessage(response.data.message);
        setStatus(true);
      },
      (error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();

        setStatus(false);
        setMessage(resMessage);
      },
    );
  }

  return (
    <div className="registerContainer">
      <div className="register_mainContainer">
        <img
          src={OwlLogin}
          alt="profile-img"
          className="loginLogo"
        />

        <form onSubmit={handleSubmit(handleRegister)}>
          {!status && (
            <div className="formContainer">
              <div className="form-group">
                <input type="text" placeholder="Prénom" {...register('firstname', { maxLength: 80 })} />
                <input type="text" placeholder="Nom" {...register('lastname', { maxLength: 100 })} />
                <input type="email" placeholder="Email@mail.com" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" placeholder="Password" {...register('password', { required: true })} />
                <p>Quel est votre status ?</p>
                <div className="multipleChoice">
                  <label htmlFor="Student" className="choice">
                    <input id="Student" {...register('role', { required: true })} type="radio" value="STUDENT" checked />
                    Elève
                  </label>

                  <label htmlFor="Teacher" className="choice">
                    <input id="Teacher" {...register('role', { required: true })} type="radio" value="TEACHER" />
                    Professeur
                  </label>
                </div>
                <input type="submit" className="input_registerButton" />
              </div>
            </div>
          )}

          {errors && (
            <div className="form-group">
              <div>{errors.email && <span>Une adresse email est requise</span>}</div>
              <div>{errors.password && <span>Un mot de passe est requis</span>}</div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  status
                    ? 'alert alert-success'
                    : 'alert alert-danger'
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
