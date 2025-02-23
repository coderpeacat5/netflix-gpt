import React, {useEffect} from 'react'
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO_URL } from '../utils/constants';

const Header = () => {
  const navigate = useNavigate();
  const user= useSelector((store) =>store.user)
  const dispatch = useDispatch();
  
    const handleSignOut =() => {
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // navigate("/error")
      });
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in
              const { uid, email, displayName, photoURL } = user;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL : photoURL }))
              navigate("/browse")
          } else {
              // User is signed out
              dispatch(removeUser())
              navigate("/")
          }
      });

      return () => unsubscribe();
  }, [])

  return (
    <div className='w-full bg-gradient-to-b from-black flex justify-between absolute z-40 '>
      <div>
        <img src={LOGO_URL}
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