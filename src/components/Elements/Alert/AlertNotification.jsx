import React from 'react';
import { Link } from 'react-router-dom';

const AlertNotification = ({ image, value, status, onClick }) => {
  return (
    <section className='h-full md:h-screen w-full absolute flex items-center justify-center bg-opacity-30 bg-slate-500 z-50'>
      <div className='bg-white max-w-full py-5 w-80 flex flex-col items-center text-center gap-y-4 rounded-md '>
        <img src={image} alt={image} className='w-16' />

        <div className='flex flex-col gap-y-1 font-semibold'>
          <p>Top Up sebesar</p>
          <p className='text-2xl font-bold'>{`${value.toLocaleString(
            'id-ID'
          )}`}</p>
          <p>{status}</p>
        </div>

        <Link
          to={'/home'}
          onClick={onClick}
          className='text-red-500 font-semibold hover:font-bold mt-2'
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
};

export default AlertNotification;
