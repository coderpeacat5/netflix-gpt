import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div>
            <Header />
        
            <div className='absolute max-h-svh'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_large.jpg'
                    alt="bg-img" />
            </div>

            <form className='p-5 absolute w-3/12 top-28 mx-auto left-0 right-0 flex flex-col justify-center items-center bg-black bg-opacity-70 shadow-xl hover:shadow-2xl rounded'>

                <h3 className='mb-8 p-2 text-white font-bold text-xl'>{isSignInForm ? " Sign In" : "Sign Up"}</h3>

                {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 mb-4 w-full rounded-sm bg-transparent border text-gray-300'></input>}

                <input type='text' placeholder='Email or mobile number' className='p-4 mb-4 w-full rounded-sm bg-transparent border text-gray-300'></input>

                <input type='password' placeholder='Password' className='p-4 mb-4 w-full rounded-sm bg-transparent border text-gray-300'></input>

                <button className='p-4 m-4 bg-red-700 text-white w-full rounded-sm hover:bg-red-800'>{isSignInForm ? "Sign In" : "Sign Up"}</button>

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