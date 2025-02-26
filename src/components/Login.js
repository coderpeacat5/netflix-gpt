import React, { useState, useRef } from 'react'
import Header from './Header'
// import { checkValidEmail, checkValidPassword, checkValidName } from '../utils/validate';
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch()

    const [isSignInForm, setIsSignInForm] = useState(true);

    // const [emailErrMsg, setEmailErrMsg] = useState(null)
    // const [passErrMsg, setPassErrMsg] = useState(null)
    // const [nameErrMsg, setNameErrMsg] = useState(null)
    // const [errMessage, setErrMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR,
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL,
                                })
                            );
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // Sign In Logic
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    // Signed in
                    // eslint-disable-next-line no-unused-vars
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    };

    return (
        <div>
            <Header />

            <div className='absolute inset-0 w-full h-full overflow-hidden'>
                <img src={BG_URL}
                    alt="bg-img"
                    className='w-full h-full object-cover bg-no-repeat' />
            </div>

            <form
                onSubmit={(e) => e.preventDefault()}
                className='p-5 absolute w-3/12 top-28 mx-auto left-0 right-0 flex flex-col justify-center items-center bg-black bg-opacity-70 shadow-xl hover:shadow-2xl rounded'>

                <h3 className='mb-8 p-2 text-white font-bold text-xl'>{isSignInForm ? " Sign In" : "Sign Up"}</h3>

                {!isSignInForm && <><input ref={name} type='text' placeholder='Full Name' className='p-4 mb-4 w-full rounded-sm bg-transparent border text-gray-300' required />
                    {/* <p className='text-red-500 mb-4 p-1 text-sm font-medium'>{nameErrMsg}</p> */}
                </>}

                <input
                    ref={email}
                    type='text'
                    placeholder='Email Address'
                    className='p-4 mb-4 w-full rounded-sm bg-transparent border text-gray-300' required />
                {/* <p className='text-red-500 mb-4 p-1 text-sm font-medium'>{emailErrMsg}</p> */}

                <input
                    ref={password}
                    type='password'
                    placeholder='Password'
                    className='p-4 w-full rounded-sm bg-transparent border text-gray-300' required />
                <p className='text-red-500 my-3 p-1 text-sm font-medium'>{errorMessage}</p>

                <button className='p-4 m-4 bg-red-700 text-white w-full rounded-sm hover:bg-red-800'
                    onClick={handleButtonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className='text-white'>
                    {isSignInForm ?
                        <>New to Netflix? <span className='font-semibold cursor-pointer' onClick={toggleSignInForm}>Sign up now</span></>
                        :
                        <>Already have an account? <span className='font-semibold cursor-pointer' onClick={toggleSignInForm}>Sign In</span></>
                    }
                </p>

            </form>
        </div>
    )
}

export default Login