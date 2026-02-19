import { ChevronDown, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import { Body } from './body'

export default function Customers () {
  const [selected, setSelected] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  return (
    <section className='pt-10'>
      <header className='w-full flex items-center justify-end px-15'>
        <div className='text-xs flex gap-3 items-center  mr-20  px-2 sm:w-90 rounded-md border border-[#e6dfd6]  sm:px-3  sm:text-sm relative '>
          <Search />
          <input
            onChange={e => setSearchValue(e.target.value)}
            className='  w-full h-full outline-0  py-2 '
            placeholder='Search by address or order id'
          />
        </div>
      </header>

      <section className=' h-150 px-5 mt-0 p-5'>
        <Body searchValue={searchValue} />
      </section>
    </section>
  )
}
