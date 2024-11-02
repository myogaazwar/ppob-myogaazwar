import React from 'react';
import Button from '../components/Elements/Button/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='h-screen flex items-center justify-center bg-slate-900 '>
      <div className='flex flex-col items-center gap-y-5 text-center'>
        <h1 className='text-white font-semibold text-2xl'>Page Not Found...</h1>
        <h1 className='text-white font-semibold text-2xl'>404</h1>

        <Link to={'/home'} className='w-full'>
          <Button
            classname={
              ' font-semibold bg-white hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300'
            }
          >
            Kembali
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
