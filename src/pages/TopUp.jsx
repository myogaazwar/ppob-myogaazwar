import React, { useEffect, useState } from 'react';
import Input from '../components/Elements/Input/Input';
import Button from '../components/Elements/Button/Button';
import InputForm from '../components/Elements/Input/Index';

import { IoWalletOutline } from 'react-icons/io5';

const TopUp = () => {
  const [valueTopUp, setValueTopUp] = useState('');

  const TopUpNumbers = [10000, 20000, 50000, 100000, 250000, 500000];

  const handleValueTopup = (e) => {
    setValueTopUp(e.target.value);
  };

  return (
    <main className='mt-14 flex flex-col gap-y-2'>
      <div>
        <p>Silahkan masukan</p>
        <h1 className='font-semibold text-xl'>Nominal Top Up</h1>
      </div>

      <section className='xl:flex gap-x-5'>
        <div className='w-full flex flex-col gap-y-5'>
          <InputForm
            id={'valueTopUp'}
            name={'valueTopUp'}
            type={'number'}
            min={10000}
            max={100000}
            value={valueTopUp}
            icon={<IoWalletOutline />}
          />
          <Button
            classname={` ${
              valueTopUp ? 'bg-red-500' : 'bg-stone-300'
            }  text-white font-semibold`}
            disabled={!valueTopUp}
          >
            Top Up
          </Button>
        </div>

        <div className='w-full grid grid-cols-2 gap-y-5 gap-x-5 items-center mt-10  md:mt-5  md:grid-cols-3'>
          {TopUpNumbers.map((value) => (
            <Button
              onClick={handleValueTopup}
              value={value}
              classname={'border w-full '}
            >
              {`Rp${value.toLocaleString('id-ID')}`}
            </Button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TopUp;
