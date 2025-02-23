import React from 'react'

import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user= useSelector((store) =>store.user)
  
    const handleSignOut =() => {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/")
      }).catch((error) => {
        // navigate("/error")
      });
    }

  return (
    <div className='w-full bg-gradient-to-b from-black flex justify-between absolute z-40 '>
      <div>
        <img src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
        alt="logo" 
        className='w-72  px-6 py-2  ' />
        </div>
        {user && <div className='p-6 z-20'>
          <img 
          className='w-12 h-12 '
          src={user?.photoURL}
          alt='user-icon' />
          <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div>}
    </div>

  )
}

export default Header