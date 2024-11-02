import React, { useEffect, useState } from 'react';
import logo from '../../assets/WebsiteAssets/Logo.png';
import profileImageDefault from '../../assets/WebsiteAssets/Profile Photo.png';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [users, setUsers] = useState([]);
  const [usersBalance, setUsersBalance] = useState([]);
  const [viewBalance, setViewBalance] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
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

        const userBalanceResponse = await axios.get(
          'https://take-home-test-api.nutech-integrasi.com/balance',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(userProfileResponse.data.data);
        setUsersBalance(userBalanceResponse.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewBalance = () => {
    setViewBalance((prevViewBalance) => !prevViewBalance);
  };

  const imageProfile =
    users.profile_image !==
    'https://minio.nutech-integrasi.com/take-home-test/null'
      ? users.profile_image
      : profileImageDefault;

  return (
    <>
      <header className='w-full border-b-2 px-4 '>
        <nav className='w-full flex h-20 justify-between md:max-w-7xl md:mx-auto '>
          <Link to={'/home'} className='flex items-center gap-x-2'>
            <img src={logo} alt='Logo SIMS PPOB' />
            <h1 className='font-semibold'>SIMS PPOB</h1>
          </Link>

          <div className='flex items-center gap-x-10 font-medium'>
            <NavItem title={'Top Up'} href={'/home/top-up'} />
            <NavItem title={'Transaction'} href={'/home/transaction'} />
            <NavItem title={'Akun'} href={'/home/akun'} />
          </div>
        </nav>
      </header>

      {loading ? null : (
        <section className='w-full px-4  mt-5 flex flex-col gap-y-4 md:flex-row  md:max-w-7xl md:mx-auto'>
          <div className='w-full flex flex-col gap-y-2'>
            <img className='w-20' src={imageProfile} alt='' />
            <div>
              <h3>Selamat datang,</h3>

              <h2 className='text-xl font-bold'>{`${users.first_name} ${users.last_name}`}</h2>
            </div>
          </div>

          <div className=' w-full bg-red-500 text-white rounded-xl p-5 flex flex-col gap-y-2 justify-center'>
            <p className='text-sm'>Saldo anda</p>
            <h3 className='text-xl font-semibold'>
              Rp {viewBalance ? usersBalance.balance : '********'}
            </h3>

            <button
              onClick={handleViewBalance}
              className='text-sm flex items-center gap-x-3 max-w-fit'
            >
              <p>Lihat Saldo</p>
              {viewBalance ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Header;