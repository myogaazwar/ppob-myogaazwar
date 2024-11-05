import React from 'react';
import { Link } from 'react-router-dom';

export const AlertModal = ({ image, value, onContinue, onCancel }) => {
  return (
    <section className='h-full md:h-screen w-full absolute flex items-center justify-center bg-opacity-30 bg-slate-500 z-50'>
      <div className='bg-white max-w-full py-8 w-80 flex flex-col items-center text-center gap-y-4 rounded-md '>
        <img src={image} alt={image} className='w-16' />

        <div className='flex flex-col gap-y-1 font-semibold'>
          <p>Anda yakin untuk Top Up sebesar</p>
          <p className='text-2xl font-bold'>{value}</p>
        </div>

        <button
          onClick={onContinue}
          className='text-red-500 font-semibold hover:font-bold mt-2'
        >
          Ya. lanjutkan Top Up{' '}
        </button>

        <button
          onClick={onCancel}
          className='text-slate-500 opacity-65 font-semibold hover:font-bold mt-2'
        >
          Batalkan
        </button>
      </div>
    </section>
  );
};
