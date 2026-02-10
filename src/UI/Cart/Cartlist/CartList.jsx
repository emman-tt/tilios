import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../../context/cart'
import { useEffect } from 'react'
export default function Cartlist () {
  const { cartProducts, fetchCart } = useCart()
  console.log(cartProducts)
  useEffect(() => {
    fetchCart()
  }, [])
  return (
    <section className='mt-6 w-full flex justify-center'>
      <div className='flex w-[60%] gap-3'>
        <section className='flex flex-col w-[60%] gap-3'>
          <section className=' rounded-[100px] border-[0.1px] border-black/30 bg-[#f0f0f0]   w-full p-1 '>
            <div className='border w-full border-[#d9d9d9] rounded-[100px] flex justify-between p-1 px-4 items-center bg-white'>
              <div className='font-semibold'>Select All</div>
              <button className='rounded-3xl bg-black flex justify-center items-center text-white py-2 px-7'>
                Clear
              </button>
            </div>
          </section>

          <section className=' rounded-[20px] border-[0.1px] border-black/30 bg-[#f0f0f0]    w-full p-1 h-120  '>
            <div className='border w-full border-[#d9d9d9] rounded-[20px] flex px-4  p-5 h-full [scrollbar-width:thin] overflow-y-auto   bg-white flex-col gap-5 '>
              {cartProducts.length === 0 || !cartProducts ? (
                <section>No products found</section>
              ) : (
                cartProducts.map(item => (
                  <section className='flex h-35  justify-between border-b pb-3 border-gray-200 w-full shrink-0'>
                    <div className='flex gap-5  '>
                      <div className='h-full w-35 bg-gray-200 rounded-2xl'>
                        <img
                          src={item.image}
                          className='h-full w-full rounded-2xl'
                          alt={item.name}
                        />
                      </div>
                      <header className=' flex flex-col justify-between h-full'>
                        <div className='text-sm'>
                          <p className='text-lg font-semibold'>{item.name}</p>
                          <p>Category: {item.category}</p>
                        </div>

                        <p className='font-bold text-lg'>${item.amount}</p>
                      </header>
                    </div>

                    <div className='h-full items-end justify-between flex flex-col'>
                      <p>
                        <Trash2
                          size={20}
                          color='red'
                          className='cursor-pointer'
                        />
                      </p>

                      <div className='flex gap-3 items-center cursor-pointer bg-gray-100 rounded-3xl p-2'>
                        <Minus size={20} />
                        <p>3</p>
                        <Plus size={20} />
                      </div>
                    </div>
                  </section>
                ))
              )}
            </div>
          </section>
        </section>

        <section className=' rounded-[20px] border-[0.1px] border-black/30 bg-[#f0f0f0]   grow p-1 h-max '>
          <div className='border w-full border-[#d9d9d9] rounded-[20px] flex justify-between p-5  h-full items-center  bg-white'>
            <ul className='flex flex-col gap-2 w-full'>
              <li className='w-full text-2xl font-semibold'>Order Summary</li>
              <li className='flex w-full'>
                <input
                  type='text'
                  className='w-[70%] border rounded-3xl border-gray-200 px-4'
                  placeholder='Coupon code'
                  name=''
                  id=''
                />
                <button className='p-3 cursor-pointer text-white rounded-4xl grow bg-black '>
                  Apply
                </button>
              </li>
              <li className='w-full flex justify-between'>
                <p className='text-sm text-gray-500'>Subtotal</p>
                <p className='font-semibold'>$583</p>
              </li>
              <li className='w-full flex justify-between'>
                <p className='text-sm text-gray-500'>Discount (-0.5%)</p>
                <p className='text-red-500'>- $12</p>
              </li>
              <li className='w-full flex justify-between border-b border-gray-200 pb-8'>
                <p className='text-sm text-gray-500'>Delivery Fee</p>
                <p className='font-semibold'>$15</p>
              </li>
              <li className='w-full flex justify-between mb-5'>
                <p className='font-bold text-lg'>Total</p>
                <p className='font-semibold text-lg'>$153</p>
              </li>

              <li className='bg-black cursor-pointer rounded-3xl p-4 text-center w-full text-white'>
                Go To Checkout
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  )
}
