import { NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/cart'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { api } from '../../../api/axios'
import Loader from '../../../components/Loader'
export default function Checkout () {
  const [details, setDetails] = useState([
    {
      firstname: '',
      secondname: '',
      email: '',
      number: 0,
      country: '',
      city: '',
      addressOne: '',
      addressTwo: ''
    }
  ])
  const { SaveCheckoutDetails, cartProducts, orderTotal } = useCart()
  const navigate = useNavigate()
  const [fee, setFee] = useState(0)
  const [loader, showLoader] = useState(false)

  const handleInput = (type, input) => {
    setDetails(prev =>
      prev.map(item => {
        return {
          ...item,
          [type]: input
        }
      })
    )
  }

  function validator () {
    let isValid = true
    const each = details.some(
      item =>
        item.addressOne === '' ||
        item.city === '' ||
        item.firstname === '' ||
        item.secondname === '' ||
        item.country === '' ||
        item.number.length <= 8 ||
        !item.email.includes('@') ||
        !item.email.includes('.')
    )

    if (each) {
      toast.error('Some required fields are missing', {
        description: 'Please make sure to fill every field '
      })

      isValid = false
    }

    if (!orderTotal) {
      toast.error("No product  in cart to order")
      isValid = false;
      navigate('/cart')
    }

    SaveCheckoutDetails(details)

    return isValid
  }

  async function handlePayments () {
    try {
      const isValid = validator()
      if (!isValid) {
        console.log('invalid input')
        return
      }
      showLoader(true)
      const data = details[0]
      const address = `${data.country},${data.city},${data.addressOne},${data.addressTwo},${data.email},${data.number}`
      const response = await api.post('/order/session', {
        address: address,
        details: cartProducts
      })
      const url = response.data.url
      toast.success('Redirecting to payment page....', {
        duration: 1400
      })
      setTimeout(() => {
        window.location.href = url
      }, 1000)
    } catch (error) {
      toast.error(error.data.message)
      showLoader(false)
      console.log(error)
    }
  }

  return (
    <section className=' rounded-xl h-155 w-[80%] mt-6  border-[0.1px] border-black/30 bg-[#f0f0f0] p-0.5 '>
      <div className='border gap-5 grid grid-cols-3 relative   border-[#d9d9d9] h-full rounded-xl  p-1 px-4  bg-white'>
        {loader && (
          <section className='flex absolute z-10 inset-0  justify-center items-center h-full w-full'>
            <Loader className={''} />
          </section>
        )}
        <section className='h-full w-full pt-5  pr-20 '>
          <h2 className='text-xs font-semibold mb-3'>
            Fill the form below to complete your purchase
          </h2>

          <p className='font-bold mb-3'>1. Billing Address</p>

          <div className=' flex w-full flex-col justify-between'>
            <div className='flex flex-col'>
              <label className='pl-3 font-semibold' htmlFor='name'>
                First Name
              </label>
              <input
                onChange={e => handleInput('firstname', e.target.value)}
                required
                type='text'
                className='border block pl-5 rounded-3xl border-gray-500 w-full py-3 mb-4'
              />
            </div>
            <div className='flex flex-col'>
              <label className='pl-3 font-semibold' htmlFor='name'>
                Last Name
              </label>
              <input
                onChange={e => handleInput('secondname', e.target.value)}
                required
                type='text'
                className='border  b pl-5 rounded-3xl border-gray-500 w-full py-3 mb-4'
              />
            </div>
          </div>
          <label className='pl-3 font-semibold' htmlFor='email'>
            Email address
          </label>
          <input
            type='email'
            onChange={e => handleInput('email', e.target.value)}
            required
            className='border pl-5 rounded-3xl border-gray-500 w-full py-3 mb-4'
          />
          <label className='pl-3 font-semibold' htmlFor='tel'>
            Phone number
          </label>
          <input
            onChange={e => handleInput('number', e.target.value)}
            type='tel'
            required
            className='border pl-5 rounded-3xl border-gray-500 w-full py-3 mb-4'
          />

          <div className='flex flex-col'>
            <label className='pl-3 font-semibold' htmlFor='name'>
              Country
            </label>
            <input
              onChange={e => handleInput('country', e.target.value)}
              type='text'
              className='border block pl-5 rounded-3xl border-gray-500 w-full py-3 mb-4'
            />
          </div>
        </section>
        <section className='h-full w-full pr-20 mt-10'>
          <div className=' flex w-full flex-col justify-between'>
            <div className='flex flex-col'>
              <label className='pl-3 font-semibold' htmlFor='name'>
                City
              </label>
              <input
                type='text'
                onChange={e => handleInput('city', e.target.value)}
                required
                className='border  b pl-5 rounded-3xl border-gray-500 w-full py-3 mb-4'
              />
            </div>
          </div>
          <label className='pl-3 font-semibold ' htmlFor='tel'>
            Address 1
          </label>
          <input
            type='text'
            onChange={e => handleInput('addressOne', e.target.value)}
            required
            className='border pl-5 rounded-3xl border-gray-500 w-full py-3 '
          />
          <label className='pl-3 font-semibold' htmlFor='tel'>
            Address 2
          </label>
          <input
            type='text'
            onChange={e => handleInput('addressTwo', e.target.value)}
            required
            className='border pl-5 rounded-3xl border-gray-500 w-full py-3 '
          />
          <p className='font-bold  mt-8'>2. Shipping method</p>

          <div className='flex flex-col font-semibold  mt-3 gap-3'>
            <div className='flex justify-between '>
              <div className='flex gap-7'>
                <input
                  onClick={() => setFee(13)}
                  defaultChecked
                  type='radio'
                  name='week'
                  className='text-sm'
                />
                <p>Faster(1-5 weeks)</p>
              </div>
              <p>$13.00</p>
            </div>
            <div className='flex justify-between '>
              <div className='flex gap-7'>
                <input onClick={() => setFee(8)} type='radio' name='week' />
                <p>Regular(1-7 weeks)</p>
              </div>
              <p>$8.00</p>
            </div>
          </div>

          <p className='font-bold  mt-11'>2. Payment method</p>
          <div className='flex   mt-3 gap-7'>
            <div className='flex gap-2 '>
              <input
                type='radio'
                defaultChecked
                name='payment'
                className='text-sm'
              />
              <p>Credit Card</p>
            </div>
            <div className='flex gap-2'>
              <input type='radio' name='payment' />
              <p>Paypal</p>
            </div>
          </div>
        </section>
        <section className='h-full w-full'>
          <ul className='flex flex-col gap-2 w-full'>
            <li className=''>
              <p className='font-bold  mt-8'>3. Order Summary</p>
            </li>

            <li className='w-full flex justify-between'>
              <p className='text-sm text-gray-500'>Subtotal</p>
              <p className='font-semibold'>${orderTotal}</p>
            </li>
            <li className='w-full flex justify-between'>
              {/* <p className='text-sm text-gray-500'>Discount (0%)</p>
              <p className='text-red-500'>- $0</p> */}
            </li>
            <li className='w-full flex justify-between border-b border-gray-200 pb-8'>
              <p className='text-sm text-gray-500'>Delivery Fee</p>
              <p className='font-semibold'>${fee}</p>
            </li>
            <li className='w-full flex justify-between mb-5'>
              <p className='font-bold text-lg'>Total</p>
              <p className='font-semibold text-lg'>${orderTotal}</p>
            </li>
          </ul>

          <button
            onClick={() => handlePayments()}
            className='mt-8 bg-black rounded-xl flex justify-center items-center self-end justify-self-end p-3 px-7 cursor-pointer text-white'
          >
            Pay now
          </button>
        </section>
      </div>
    </section>
  )
}
