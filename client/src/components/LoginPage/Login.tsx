/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './Login.style.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

function ConnexionBlock() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="menuContainer">
      <div className="titleContainer">
        <h1>Connexion</h1>
      </div>
      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputBlock">
          <div className="hello">
            <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
            <input type="email" className="fieldInput" placeholder="Email" {...register('email', { required: true })} />
          </div>
          {errors.email && <span>Ce champ est obligatoire !</span>}
        </div>
        <div className="inputBlock">
          <div className="hello">
            <FontAwesomeIcon icon={faKey} className="inputIcon" />
            <input type="password" className="fieldInput" placeholder="Password" {...register('password', { required: true })} />
          </div>
          {errors.password && <span>Ce champ est obligatoire !</span>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

function RegisterBlock() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <div className="menuContainer">
      <div className="titleContainer">
        <h1>Inscription</h1>
      </div>
      <form className="formContainer" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputBlock">
          <div className="hello">
            <FontAwesomeIcon icon={faUser} className="inputIcon" />
            <input type="text" className="fieldInput" placeholder="Last Name" {...register('lastName', { required: true })} />
          </div>
          {errors.lastName && <span>Ce champ est obligatoire !</span>}
        </div>
        <div className="inputBlock">
          <div className="hello">
            <FontAwesomeIcon icon={faUser} className="inputIcon" />
            <input type="text" className="fieldInput" placeholder="First Name" {...register('firstName', { required: true })} />
          </div>
          {errors.firstName && <span>Ce champ est obligatoire !</span>}
        </div>
        <div className="inputBlock">
          <div className="hello">
            <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
            <input type="email" className="fieldInput" placeholder="Email" {...register('email', { required: true })} />
          </div>
          {errors.email && <span>Ce champ est obligatoire !</span>}
        </div>
        <div className="inputBlock">
          <div className="hello">
            <FontAwesomeIcon icon={faKey} className="inputIcon" />
            <input type="password" className="fieldInput" placeholder="Password" {...register('password', { required: true, minLength: 6 })} />
          </div>
          {errors.password && errors.password.type === 'required' && <span>Ce champ est obligatoire !</span>}
          {errors.password && errors.password.type === 'minLength' && <span>6 caractères minimum requis !</span>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
export default function LoginPage() {
  return (
    <div className="pageContainer">
      <ConnexionBlock />
      <RegisterBlock />
    </div>
  );
}
