/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import './Login.style.css';
import OwlLogin from '../../../pictures/owlLogin.png';

import AuthService from '../../../services/auth.service';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const history = useHistory();
  const [message, setMessage] = useState('');

  function handleLogin(data: any) {
    setMessage('');

    AuthService.login(data.email, data.password).then(
      () => {
        history.push('/profile');
        window.location.reload();
      },
      (error) => {
        const resMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();

        setMessage(resMessage);
      },
    );
  }

  return (
    <div className="loginContainer">
      <div className="login_mainContainer">
        <img
          src={OwlLogin}
          alt="profile-img"
          className="loginLogo"
        />

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="formContainer">
            <div className="form-group">
              <input placeholder="Email" {...register('email', { required: true })} />
              <input type="password" placeholder="Password" {...register('password', { required: true })} />
              <input type="submit" className="input_loginButton" />
            </div>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          {errors && (
            <div className="form-group">
              <div className="alert-danger" role="alert">
                {errors.email && <span className="alert">L&apos;adresse email est requise</span>}
                {errors.password && <span className="alert">Le mot de passe est requis</span>}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
