import React from 'react';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormLogin from '../components/FormInputs/FormLogin';

const Login = () => {
  return (
    <AuthLayout type={'login'} title={'Masuk atau buat akun untuk memulai'}>
      <FormLogin />
    </AuthLayout>
  );
};

export default Login;
