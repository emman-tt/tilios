import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CartPage () {
  const location = useLocation()
  const [section, setSection] = useState(1)
  useEffect(() => {
    const path = location.pathname
    const splitted = path.split('/')

    const pathname = splitted[splitted.length - 1]

    if (pathname === 'cart' || pathname === 'cartlist') {
      return setSection(1)
    }
    if (pathname === 'checkout') {
      return setSection(2)
    }
    if (pathname === 'success') {
      return setSection(3)
    }
  }, [location])
  return (
    <section className='flex flex-col w-full justify-center items-center'>
      <div className='w-full px-4 md:w-[70%] lg:w-[50%]'>
        <h2 className='text-3xl text-center font-bold mt-7 mb-4 font-serif'>
          Shopping Cart
        </h2>

        <ul className='flex gap-4 sm:gap-6 md:gap-10 flex-col sm:flex-row'>
          <li
            className={`text-3xl items-center w-full sm:w-auto md:w-70  gap-3 border-b-2 flex pb-3`}
          >
            <div
              className={`px-4.5 py-2 flex justify-center items-center  rounded-2xl    ${
                section === 1 ? 'bg-black' : 'bg-gray-200'
              }  text-white text-xl`}
            >
              1
            </div>
            <p
              className={`text-lg font-semibold ${
                section === 1 ? 'text-black' : 'text-gray-200'
              } `}
            >
              Shopping Cart
            </p>
          </li>
          <li
            className={`text-3xl  flex gap-3 w-full sm:w-auto md:w-70 items-center  border-b-2 pb-3`}
          >
            <div
              className={`px-4.5 py-2 rounded-2xl flex justify-center items-center    ${
                section === 2 ? 'bg-black' : 'bg-gray-200'
              }  text-xl text-white font-semibold`}
            >
              2
            </div>
            <p
              className={`text-lg font-semibold ${
                section === 2 ? 'text-black' : 'text-gray-200'
              }  `}
            >
              Checkout Details
            </p>
          </li>
          <li
            className={`text-3xl flex gap-3 w-full sm:w-auto md:w-70 items-center border-b-2 pb-3`}
          >
            <div
              className={`px-4.5 py-2 flex justify-center items-center rounded-xl
            ${
              section === 3 ? 'bg-black' : 'bg-gray-200'
            }     text-xl text-white font-semibold`}
            >
              3
            </div>
            <p
              className={`text-lg  ${
                section === 3 ? 'text-black' : 'text-gray-200'
              } font-semibold  `}
            >
              Order Complete
            </p>
          </li>
        </ul>
      </div>

      <div className='w-full px-4 flex justify-center md:w-[90%]'>
        <Outlet />
      </div>
    </section>
  )
}
