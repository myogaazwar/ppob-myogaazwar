import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '.././custom.css';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      setLoading(true);
      try {
        const bannersResponse = await axios.get(
          'https://take-home-test-api.nutech-integrasi.com/banner',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const servicesResponse = await axios.get(
          'https://take-home-test-api.nutech-integrasi.com/services',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBanners(bannersResponse.data.data);
        setServices(servicesResponse.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <section className='h-screen flex items-center justify-center'>
          <div className='custom-loader'></div>
        </section>
      ) : (
        <>
          <section className='mt-14 gap-x-5 text-center overflow-x-auto flex '>
            {services.map((service) => (
              <div
                key={service.service_code}
                className='w-full flex-wrap flex flex-col gap-y-2 items-center'
              >
                <img
                  className='w-14 h-14 max-w-fit'
                  src={service.service_icon}
                  alt={service.service_name}
                />
                <p className='text-sm text-center'>{service.service_name}</p>
              </div>
            ))}
          </section>

          <section className='mt-10 '>
            <h3 className='font-semibold mb-5'>Temukan promo menarik</h3>

            <div className='flex gap-x-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
              {banners.map((banner) => (
                <img
                  key={banner.banner_name}
                  src={banner.banner_image}
                  alt={banner.banner_name}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
