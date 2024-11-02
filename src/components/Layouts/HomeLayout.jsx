import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <section className='px-4 xl:px-0 md:max-w-7xl md:mx-auto'>
        <Outlet />
      </section>
    </div>
  );
};

export default HomeLayout;
