import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function CartPage () {

    


  return (
    <section className='flex flex-col justify-center items-center'>
      <h2 className='text-4xl font-bold mt-10 pb-10 font-serif'>
        Shopping Cart
      </h2>

      <ul className='flex gap-10 '>
        <li className='text-3xl items-center w-70  gap-3 border-b-3 flex pb-3'>
          <div className='px-4.5 py-2 flex justify-center items-center  rounded-2xl bg-black text-white text-xl'>
            1
          </div>
          <p className='text-lg font-semibold '> Shopping Cart</p>
        </li>
        <li className='text-3xl flex gap-3 w-70 items-center  border-b-4 pb-3'>
          <div className='px-4.5 py-2 rounded-2xl flex justify-center items-center bg-gray-200 text-xl text-white font-semibold'>
            2
          </div>
          <p className='text-lg font-semibold  text-gray-200'>
            Checkout Details
          </p>
        </li>
        <li className='text-3xl flex gap-3 w-70 items-center border-b-4 pb-3'>
          <div className='px-4.5 py-2 flex justify-center items-center rounded-xl bg-gray-200 text-xl text-white font-semibold'>
            3
          </div>
          <p className='text-lg font-semibold text-gray-200 '>Order Complete</p>
        </li>
      </ul>
      <Outlet />
    </section>
  )
}
