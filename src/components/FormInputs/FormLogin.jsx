import React, { useState } from 'react';
import InputForm from '../Elements/Input/Index';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';
import Button from '../Elements/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormLogin = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleViewPassword = () => {
    setViewPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Parameter email tidak sesuai format');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/login',
        loginData
      );
      setSuccess(response.data.message);
      setError('');
      localStorage.setItem('token', response.data.data.token);

      navigate('/home');
    } catch (error) {
      setError(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className='text-red-600'>{error}</p>}
      {success && <p className='text-green-600'>{success}</p>}

      <InputForm
        name={'email'}
        id={'email'}
        type={'email'}
        placeholder={'masukan email anda'}
        icon={<MdOutlineAlternateEmail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputForm
        name={'password'}
        id={'password'}
        type={viewPassword ? 'text' : 'password'}
        placeholder={'masukkan password'}
        icon={<CiLock />}
        iconEye={
          viewPassword ? (
            <FaEyeSlash onClick={handleViewPassword} />
          ) : (
            <FaEye onClick={handleViewPassword} />
          )
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button classname={'mt-10 bg-red-600 text-white'} type='submit'>
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
