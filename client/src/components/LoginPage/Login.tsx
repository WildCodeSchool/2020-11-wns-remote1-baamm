/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './Login.style.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// function submitForm(e) {
//   e.preventDefault();
//   const url = 'http://localhost:8000/auth/login';
//   axios.post(url, { username, password })
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({
//         type: 'CHANGE_TOKEN',
//         newToken: res.token,
//       });
//       history.push('/trott');
//     })
//     .catch(() => {
//       alert('Vos informations sont incorrectes');
//     });
// }

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({ email, password }) => {
    // eslint-disable-next-line no-console
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/signin`, { email, password });
  };

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

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = ({
    email, password, firstName, lastName,
  }) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
      firstName, lastName, email, password,
    })
      // eslint-disable-next-line no-console
      .then((res) => console.log(res));
  };

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
      <SignIn />
      <SignUp />
    </div>
  );
}
