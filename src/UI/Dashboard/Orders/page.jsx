import { ChevronDown, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import { Body } from './body'
import { fetchOrders } from '../../../services/Order'
import { useDispatch } from 'react-redux'
import { setFilter } from '../../../store/store'
export default function Orders () {
  const [selected, setSelected] = useState(1)
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')

  return (
    <section className='pt-10'>
      <header className='w-full flex items-center justify-between px-15'>
        <ul className='flex gap-9 text-lg font-semibold'>
          <li
            onClick={() => {
              setSelected(1), dispatch(setFilter('all'))
            }}
            className={` border-b-2 pb-1 ${
              selected === 1
                ? 'text-[#5038d9] border-[#5038d9]'
                : 'text-gray-300'
            } cursor-pointer transition-colors `}
          >
            All Orders
          </li>
          <li
            onClick={() => {
              setSelected(2), dispatch(setFilter('pending'))
            }}
            className={` border-b-2 pb-1 ${
              selected === 2
                ? 'text-[#5038d9] border-[#5038d9]'
                : 'text-gray-300'
            } cursor-pointer transition-colors `}
          >
            Pending
          </li>
          <li
            onClick={() => {
              setSelected(3), dispatch(setFilter('dispatched'))
            }}
            className={` border-b-2 pb-1 ${
              selected === 3
                ? 'text-[#5038d9] border-[#5038d9]'
                : 'text-gray-300'
            } cursor-pointer transition-colors `}
          >
            Dispatched
          </li>
          <li
            onClick={() => {
              setSelected(4), dispatch(setFilter('delivered'))
            }}
            className={` border-b-2 pb-1 ${
              selected === 4
                ? 'text-[#5038d9] border-[#5038d9]'
                : 'text-gray-300'
            } cursor-pointer transition-colors `}
          >
            Delivered
          </li>
        </ul>
        <ul>
          <li className='text-xs flex gap-3 items-center  mr-20  px-2 sm:w-90 rounded-md border border-[#e6dfd6]  sm:px-3  sm:text-sm relative '>
            <Search />
            <input
              onChange={e => setSearchValue(e.target.value)}
              className='  w-full h-full outline-0  py-2 '
              placeholder='Search by address or order id'
            />
          </li>
        </ul>
      </header>

      <section className=' h-150 px-5 mt-0 p-5'>
        <Body searchValue={searchValue} />
      </section>
    </section>
  )
}
