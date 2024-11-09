import React, { createContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';

import iconSuccess from '../../assets/WebsiteAssets/checklist.png';
import iconError from '../../assets/WebsiteAssets/cancel.png';
import walletImg from '../../assets/WebsiteAssets/Logo.png';
import profileImageDefault from '../../assets/WebsiteAssets/Profile Photo.png';

import AlertNotification from '../Elements/Alert/AlertNotification';
import { AlertModal } from '../Elements/Alert/AlertModal';
import BalanceUser from '../BalanceUser/BalanceUser';

export const UserBalanceContext = createContext();

const HomeLayout = () => {
  const [users, setUsers] = useState([]);
  const [viewBalance, setViewBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0);
  const [alertModalTopUp, setAlertModalTopUp] = useState(false);
  const [loadingTopUpBalance, setLoadingTopUpBalance] = useState(false);
  const [valueTopUp, setValueTopUp] = useState('');
  const [alertErrorTopUp, setAlertErrorTopUp] = useState(false);
  const [alertSuccessTopUp, setAlertSuccessTopUp] = useState(false);

  const token = localStorage.getItem('token');
  const location = useLocation();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const userProfileResponse = await axios.get(
        'https://take-home-test-api.nutech-integrasi.com/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(userProfileResponse.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchUserBalance = async () => {
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

  useEffect(() => {
    fetchUser();
    fetchUserBalance();
  }, []);
  const handleConfirmationTopUp = async () => {
    setAlertModalTopUp(false);
    setLoadingTopUpBalance(true);

    try {
      const response = await axios.post(
        'https://take-home-test-api.nutech-integrasi.com/topup',
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

  const handleViewBalance = () => {
    setViewBalance((prevViewBalance) => !prevViewBalance);
  };

  const handleCloseAlertModal = () => {
    setAlertModalTopUp(false);
    setValueTopUp('');
  };

  const handleCloseAlert = () => {
    setAlertErrorTopUp(false);
    setAlertSuccessTopUp(false);
    setValueTopUp('');
  };

  const imageProfile =
    users.profile_image !==
    'https://minio.nutech-integrasi.com/take-home-test/null'
      ? users.profile_image
      : profileImageDefault;

  return (
    <UserBalanceContext.Provider
      value={{
        users,
        setUsers,
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
            value={`Rp${parseInt(valueTopUp, 10).toLocaleString('id-ID')}`}
            onClick={handleCloseAlert}
          />
        )}

        {alertModalTopUp && (
          <AlertModal
            image={walletImg}
            value={`Rp${parseInt(valueTopUp, 10).toLocaleString('id-ID')}`}
            onContinue={handleConfirmationTopUp}
            onCancel={handleCloseAlertModal}
          />
        )}

        {alertErrorTopUp && (
          <AlertNotification
            status={'gagal'}
            image={iconError}
            value={`Rp${parseInt(valueTopUp, 10).toLocaleString('id-ID')}`}
            onClick={handleCloseAlert}
          />
        )}

        <Header />
        {location.pathname !== '/home/account' && !loading && (
          <BalanceUser
            imageProfile={imageProfile}
            firstName={users.first_name}
            lastName={users.last_name}
            viewBalance={viewBalance}
            userBalance={userBalance}
            handleViewBalance={handleViewBalance}
          />
        )}
        <section className='px-4 pb-5 xl:px-0 md:max-w-7xl md:mx-auto'>
          <Outlet />
        </section>
      </main>
    </UserBalanceContext.Provider>
  );
};

export default HomeLayout;
