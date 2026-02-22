import { fetchOrders } from '../../../services/Order'
import { saveOrders, setStatus } from '../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { headerList } from './headerList'
import { ChevronDown, ChevronUp, Settings } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../../../components/Loader'
import { NotFound } from '../../../components/not-found'
import ConfirmPayment from './Modals/confimPayment'
import React from 'react'
import { markOrderDelivered } from '../../../services/Order'
import { markDelivered, confirmPaymentStatus } from '../../../store/store'
export const Body = ({ searchValue }) => {
  const dispatch = useDispatch()
  const { orders, status, filter } = useSelector(state => state.orders)
  const [options, showOptions] = useState({
    id: 0,
    status: false
  })
  const [count, setCount] = useState(1)
  const [confirmModal, showConfirmModal] = useState({
    status: false,
    details: {}
  })

  const filteredOrders = orders.filter(item => {
    const address = getAddress(item.shippingAddress).toLowerCase()

    return (
      item.reference.toLowerCase().includes(searchValue.toLowerCase()) ||
      address.includes(searchValue.toLowerCase())
    )
  })

  useEffect(() => {
    dispatch(setStatus('loading'))
    fetchOrders(filter)
      .then(item => {
        dispatch(saveOrders(item.orders))
      })
      .catch(err => {
        dispatch(setStatus('loaded'))
        console.log(err)
      })
  }, [filter])

  function getAddress (item) {
    const arr = item.split(',')
    const address = `${arr[0]},${arr[1]},${arr[2]}`
    return address
  }

  function formatDate (rawDate) {
    const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return formattedDate
  }

  function markOrderStatusDelivered (id) {
    dispatch(markDelivered(id))
    markOrderDelivered(id)
  }

  return (
    <section
      onClick={() => {
        options.status === true && showOptions({ options, status: false })
      }}
      className='w-full h-full relative  shadow-lg   p-5 max-sm:p-2   overflow-hidden pt-2 rounded-2xl'
    >
      <div className='overflow-x-auto [scrollbar-width:thin] '>
        <div className='min-w-[700px]  w-full'>
          <header className='min-w-250 w-full items-center  text-xs py-2 font-semibold rounded-xl grid grid-cols-8 bg-[#eef0f2]'>
            {headerList.map(item => (
              <div className='text-center whitespace-nowrap' key={item.id}>
                {item.value}
              </div>
            ))}
          </header>

          {confirmModal.status && (
            <div className='fixed inset-0 backdrop-blur-sm bg-[#1a191948] z-15'></div>
          )}

          {/* Confirm Payment Modal */}
          {confirmModal.status && (
            <ConfirmPayment
              dispatch={dispatch}
              setCount={setCount}
              confirmPaymentStatus={confirmPaymentStatus}
              data={confirmModal.details}
              showConfirmModal={showConfirmModal}
            />
          )}

          {status === 'loading' && (
            <section className='flex relative justify-center items-center h-120 w-full'>
              <Loader />
            </section>
          )}
          {status === 'error' && <div>Error</div>}
          {status === 'loaded' && filteredOrders.length === 0 && (
            <div className='w-full h-90 flex justify-center items-center pb-20 sm:pb-40 pt-10 sm:pt-40'>
              <NotFound showButton={false} message='No orders found' />
            </div>
          )}
          {status === 'loaded' && orders.length > 0 && (
            <main className='min-w-250 w-full h-max grid   grid-cols-8 gap-y-8 mt-5 text-xs shrink-0 font-semibold'>
              {filteredOrders.reverse().map((item, i) => (
                <React.Fragment key={item.reference}>
                  <div className='text-center h-full flex items-center justify-center'>
                    {i + 1}) {item.reference}
                  </div>
                  <div className='text-center h-full flex items-center justify-center '>
                    {item.user.name}
                  </div>
                  <div className='text-center truncate h-full flex items-center justify-center px-2'>
                    {getAddress(item.shippingAddress)}
                  </div>
                  <div className='text-center h-full flex items-center justify-center'>
                    {formatDate(item.updatedAt)}
                  </div>
                  <div className='text-center h-full flex items-center justify-center'>
                    {item.totalAmount}
                  </div>
                  <div
                    className={`text-center h-full flex items-center justify-center ${
                      item.payment_status === 'confirmed'
                        ? 'text-green-400'
                        : item.payment_status === 'pending'
                        ? 'text-[#fecd0b]'
                        : 'text-red-500'
                    } `}
                  >
                    {item.payment_status}
                  </div>
                  <div
                    className={`text-center h-full flex items-center justify-center ${
                      item.order_status === 'delivered'
                        ? 'text-green-400'
                        : item.order_status === 'pending'
                        ? 'text-[#ffd52d]'
                        : item.order_status === 'dispatched'
                        ? 'text-blue-800'
                        : 'text-red-500'
                    } `}
                  >
                    {item.order_status}
                  </div>

                  <div className='flex gap-3 relative h-full items-center w-full justify-center'>
                    <div>
                      {options.status === true && options.id === i ? (
                        <div className='p-1 rounded-lg cursor-pointer items-center bg-gray-100'>
                          <ChevronUp
                            onClick={() =>
                              showOptions({ id: null, status: false })
                            }
                            className='h-5 w-5'
                          />
                        </div>
                      ) : (
                        <div className='p-1 rounded-lg cursor-pointer items-center bg-gray-100'>
                          <ChevronDown
                            onClick={() => showOptions({ id: i, status: true })}
                            className='h-5 w-5'
                          />
                        </div>
                      )}
                    </div>

                    {options.id == i && options.status === true && (
                      <ul className='h-max p-5 pr-2 gap-2 flex text-xs flex-col text-gray-500 absolute rounded-xl -bottom-34 right-7 sm:left-2 z-50 bg-white shadow w-max '>
                        <li
                          onClick={() =>
                            showConfirmModal({ status: true, details: item })
                          }
                          className='list-disc cursor-pointer hover:text-shadow-2xs'
                        >
                          View Details
                        </li>

                        <li
                          onClick={() => {
                            markOrderStatusDelivered(item.reference)
                          }}
                          className='list-disc cursor-pointer hover:text-shadow-2xs'
                        >
                          Mark Delivered
                        </li>
                        <li className='list-disc cursor-pointer hover:text-shadow-2xs'>
                          Refund Payment
                        </li>
                        <li className='list-disc text-red-500 cursor-pointer hover:text-shadow-2xs'>
                          Delete Order
                        </li>
                      </ul>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </main>
          )}
        </div>
      </div>
    </section>
  )
}
