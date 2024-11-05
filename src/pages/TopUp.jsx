import React, { useContext, useState } from 'react';
import Button from '../components/Elements/Button/Button';
import InputForm from '../components/Elements/Input/Index';

import { IoWalletOutline } from 'react-icons/io5';
import { UserBalanceContext } from '../components/Layouts/HomeLayout';

const TopUp = () => {
  const {
    setAlertModalTopUp,
    setLoadingTopUpBalance,
    valueTopUp,
    setValueTopUp,
  } = useContext(UserBalanceContext);

  const [errorMessagetopUp, setErrorMessageTopUp] = useState(false);

  const TopUpNumbers = [10000, 20000, 50000, 100000, 250000, 500000];
  const maximumTopUp = valueTopUp > 1000000;
  const minimumTopUp = valueTopUp < 10000;

  const handleValueTopup = (e) => {
    setValueTopUp(e.target.value);
  };

  const handleButtonTopUp = async (e) => {
    e.preventDefault();

    if (maximumTopUp || minimumTopUp) {
      setErrorMessageTopUp(true);

      setTimeout(() => {
        setErrorMessageTopUp(false);
      }, 3000);

      setLoadingTopUpBalance(false);
      return;
    }

    setAlertModalTopUp(true);
  };

  return (
    <main className='mt-14 flex flex-col gap-y-2'>
      <div>
        <p>Silahkan masukan</p>
        <h1 className='font-semibold text-xl'>Nominal Top Up</h1>
      </div>
      {errorMessagetopUp && (
        <p className='text-red-600 italic font-semibold text-right my-5'>
          {maximumTopUp && 'Maximum Top Up Rp 1.000.000'}
          {minimumTopUp && 'Minimum Top Up Rp 10.000'}
        </p>
      )}
      <section className='xl:flex gap-x-5'>
        <div className='w-full flex flex-col gap-y-5'>
          <InputForm
            id={'valueTopUp'}
            name={'valueTopUp'}
            type={'number'}
            min={10000}
            max={1000000}
            value={valueTopUp}
            icon={<IoWalletOutline />}
            onChange={handleValueTopup}
          />
          <Button
            onClick={handleButtonTopUp}
            classname={` ${
              valueTopUp ? 'bg-red-500' : 'bg-stone-300'
            }  text-white font-semibold`}
            disabled={!valueTopUp}
          >
            Top Up
          </Button>
        </div>

        <div className='w-full grid grid-cols-2 gap-y-5 gap-x-5 items-center mt-10  md:mt-5  md:grid-cols-3'>
          {TopUpNumbers.map((value, index) => (
            <Button
              key={index}
              onClick={handleValueTopup}
              value={value}
              classname={
                'border w-full hover:border-4 transition-all duration-200 '
              }
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
