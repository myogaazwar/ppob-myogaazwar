import { Link } from 'react-router-dom';
import logo from '../../assets/WebsiteAssets/Logo.png';
import bglogin from '../../assets/WebsiteAssets/Illustrasi Login.png';

import React from 'react';

const AuthLayout = ({ type, title, children }) => {
  return (
    <section className='flex w-full h-screen items-center justify-center'>
      <div className='w-full px-5 mx-auto flex flex-col gap-y-5 justify-center md:p-8 md:rounded-md md:w-[600px] md:px-10'>
        <div className='flex gap-x-2 justify-center'>
          <img src={logo} alt='Logo SIMS PPOB' />
          <h1 className='text-lg font-bold'>SIMS PPOB</h1>
        </div>

        <div className='flex flex-col gap-y-5'>
          <h2 className='text-lg font-bold text-center mx-auto w-60'>
            {title}
          </h2>

          {children}

          <span className='text-center text-sm'>
            {type === 'register'
              ? 'Sudah punya akun? login '
              : 'belum punya akun? registrasi '}
            {type === 'register' && (
              <Link to={'/'} className='text-red-600 font-bold'>
                di sini
              </Link>
            )}
            {type === 'login' && (
              <Link to={'/register'} className='text-red-600 font-bold'>
                di sini
              </Link>
            )}
          </span>
        </div>
      </div>

      <div className='hidden md:block md:h-screen'>
        <img
          src={bglogin}
          alt={`${title} background`}
          className='h-full w-full'
        />
      </div>
    </section>
  );
};

export default AuthLayout;
