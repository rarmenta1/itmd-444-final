// pages/index.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleRegister = async () => {
    if (!email || !password) {
      setErrorMessage('Email and password cannot be empty');
      return;
    }

    try {
      await axios.post('/api/auth/register', { email, password });
      router.push('/home'); // Redirect to home after successful registration
    } catch (error) {
      console.error('Error registering:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleRegister}>Register</button>
      <button onClick={goToLogin}>Go to Login</button>
    </div>
  );
};

export default Register;
