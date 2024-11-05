import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

import iconSuccess from '../../assets/WebsiteAssets/checklist.png';
import iconError from '../../assets/WebsiteAssets/cancel.png';
import walletImg from '../../assets/WebsiteAssets/Logo.png';

import AlertNotification from '../Elements/Alert/AlertNotification';
import { AlertModal } from '../Elements/Alert/AlertModal';

export const UserBalanceContext = createContext();

const HomeLayout = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [alertModalTopUp, setAlertModalTopUp] = useState(false);
  const [loadingTopUpBalance, setLoadingTopUpBalance] = useState(false);
  const [valueTopUp, setValueTopUp] = useState('');
  const [alertErrorTopUp, setAlertErrorTopUp] = useState(false);
  const [alertSuccessTopUp, setAlertSuccessTopUp] = useState(false);

  const fetchUserBalance = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(
        'https://take-home-test-api.nutech-integrasi.com/balance',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserBalance(response.data.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmationTopUp = async () => {
    setAlertModalTopUp(false);
    setLoadingTopUpBalance(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/topup', //ini rapihin yog
        { top_up_amount: valueTopUp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeout(() => {
        setLoadingTopUpBalance(false);
        setTimeout(() => {
          setUserBalance(
            (prevBalance) => prevBalance + parseInt(valueTopUp, 10)
          );
          setAlertSuccessTopUp(true);
        }, 0);
      }, 2000);

      return response;
    } catch (error) {
      setTimeout(() => {
        setLoadingTopUpBalance(false);
        setTimeout(() => {
          setAlertErrorTopUp(true);
        }, 0);
      }, 3000);

      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const handleCloseAlertModal = () => {
    setAlertModalTopUp(false);
    setValueTopUp('');
  };

  const handleCloseAlert = () => {
    setAlertErrorTopUp(false);
    setAlertSuccessTopUp(false);
    setValueTopUp('');
  };

  return (
    <UserBalanceContext.Provider
      value={{
        userBalance,
        setUserBalance,
        setAlertModalTopUp,
        loadingTopUpBalance,
        setLoadingTopUpBalance,
        valueTopUp,
        setValueTopUp,
        setAlertErrorTopUp,
      }}
    >
      <main className='relative'>
        {loadingTopUpBalance && (
          <section className='h-full md:h-screen w-full absolute flex items-center justify-center bg-opacity-40 bg-slate-600 z-50'>
            <div className='custom-loader'></div>
          </section>
        )}

        {alertSuccessTopUp && (
          <AlertNotification
            status={'berhasil!'}
            image={iconSuccess}
            value={valueTopUp}
            onClick={handleCloseAlert}
          />
        )}

        {alertModalTopUp && (
          <AlertModal
            image={walletImg}
            value={valueTopUp}
            onContinue={handleConfirmationTopUp}
            onCancel={handleCloseAlertModal}
          />
        )}

        {alertErrorTopUp && (
          <AlertNotification
            status={'gagal'}
            image={iconError}
            value={valueTopUp}
            onClick={handleCloseAlert}
          />
        )}

        <Header />
        <section className='px-4 pb-5 xl:px-0 md:max-w-7xl md:mx-auto'>
          <Outlet />
        </section>
      </main>
    </UserBalanceContext.Provider>
  );
};

export default HomeLayout;
