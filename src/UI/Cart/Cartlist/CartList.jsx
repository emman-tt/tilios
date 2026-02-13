import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../../context/cart'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Collectiion } from '../../../utils/collection'
import { lazy } from 'react'
// const NotFound = lazy(() => import('./not-found'))
import { NotFound } from './not-found'
import Loader from '../../../components/Loader'
export default function Cartlist () {
  const { cartProducts, fetchCart, deleteCart, updateCart, status } = useCart()

  useEffect(() => {
    fetchCart()
  }, [])

  function calculateTotal (item) {
    const discountValue = (parseFloat(item.discount) / 100) * item.amount
    const priceAtSale = (item.amount - discountValue).toFixed(2)

    const qty = parseInt(item.cartProduct.quantity)

    const total = qty * priceAtSale

    return total.toFixed(2)
  }

  return (
    <section className='mt-6 w-full flex justify-center'>
      <div className='flex flex-col md:flex-row w-full md:w-[80%] gap-3 px-4'>
        <section className='flex flex-col w-full md:w-[60%] gap-3'>
          <section className=' rounded-[100px] border-[0.1px] border-black/30 bg-[#f0f0f0]   w-full p-0.5 '>
            <div className='border w-full border-[#d9d9d9] rounded-[100px] flex justify-between p-1 px-4 items-center bg-white'>
              <div className='font-semibold'>Select All</div>
              <button className='rounded-3xl bg-black flex justify-center items-center text-white py-2 px-7'>
                Clear
              </button>
            </div>
          </section>

          <section className=' rounded-[20px] border-[0.1px] border-black/30 bg-[#f0f0f0]    w-full p-0.5 h-120  '>
            <div className='border w-full border-[#d9d9d9] rounded-[20px] flex px-4  p-5 h-full [scrollbar-width:thin] overflow-y-auto   bg-white flex-col gap-5 '>
              {status === 'loading' && (
                <section className='flex relative  justify-center items-center h-120 w-full'>
                  <Loader />
                </section>
              )}
              {cartProducts.length === 0 ||
                (!cartProducts && status !== 'loading' && (
                  <section className='flex w-full h-full justify-center items-center text-3xl font-semibold'>
                    <NotFound />
                  </section>
                ))}

              {status !== 'loading' &&
                cartProducts.map(item => (
                  <section
                    key={item.id}
                    className='flex flex-col md:flex-row md:h-35  justify-between border-b pb-3 border-gray-200 w-full shrink-0 gap-3'
                  >
                    <div className='flex gap-5 w-full md:w-auto'>
                      <div className='h-28 w-28 md:h-full md:w-35 bg-gray-200 rounded-2xl overflow-hidden'>
                        <img
                          src={item.image}
                          className='h-full w-full rounded-2xl object-cover'
                          alt={item.name}
                        />
                      </div>
                      <header className=' flex flex-col justify-between h-full'>
                        <section>
                          <div className='text-[15px]'>
                            <p className='text-lg font-semibold'>{item.name}</p>
                            <p>
                              Category:
                              <span className='font-semibold pl-3 capitalize'>
                                {Collectiion.find(
                                  cat => cat.id === item.categoryId
                                ).value.toLocaleLowerCase()}
                              </span>
                            </p>
                            {item.discount > 0 && (
                              <p className='text-red-500 font-semibold italic text-xs'>
                                Discount: {item.discount}%
                              </p>
                            )}
                          </div>
                          <div className='font-semibold text-[13px] flex gap-2'>
                            <p
                              className={
                                item.discount > 0 &&
                                'line-through text-gray-400'
                              }
                            >
                              ${item.amount}
                            </p>
                            <p
                              className={item.discount > 0 ? 'block' : 'hidden'}
                            >
                              ${item.cartProduct.priceAtSale}
                            </p>
                            per-ft
                          </div>
                        </section>

                        <div className='flex  '>
                          <p>Total : </p>
                          <span className=' font-semibold pl-2'>
                            ${calculateTotal(item)}
                          </span>
                        </div>
                      </header>
                    </div>

                    <div className='h-full items-end justify-between flex flex-row md:flex-col gap-3'>
                      <p
                        onClick={() => {
                          deleteCart(item.id)
                        }}
                      >
                        <Trash2
                          size={20}
                          color='red'
                          className='cursor-pointer'
                        />
                      </p>

                      <div className='flex gap-3 items-center cursor-pointer bg-gray-100 rounded-3xl p-2'>
                        <Minus
                          size={20}
                          onClick={() => updateCart('decrease', item.id)}
                        />
                        <p>{item.cartProduct.quantity}</p>
                        <Plus
                          size={20}
                          onClick={() => updateCart('increase', item.id)}
                        />
                      </div>
                    </div>
                  </section>
                ))}
            </div>
          </section>
        </section>

        <section className=' rounded-[20px] border-[0.1px] border-black/30 bg-[#f0f0f0]   w-full md:w-[40%] p-0.5 h-max '>
          <div className='border w-full border-[#d9d9d9] rounded-[20px] flex flex-col md:flex-row justify-between p-5  h-full items-center  bg-white'>
            <ul className='flex flex-col gap-2 w-full'>
              <li className='w-full text-2xl font-semibold'>Order Summary</li>
              <li className='flex w-full'>
                <input
                  type='text'
                  className='w-full md:w-[70%] border rounded-3xl border-gray-200 px-4 mr-2'
                  placeholder='Coupon code'
                  name=''
                  id=''
                />
                <button className='p-3 cursor-pointer text-white rounded-4xl w-full md:w-auto bg-black '>
                  Apply
                </button>
              </li>
              <li className='w-full flex justify-between'>
                <p className='text-sm text-gray-500'>Subtotal</p>
                <p className='font-semibold'>$0</p>
              </li>
              <li className='w-full flex justify-between'>
                <p className='text-sm text-gray-500'>Discount (0%)</p>
                <p className='text-red-500'>- $0</p>
              </li>
              <li className='w-full flex justify-between border-b border-gray-200 pb-8'>
                <p className='text-sm text-gray-500'>Delivery Fee</p>
                <p className='font-semibold'>$0</p>
              </li>
              <li className='w-full flex justify-between mb-5'>
                <p className='font-bold text-lg'>Total</p>
                <p className='font-semibold text-lg'>$0</p>
              </li>

              <NavLink
                to={'/cart/checkout'}
                className='bg-black cursor-pointer rounded-3xl p-4 text-center w-full text-white'
              >
                Go To Checkout
              </NavLink>
            </ul>
          </div>
        </section>
      </div>
    </section>
  )
}
