import { ChevronLeft } from 'lucide-react'
import { confirmPayment, fetchOrders } from '../../../../services/Order'

export default function ConfirmPayment ({
  showConfirmModal,
  data,
  setCount,
  confirmPaymentStatus,
  dispatch
}) {
  function getAddress (item) {
    const arr = item.split(',')
    const address = `${arr[0]},${arr[1]},${arr[2]}`
    return address
  }
  function getPhone (item) {
    const arr = item.split(',')
    const phone = arr[arr.length - 1]
    return phone
  }

  function formatDate (rawDate) {
    const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return formattedDate
  }

  return (
    <section className='p-6 md:p-10 pt-5 pb-4 transition-all transform animate-in fade-in zoom-in-95 duration-300 ease-in-out h-max bg-white fixed md:absolute  z-20 w-[95%] max-w-4xl top-1/2 left-1/2 md:left-[15%] md:top-20 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 rounded-2xl  xl:top-0 shadow-2xl overflow-y-auto max-h-[90vh]'>
      <section className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-10'>
        <ul className='flex flex-col rounded-xl shadow-lg border border-gray-100 overflow-y-auto py-5 md:py-10 [scrollbar-width:thin] h-max md:h-112.5'>
          {data.product_details.map(each => (
            <li
              key={each.id}
              className='w-full shrink-0 flex  sm:flex-row  sm:h-30 p-3 sm:p-4 items-start sm:items-center    gap-3 sm:gap-7'
            >
              <div className='flex h-full items-center gap-3 sm:gap-6'>
                <div className='  h-20 w-20 sm:h-full sm:w-30'>
                  <img
                    src={each.product_image}
                    className='w-full rounded-3xl h-full object-cover'
                    alt=''
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='font-mono'>{each.product_name}</p>
                <p className='font-semibold'>${each.product_total}</p>
              </div>
            </li>
          ))}
        </ul>
        <section className=' max-h-full justify-between flex flex-col'>
          <h2 className='text-lg font-bold mb-2'>Customer Details</h2>

          <section className='rounded-xl shadow-sm pb-2 p-5 gap-3 h-max text-sm  text-slate-500 flex flex-col'>
            <div className='flex gap-5 w-full'>
              <p className='text-sm font-semibold'>Name :</p>
              <p className='text-black'>{data.user.name}</p>
            </div>
            <div className='flex gap-5 w-full'>
              <p className='text-sm font-semibold'> Address : </p>
              <p className='text-black'>{getAddress(data.shippingAddress)}</p>
            </div>
            <div className='flex gap-5 w-full'>
              <p className='text-sm font-semibold'> Email : </p>
              <p className='text-black'>{data.user.email}</p>
            </div>
            <div className='flex gap-5 w-full'>
              <p className='text-sm font-semibold'> Phone : </p>
              <p className='text-black'>{getPhone(data.shippingAddress)}</p>
            </div>
            <div className='flex gap-5 w-full'>
              <p className='text-sm font-semibold'> Order number : </p>
              <p className='text-black'>{data.reference}</p>
            </div>
          </section>
          <h2 className='text-lg font-bold mt-4 mb-2'>Payment Details</h2>
          <section className='flex flex-col  p-5 pb-2 text-sm text-slate-500 gap-3 h-full rounded-xl shadow-sm'>
            <div className='flex gap-2 w-full'>
              <p className='text-sm font-semibold w-max'>Payment Id:</p>
              <p className='text-black truncate w-[60%]'>
                {data?.transactions[0]?.providerReference || 'null'}
              </p>
            </div>
            <div className='flex gap-2 w-full'>
              <p className='text-sm font-semibold'> Date : </p>
              <p className='text-black'>{formatDate(data.updatedAt)}</p>
            </div>
            <div className='flex gap-2 w-full'>
              <p className='text-sm font-semibold'> Transaction : </p>
              <p
                className={` font-bold ${
                  data?.transactions.length > 0
                    ? 'text-green-400'
                    : 'text-red-500'
                } `}
              >
                {data?.transactions.length > 0 ? 'paid' : 'unpaid'}
              </p>
            </div>
            <div className='flex gap-2 w-full'>
              <p className='text-sm font-semibold'> Expected Amount : </p>
              <p className='text-black font-semibold'>${data.totalAmount}</p>
            </div>
            <div className='flex gap-2 w-full'>
              <p className='text-sm font-semibold'> Amount paid :</p>
              <p className='text-black font-semibold'>
                ${data?.transactions[0]?.amount || 0}
              </p>
            </div>
            <div className='flex gap-5 w-full text-black mt-5'>
              <button
                onClick={() => {
                  dispatch(confirmPaymentStatus(data.reference))
                  confirmPayment(data.reference)
                  showConfirmModal(false)
                }}
                className='border p-3 rounded-xl hover:bg-black hover:text-white cursor-pointer border-black grow'
              >
                {data.payment_status === 'confirmed' && 'Refund payment'}
                {data.payment_status === 'pending' && 'Confirm payment'}
              </button>
              <button
                onClick={() => {
                  showConfirmModal(false)
                }}
                className=' p-3 hover:bg-black hover:text-white  border hover:border-0 rounded-xl text-black cursor-pointer border-black grow'
              >
                Back
              </button>
            </div>
          </section>
        </section>
      </section>
    </section>
  )
}
