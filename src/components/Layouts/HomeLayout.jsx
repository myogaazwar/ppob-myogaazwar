import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <main className='px-4 pb-5 xl:px-0 md:max-w-7xl md:mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
