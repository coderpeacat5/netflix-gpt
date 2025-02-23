import React, { useState, useRef } from 'react'
import Header from './Header'
// import { checkValidEmail, checkValidPassword, checkValidName } from '../utils/validate';
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate()
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

    const handleBtnClick = () => {
        // Validate the form data

        // console.log(email)
        // console.log(password)

        // const emailErr = checkValidEmail(email.current.value)
        // setEmailErrMsg(emailErr)

        // const passErr = checkValidPassword(password.current.value)
        // setPassErrMsg(passErr)

        // const nameErr = checkValidName(name.current.value)
        // setNameErrMsg(nameErr)
        const message = checkValidData(email.current.value, password.current.value);
        // const message = checkValidData(email.current.value, password.current.value, name.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                    }).then(() => {
                        // console.log(user)
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL : photoURL }))
                        navigate("/browse")
                    }).catch((error) => {
                        setErrorMessage(error.message)
                    });


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage)
                });
        }
        else {
            // Sign In Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " " + errorMessage)
                });
        }
    }

    return (
        <div>
            <Header />

            <div className='absolute max-h-screen'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_large.jpg'
                    alt="bg-img" />
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
                    onClick={handleBtnClick}>
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