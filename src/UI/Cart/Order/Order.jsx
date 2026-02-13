import { useCart } from '../../../context/cart'
export default function Order () {
  const { checkoutDetails } = useCart()
  return (
    <section className=' rounded-xl h-auto w-full md:w-[80%] mt-6  border-[0.1px] border-black/30 bg-[#f0f0f0] p-0.5 '>
      <div className='border gap-5 grid grid-cols-1 md:grid-cols-2  border-[#d9d9d9] h-full rounded-xl  p-1 px-4  bg-white'>
        <section className='justify-center flex flex-col items-center h-full p-6'>
          <h2 className='text-4xl font-bold'>Thank You , Emmanuel!</h2>
          <p className='text-[#4d4d4d] mt-4 font-semibold text-lg'>
            We've received your order and will ship in 5-7 business days
          </p>
          <p className='text-[#4d4d4d] text-center text-lg font-semibold'>
            Your order number is #TIL-G0A4I0
          </p>

          <section className='rounded-4xl shadow w-full md:w-[90%] mt-5'>
            <h2 className='text-xl text-center font-semibold'>Order Summary</h2>
            <ul className='flex flex-col overflow-hidden overflow-y-scroll py-5 [scrollbar-width:thin] h-80'>
              {[1, 2, 3].map(item => (
                <li className='w-full shrink-0 flex h-30 p-4 items-center  justify-between'>
                  <div className='flex h-full items-center gap-6'>
                    <div className='bg-gray-300 rounded-3xl h-full w-30'></div>
                    <p className='font-mono'>Chelsea 12" + 12"</p>
                  </div>
                  <p className='font-semibold'>$ 18.6</p>
                </li>
              ))}
            </ul>
          </section>
        </section>
        <section className='flex flex-col pt-5'>
          <section className='h-[50%] border rounded-4xl shadow w-full'></section>
          <section className='px-10  mt-5 gap-3'>
            <div className='flex justify-between w-full'>
              <p className='text-sm font-semibold'>Name :</p>
              <p className='text-black'>
                {checkoutDetails.firstname + checkoutDetails.secondname}
              </p>
            </div>
            <div className='flex justify-between w-full'>
              <p className='text-sm font-semibold'> Address : </p>
              <p className='text-black'>
                {checkoutDetails.country} , {checkoutDetails.city} ,
                {checkoutDetails.addressOne}, {checkoutDetails.addressTwo}
              </p>
            </div>
            <div className='flex justify-between w-full'>
              <p className='text-sm font-semibold'> Email : </p>
              <p className='text-black'>{checkoutDetails.email}</p>
            </div>
            <div className='flex justify-between w-full'>
              <p className='text-sm font-semibold'> Phone : </p>
              <p className='text-black'>{checkoutDetails.number}</p>
            </div>
            <div className='flex justify-between w-full'>
              <p className='text-sm font-semibold'> Order number : </p>
              <p className='text-black'>#TIL-G0A4I0</p>
            </div>
          </section>
        </section>
      </div>
    </section>
  )
}
