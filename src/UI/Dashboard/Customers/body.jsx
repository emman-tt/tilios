import { saveCustomers, updateStatus } from '../../../store/store'
import { useSelector, useDispatch } from 'react-redux'
import { headerList } from './headerList'
import { ChevronDown, ChevronUp, Settings } from 'lucide-react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../../../components/Loader'
import { NotFound } from '../../../components/not-found'
import React from 'react'
import { fetchCustomers } from '../../../services/Customers'
export const Body = ({ searchValue }) => {
  const dispatch = useDispatch()
  const { customers, status } = useSelector(state => state.customers)

  const [options, showOptions] = useState({
    id: 0,
    status: false
  })
  const [detailsModal, showDetailsModal] = useState({
    status: false,
    details: {}
  })

  const filteredCustomers = customers.filter(item => {
    return (
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.email.toLowerCase().includes(searchValue.toLowerCase())
    )
  })

  useEffect(() => {
    dispatch(updateStatus('loading'))
    fetchCustomers()
      .then(item => {
        dispatch(saveCustomers(item.customers))
      })
      .catch(err => {
        dispatch(updateStatus('loaded'))
        console.log(err)
      })
  }, [])

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
  return (
    <section
      onClick={() => {
        options.status === true && showOptions({ options, status: false })
      }}
      className='w-full h-full relative shadow-lg overflow-x-auto  [scrollbar-width:thin] p-3  max-sm:p-2 pt-2 rounded-2xl'
    >
      <div className=''>
        <header className='min-w-175 w-full items-center text-xs py-2   font-semibold rounded-xl grid grid-cols-5 bg-[#eef0f2]'>
          {headerList.map(item => (
            <div className='text-center whitespace-nowrap' key={item.id}>
              {item.value}
            </div>
          ))}
        </header>

        {status === 'loading' && (
          <section className='flex relative justify-center items-center h-120 w-full'>
            <Loader />
          </section>
        )}
        {status === 'error' && <div>Error</div>}
        {status === 'loaded' && filteredCustomers.length == 0 && (
          <div className='w-full h-90 flex justify-center items-center pb-20 sm:pb-40 pt-10 sm:pt-40'>
            <NotFound showButton={false} message='No customers found' />
          </div>
        )}
        {status === 'loaded' && customers.length > 0 && (
          <main className='min-w-175 w-full h-max grid grid-cols-5 gap-y-7 mt-5 text-xs shrink-0 font-semibold'>
            {filteredCustomers.reverse().map((item, i) => (
              <React.Fragment key={i}>
                <div className='text-center h-full flex items-center justify-center'>
                  {item.name}
                </div>
                <div className='text-center h-full flex items-center justify-center '>
                  {formatDate(item.createdAt)}
                </div>
                <div className='text-center truncate h-full flex items-center justify-center px-2'>
                  {item.email}
                </div>

                <div className='text-center h-full flex items-center justify-center'>
                  {item.totalOrders}
                </div>

                <div className='flex gap-3 relative h-full items-center w-full justify-center'>
                  <div>
                    {options.status === true && options.id === i ? (
                      <div className='p-2 rounded-lg cursor-pointer items-center bg-gray-100'>
                        <ChevronUp
                          onClick={() =>
                            showOptions({ id: null, status: false })
                          }
                          className='h-5 w-5'
                        />
                      </div>
                    ) : (
                      <div className='p-2 rounded-lg cursor-pointer items-center bg-gray-100'>
                        <ChevronDown
                          onClick={() => showOptions({ id: i, status: true })}
                          className='h-5 w-5'
                        />
                      </div>
                    )}
                  </div>

                  {options.id == i && options.status === true && (
                    <ul className='h-max p-5 pr-2 gap-3 flex text-xs flex-col text-gray-500 absolute rounded-xl -bottom-22 right-0 sm:left-20 z-10 bg-white shadow w-max '>
                      <li
                        onClick={() =>
                          showDetailsModal({ status: true, details: item })
                        }
                        className='list-disc cursor-pointer hover:text-shadow-2xs'
                      >
                        View Details
                      </li>

                      <li className='list-disc text-red-500 cursor-pointer hover:text-shadow-2xs'>
                        Delete Customer
                      </li>
                    </ul>
                  )}
                </div>
              </React.Fragment>
            ))}
          </main>
        )}
      </div>
    </section>
  )
}
