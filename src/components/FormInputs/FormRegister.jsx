import React, { useState } from 'react';
import InputForm from '../Elements/Input/Index';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';
import Button from '../Elements/Button/Button';
import axios from 'axios';

const FormRegister = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleViewPassword = () => {
    setViewPassword((prev) => !prev);
  };

  const handleViewConfirmPassword = () => {
    setViewConfirmPassword((prev) => !prev);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Prepare user data
    const userData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    };

    try {
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/registration',
        userData
      );
      setSuccess(response.data.message);
      setError('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
        name={'firstName'}
        id={'firstName'}
        type={'text'}
        placeholder={'nama depan'}
        icon={<IoPersonOutline />}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <InputForm
        name={'lastName'}
        id={'lastName'}
        type={'text'}
        placeholder={'nama belakang'}
        icon={<IoPersonOutline />}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <InputForm
        name={'password'}
        id={'password'}
        type={viewPassword ? 'text' : 'password'}
        placeholder={'buat password'}
        icon={<IoPersonOutline />}
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

      <InputForm
        name={'confirmPassword'}
        id={'confirmPassword'}
        type={viewConfirmPassword ? 'text' : 'password'}
        placeholder={'konfirmasi password'}
        icon={<CiLock />}
        iconEye={
          viewConfirmPassword ? (
            <FaEyeSlash onClick={handleViewConfirmPassword} />
          ) : (
            <FaEye onClick={handleViewConfirmPassword} />
          )
        }
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button classname={'mt-10 bg-red-600 text-white'} type='submit'>
        Register
      </Button>
    </form>
  );
};

export default FormRegister;
