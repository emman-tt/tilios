import { useEffect, useState } from 'react'
import Loader from '../../../components/Loader'
import { api } from '../../../api/axios'
import { toast } from 'sonner'
import { NavLink } from 'react-router-dom'
export default function Order() {
  const [loader, showLoader] = useState(true)
  const [details, setDetails] = useState([])

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      'session_id'
    )

    async function fetchOrderDetails() {
      try {
        const response = await api.get(`/order/status/${sessionId}`)
        const data = response.data
        setDetails([data.details])
        setTimeout(() => {
          showLoader(false)
        }, 500)
      } catch (error) {
        const status = error.status
        showLoader(false)
        if (status === 405) {
          return toast.error('Session timed out,log in again', {
            description: 'redirecting to login page ...'
          })
        }

        if (status === 404) {
          return toast.error('Order was unsuccesful, try again', {
            description:
              'This can be due to Insufficient amountor Malicious attack orSystem errors,your money wasnt proccesed nor deducted'
          })
        }
        console.log(error.data)
      }
    }

    fetchOrderDetails()
  }, [])

  function extractData(item, type) {
    const arr = item.split(',')
    if (type === 'email') {
      const email = arr.find(item => item.includes('@'))
      return email
    }

    if (type === 'address') {
      const country = arr[0]
      const city = arr[1]
      const gps = arr[2]

      const address = `${country},${city},${gps}`

      return address
    }

    if (type === 'phone') {
      const phone = arr[arr.length - 1]
      return phone
    }
  }

  return (
    <section className=' rounded-xl h-auto w-full md:w-[80%] mt-6  border-[0.1px] border-black/30 bg-[#f0f0f0] p-0.5 '>
      <div className='border gap-5 grid grid-cols-1 md:grid-cols-2  border-[#d9d9d9] h-full rounded-xl  p-1 px-4  bg-white'>
        {loader === true ? (
          <section className='flex absolute z-10 inset-0   justify-center items-center h-full w-full'>
            <Loader className={'opacity-100'} />
          </section>
        ) : (
          details.map(item => (
            <>
              <section
                key={item.id}
                className='justify-center flex flex-col items-center h-full p-6'
              >
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                  Thank You for the purchase!
                </h2>
                <p className='text-[#4d4d4d] mt-4 font-semibold text-base md:text-lg'>
                  We've received your order and will ship in 5-7 business days
                </p>
                <p className='text-[#4d4d4d] text-center text-base md:text-lg font-semibold'>
                  Your order number is {item.reference}
                </p>

                <section className='rounded-4xl shadow w-full md:w-[90%] mt-5'>
                  <h2 className='text-xl text-center font-semibold'>
                    Order Summary
                  </h2>
                  <ul className='flex flex-col overflow-hidden overflow-y-scroll py-5 [scrollbar-width:thin] h-80'>
                    {item.product_details.map(each => (
                      <li
                        key={each.product_id}
                        className='w-full shrink-0 flex flex-col sm:flex-row h-auto sm:h-30 p-3 sm:p-4 items-start sm:items-center  justify-between gap-3 sm:gap-0'
                      >
                        <div className='flex h-full items-center gap-3 sm:gap-6'>
                          <div className='  h-20 w-20 sm:h-full sm:w-30'>
                            <img
                              src={each.product_image}
                              className='w-full rounded-3xl h-full object-cover'
                              alt=''
                            />
                          </div>
                          <p className='font-mono'>{each.product_name}</p>
                        </div>
                        <p className='font-semibold'>$ {each.product_total}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </section>

              <section className='flex flex-col pt-5'>
                <section className='h-[50%] border rounded-4xl shadow w-full'></section>
                <section className='px-4 sm:px-6 md:px-10  mt-5 gap-3'>
                  <div className='flex justify-between w-full'>
                    <p className='text-sm font-semibold'>Name :</p>
                    <p className='text-black'>{item.user.name}</p>
                  </div>
                  <div className='flex justify-between w-full'>
                    <p className='text-sm font-semibold'> Address : </p>
                    <p className='text-black'>
                      {extractData(item.shippingAddress, 'address')}
                    </p>
                  </div>
                  <div className='flex justify-between w-full'>
                    <p className='text-sm font-semibold'> Email : </p>
                    <p className='text-black'>
                      {extractData(item.shippingAddress, 'email')}
                    </p>
                  </div>
                  <div className='flex justify-between w-full'>
                    <p className='text-sm font-semibold'> Phone : </p>
                    <p className='text-black'>
                      {extractData(item.shippingAddress, 'phone')}
                    </p>
                  </div>
                  <div className='flex justify-between w-full'>
                    <p className='text-sm font-semibold'> Order number : </p>
                    <p className='text-black'>{item.reference}</p>
                  </div>
                </section>

                <NavLink
                  to={'/'}
                  className='py-4 bg-black text-white mx-4 sm:mx-10 md:mx-30 mt-6 rounded-2xl flex justify-center items-center font-semibold'
                >
                  Back to shopping
                </NavLink>
              </section>
            </>
          ))
        )}
      </div>
    </section>
  )
}
