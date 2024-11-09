import React, { useContext, useEffect, useState } from 'react';
import profileImageDefault from '../assets/WebsiteAssets/Profile Photo.png';
import { RiPencilFill } from 'react-icons/ri';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { IoPersonOutline } from 'react-icons/io5';
import InputForm from '../components/Elements/Input/Index';
import Button from '../components/Elements/Button/Button';
import { Link } from 'react-router-dom';
import { UserBalanceContext } from '../components/Layouts/HomeLayout';
import axios from 'axios';

const Account = () => {
  const { users, setUsers } = useContext(UserBalanceContext);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const fullName = users.first_name + ' ' + users.last_name;
  const imageProfile =
    users.profile_image !==
    'https://minio.nutech-integrasi.com/take-home-test/null'
      ? users.profile_image
      : profileImageDefault;

  const capitalize = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateImage = async () => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.put(
        'https://take-home-test-api.nutech-integrasi.com/profile/image',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const newImageSelected = response.data.data.profile_image;

      setImagePreview(newImageSelected);
      setUsers({ ...users, profile_image: newImageSelected });
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className='mt-5 max-w-5xl mx-auto'>
      {!users.profile_image ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <section className='flex flex-col items-center justify-center gap-y-2 relative max-w-full'>
            <div className='relative'>
              <img
                src={imagePreview ? imagePreview : imageProfile}
                alt={fullName}
                className='w-28'
              />
              <input
                type='file'
                id='fileInput'
                className='hidden'
                onChange={handleFileChange}
              />

              <label
                htmlFor='fileInput'
                className='absolute cursor-pointer right-0 top-20 border rounded-full w-7 h-7 flex items-center justify-center bg-white '
              >
                <RiPencilFill />
              </label>
            </div>
            <h1 className='text-2xl font-semibold'>{capitalize(fullName)}</h1>
          </section>

          <section>
            <InputForm
              id={'email'}
              name={'email'}
              type={'email'}
              label={'Email'}
              value={users.email || ''}
              icon={<MdOutlineAlternateEmail />}
              disabled
            />

            <InputForm
              id={'firstName'}
              name={'firstName'}
              type={'text'}
              label={'Nama Depan'}
              value={users.first_name || ''}
              icon={<IoPersonOutline />}
              disabled
            />

            <InputForm
              id={'lastName'}
              name={'lastName'}
              type={'text'}
              label={'Nama Belakang'}
              value={users.last_name || ''}
              icon={<IoPersonOutline />}
              disabled
            />

            <Button
              onClick={handleUpdateImage}
              classname={'bg-red-500 text-white mt-10'}
            >
              Edit Profile
            </Button>

            <Link
              to={'/'}
              className='w-full bg-white text-red-500 h-10 border-red-500 border rounded-md flex items-center justify-center mt-5'
            >
              Log out
            </Link>
          </section>
        </>
      )}
    </main>
  );
};

export default Account;
