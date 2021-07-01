import React, { useState } from 'react';
import './Login.style.css';

async function loginUser(credentials :any) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data);
}

interface Props {
  setToken: any;
}

export default function Login({ setToken }: Props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (event :any) => {
    event.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <p>Email</p>
          <input type="text" onChange={(e :any) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" onChange={(e :any) => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
