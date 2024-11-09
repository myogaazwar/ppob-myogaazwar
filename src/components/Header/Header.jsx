import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/WebsiteAssets/Logo.png';

import { GiHamburgerMenu } from 'react-icons/gi';

import NavItem from './NavItem';

const Header = () => {
  const [openNavItem, setOpenNavItem] = useState(false);

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
    handleResize();
  }, []);

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
            <NavItem title={'Akun'} href={'/home/account'} />
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
          href={'/home/account'}
          className={
            'rounded-lg border-2 bg-white h-10 flex items-center justify-center'
          }
        />
      </div>
    </>
  );
};

export default Header;
