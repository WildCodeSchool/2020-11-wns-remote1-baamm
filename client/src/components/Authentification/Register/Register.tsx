/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthService from '../../../services/auth.service';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');

  function handleRegister(data: any) {
    const roles = [data.roles];
    AuthService.register(
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      roles,
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
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(handleRegister)}>
          {!status && (
            <div>
              <div className="form-group">
                <input type="text" placeholder="Prénom" {...register('firstname', { maxLength: 80 })} />
                <input type="text" placeholder="Nom" {...register('lastname', { maxLength: 100 })} />
                <input type="email" placeholder="Email@mail.com" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="password" placeholder="Password" {...register('password', { required: true })} />
                <p>Quel est votre status ?</p>
                <div>
                  <label htmlFor="Student">
                    <input id="Student" {...register('roles', { required: true })} type="radio" value="student" checked />
                    Elève
                  </label>
                </div>
                <div>
                  <label htmlFor="Teacher">
                    <input id="Teacher" {...register('roles', { required: true })} type="radio" value="teacher" />
                    Professeur
                  </label>
                </div>
              </div>
              <div>
                <input type="submit" />
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
