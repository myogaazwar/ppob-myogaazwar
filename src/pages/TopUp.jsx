import React, { useEffect, useState } from 'react';
import Button from '../components/Elements/Button/Button';
import InputForm from '../components/Elements/Input/Index';

import { IoWalletOutline } from 'react-icons/io5';
import axios from 'axios';

const TopUp = () => {
  const [valueTopUp, setValueTopUp] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessageMinimum, setErroMessageMinimum] = useState(false);

  const TopUpNumbers = [10000, 20000, 50000, 100000, 250000, 500000];
  const token = localStorage.getItem('token');

  const handleValueTopup = (e) => {
    setValueTopUp(e.target.value);
  };

  const handleTopUp = async (e) => {
    e.preventDefault();

    try {
      if (valueTopUp < 10000) {
        setErroMessageMinimum(true);

        setTimeout(() => {
          setErroMessageMinimum(false);
        }, 3000);

        return;
      }

      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/topup',
        { top_up_amount: valueTopUp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      setSuccessMessage(true);

      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
      location.reload();
    }
  };

  return (
    <main className='mt-14 flex flex-col gap-y-2'>
      <div>
        <p>Silahkan masukan</p>
        <h1 className='font-semibold text-xl'>Nominal Top Up</h1>
      </div>

      <section className='xl:flex gap-x-5'>
        <div className='w-full flex flex-col gap-y-5'>
          {errorMessageMinimum && (
            <p className='text-red-600 italic font-semibold text-right'>
              Nominal Rp10.000
            </p>
          )}

          {successMessage && <p>Berhasil Top Up Sebesar {valueTopUp}</p>}
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
            onClick={handleTopUp}
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
