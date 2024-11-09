import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const BalanceUser = ({
  imageProfile,
  firstName,
  lastName,
  viewBalance,
  userBalance,
  handleViewBalance,
}) => {
  return (
    <section className='w-full px-4 xl:px-0 mt-5 flex flex-col gap-y-4 md:flex-row  md:max-w-7xl md:mx-auto'>
      <div className='w-full flex flex-col gap-y-2'>
        <img className='w-20' src={imageProfile} alt='' />
        <div>
          <h3>Selamat datang,</h3>

          <h2 className='text-2xl font-bold'>{`${firstName} ${lastName}`}</h2>
        </div>
      </div>

      <div className=' w-full bg-red-500 text-white rounded-xl p-5 flex flex-col gap-y-2 justify-center'>
        <p className='text-sm'>Saldo anda</p>
        <h3 className='text-2xl font-semibold'>
          Rp {viewBalance ? userBalance.toLocaleString('id-ID') : '********'}
        </h3>

        <button
          onClick={handleViewBalance}
          className='text-sm flex items-center gap-x-3 max-w-fit'
        >
          <p>{viewBalance ? 'Tutup Saldo' : 'Lihat Saldo'}</p>
          {viewBalance ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </section>
  );
};

export default BalanceUser;
