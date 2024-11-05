import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../assets/WebsiteAssets/Logo.png';
import profileImageDefault from '../../assets/WebsiteAssets/Profile Photo.png';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

import NavItem from './NavItem';
import { UserBalanceContext } from '../Layouts/HomeLayout';

const Header = () => {
  const { userBalance } = useContext(UserBalanceContext);

  const [users, setUsers] = useState([]);
  const [viewBalance, setViewBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openNavItem, setOpenNavItem] = useState(false);

  const handleViewBalance = () => {
    setViewBalance((prevViewBalance) => !prevViewBalance);
  };

  const handleOpenNavitem = () => {
    setOpenNavItem((prevOpenNavItem) => !prevOpenNavItem);
  };

  const handleResize = () => {
    if (window.innerWidth >= 640) {
      setOpenNavItem(false);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

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

        setUsers(userProfileResponse.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    handleResize();
  }, []);

  const imageProfile =
    users.profile_image !==
    'https://minio.nutech-integrasi.com/take-home-test/null'
      ? users.profile_image
      : profileImageDefault;

  return (
    <>
      <header className='w-full border-b-2 px-4 '>
        <nav className='w-full flex items-center h-20 justify-between md:max-w-7xl md:mx-auto '>
          <Link to={'/home'} className='flex items-center gap-x-2'>
            <img src={logo} alt='Logo SIMS PPOB' />
            <h1 className='font-semibold'>SIMS PPOB</h1>
          </Link>

          <div className=' hidden sm:flex items-center gap-x-10 font-medium text-end'>
            <NavItem title={'Top Up'} href={'/home/top-up'} />
            <NavItem title={'Transaction'} href={'/home/transaction'} />
            <NavItem title={'Akun'} href={'/home/akun'} />
          </div>
          <GiHamburgerMenu
            onClick={handleOpenNavitem}
            className='sm:hidden text-2xl'
          />
        </nav>
      </header>

      <div
        className={`${
          openNavItem
            ? '  translate-y-0 z-50 opacity-100 '
            : '-translate-x-[9999px]  opacity-0  '
        } bg-white absolute border-b-2 h-60 rounded-b-xl shadow-lg flex flex-col justify-center w-full p-4 transition-all  gap-y-5 text-black font-bold uppercase text-center  md:max-w-7xl md:mx-auto`}
      >
        <NavItem
          title={'Top Up'}
          href={'/home/top-up'}
          className={
            'rounded-lg border-2 bg-white h-10 flex items-center justify-center'
          }
        />
        <NavItem
          title={'Transaction'}
          href={'/home/transaction'}
          className={
            'rounded-lg border-2 bg-white  h-10 flex items-center justify-center'
          }
        />
        <NavItem
          title={'Akun'}
          href={'/home/akun'}
          className={
            'rounded-lg border-2 bg-white h-10 flex items-center justify-center'
          }
        />
      </div>

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
            <h3 className='text-2xl font-semibold'>
              Rp{' '}
              {viewBalance ? userBalance.toLocaleString('id-ID') : '********'}
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
      )}
    </>
  );
};

export default Header;
