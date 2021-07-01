/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import AuthService from '../services/auth.service';

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
                <input placeholder="Prénom" {...register('firstname')} />
                <input placeholder="Nom" {...register('lastname')} />
                <input placeholder="Email" {...register('email', { required: true })} />
                {errors.email && <span>This field is required</span>}
                <input type="password" placeholder="Password" {...register('password', { required: true })} />
                {errors.password && <span>This field is required</span>}
              </div>
              <div>
                <input type="submit" />
              </div>
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
