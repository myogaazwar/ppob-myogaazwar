import React from 'react';

const SingleTransaction = ({
  transaction_type,
  total_amount,
  description,
  formattedDate,
  formattedTime,
}) => {
  return (
    <section className=''>
      <div className='border p-3 rounded-md'>
        <div className='flex items-center justify-between'>
          <h3 className='text-green-500 font-semibold text-lg'>
            {transaction_type === 'TOPUP' ? '+' : '-'}
            Rp.{total_amount.toLocaleString('id-ID')}
          </h3>
          <h3 className='font-semibold text-xs text-slate-400'>
            {description}
          </h3>
        </div>
        <div className='flex gap-x-2'>
          <p className='text-xs text-slate-400 text-opacity-65'>
            {formattedDate}
          </p>
          <p className='text-xs text-slate-400 text-opacity-65'>
            {formattedTime} WIB{' '}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleTransaction;
