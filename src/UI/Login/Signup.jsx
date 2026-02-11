import { useState, useRef, lazy } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const Loader = lazy(() => import('./Loader'))
export default function SignUp () {
  const [showPassword, setShowPassword] = useState(true)
  const [errorType, setErrorType] = useState('')
  const signUp = useRef(null)
  const {
    email,
    showError,
    error,
    setErrorMessage,
    password,
    username,
    fillEmail,
    fillPassword,
    fillUsername,
    registerUser,
    authType,
    registerAdmin,
    status
  } = useAuth()
  useGSAP(() => {
    gsap.from(signUp.current, {
      x: 500,
      duration: 0.4,
      opacity: 0.5,
      ease: 'sine'
    })
  })

  function Submit () {
    setErrorMessage('signup')

    if (authType === 'admin') {
      return registerAdmin()
    }
    registerUser()
  }

  return (
    <section
      ref={signUp}
      className='w-full sm:w-96 md:w-120 h-max bg-[#ffffff] rounded-2xl sm:rounded-3xl md:rounded-4xl shadow-lg sm:shadow-xl md:shadow-2xl flex flex-col p-5 sm:p-7 md:p-10 mx-4 sm:mx-0'
    >
      {status === 'loading' && <Loader />}
      <h2 className='flex justify-center text-xl sm:text-2xl md:text-3xl font-bold font-sans'>
        {authType === 'admin' ? 'Admin' : 'User'} Signup
      </h2>
      <p className='flex justify-center text-center font-medium text-xs sm:text-sm md:text-md mt-2'>
        Hey enter your details to create a new account
      </p>
      <div className='flex mt-6 sm:mt-8 md:mt-10 flex-col gap-2 sm:gap-3 md:gap-3'>
        <section className='flex justify-between px-3 sm:px-4 md:px-6 border border-gray-400 h-12 sm:h-14 md:h-15 rounded-lg sm:rounded-xl w-full '>
          <input
            value={email}
            onChange={e => {
              fillEmail(e.target.value)
            }}
            type='text'
            placeholder='Email Address'
            className='text-xs sm:text-sm focus:outline-none w-full text-black font-semibold'
          />
        </section>
        <section className='flex justify-between px-3 sm:px-4 md:px-6 border border-gray-400 h-12 sm:h-14 md:h-15 rounded-lg sm:rounded-xl w-full '>
          <input
            value={username}
            onChange={e => fillUsername(e.target.value)}
            type='text'
            placeholder='Username'
            className='text-xs sm:text-sm focus:outline-none w-full text-black font-semibold'
          />
        </section>
        <section className='flex justify-between px-3 sm:px-4 md:px-6 border h-12 sm:h-14 md:h-15 rounded-lg sm:rounded-xl w-full border-gray-400 items-center '>
          <input
            value={password}
            onChange={e => fillPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='text-xs sm:text-sm focus:outline-none w-full text-black font-semibold'
          />
          <div
            onClick={() => {
              setShowPassword(e => !e)
            }}
            className={`${
              showPassword ? '' : 'line-through'
            } text-black text-xs sm:text-sm cursor-pointer whitespace-nowrap`}
          >
            Hide
          </div>
        </section>
      </div>
      <button
        onClick={() => {
          Submit()
        }}
        className='bg-[#fdc886] cursor-pointer  rounded-lg sm:rounded-2xl mt-3 sm:mt-4 md:mt-4 py-3 sm:py-3 text-xs sm:text-sm md:text-md font-semibold transition-all hover:bg-[#f5b85d]'
      >
        Sign Up
      </button>
      {showError && (
        <p className='text-red-500 text-xs sm:text-sm font-semibold pt-3'>
          {error}
        </p>
      )}
      <p className='flex justify-center mt-10 sm:mt-4 md:mt-5 text-xs'>
       
        -Or Sign Up With-
      </p>

      <section className='flex gap-2 sm:gap-3 justify-between mt-3 sm:mt-4'>
        <button className='border-gray-200 hover:bg-gray-50 cursor-pointer flex gap-2 sm:gap-3 justify-center border grow rounded-lg sm:rounded-xl py-2 sm:py-2.5 md:py-1.5 items-center text-xs sm:text-sm md:text-md font-semibold transition-all'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='16'
            height='16'
            className='sm:w-5 sm:h-5'
            viewBox='0 0 50 50'
          >
            <path d='M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z'></path>
          </svg>
          Google
        </button>
        <button className='border-gray-200 gap-2 sm:gap-3 hover:bg-gray-50 cursor-pointer flex justify-center border grow rounded-lg sm:rounded-xl py-2 sm:py-2.5 md:py-1.5 items-center text-xs sm:text-sm md:text-md font-semibold transition-all'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='16'
            height='16'
            className='sm:w-5 sm:h-5'
            viewBox='0 0 50 50'
          >
            <path d='M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z'></path>
          </svg>{' '}
          Apple ID
        </button>
        <button className='border-gray-200 hover:bg-gray-50 cursor-pointer flex gap-2 sm:gap-3 justify-center border grow rounded-lg sm:rounded-xl py-2 sm:py-2.5 md:py-1.5 items-center text-xs sm:text-sm md:text-md font-semibold transition-all'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='16'
            height='16'
            className='sm:w-5 sm:h-5'
            viewBox='0 0 50 50'
          >
            <path d='M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z'></path>
          </svg>{' '}
          Facebook
        </button>
      </section>

      <p className='text-xs sm:text-sm mt-4 sm:mt-5 flex justify-center gap-2 flex-wrap'>
        Already have an account ?
        <NavLink
          to={'/auth'}
          className='font-bold hover:underline cursor-pointer whitespace-nowrap'
        >
          {authType === 'admin' ? 'Admin' : ''} Log in
        </NavLink>
      </p>
    </section>
  )
}
