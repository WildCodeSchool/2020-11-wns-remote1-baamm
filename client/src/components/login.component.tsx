/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import AuthService from '../services/auth.service';

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
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <div className="form-group">
              <input placeholder="Email" {...register('email', { required: true })} />
              {errors.email && <span>This field is required</span>}

              <input type="password" placeholder="Password" {...register('password', { required: true })} />
              {errors.password && <span>This field is required</span>}
            </div>
            <div>
              <input type="submit" />
            </div>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
