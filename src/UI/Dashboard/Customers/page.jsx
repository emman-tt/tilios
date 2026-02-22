import { ChevronDown, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import { Body } from './body'

export default function Customers () {
  const [selected, setSelected] = useState(1)
  const [searchValue, setSearchValue] = useState('')

  return (
    <section className='pt-10 max-sm:pb-15'>
      <header className='w-full flex items-center justify-end px-4 sm:px-15'>
        <div className='text-xs flex gap-3 items-center mr-0 sm:mr-20 px-2 w-full sm:w-90 rounded-md border border-[#e6dfd6] sm:px-3 sm:text-sm relative'>
          <Search />
          <input
            onChange={e => setSearchValue(e.target.value)}
            className='w-full h-full outline-0 py-3'
            placeholder='Search by address or order id'
          />
        </div>
      </header>

      <section className='mt-0 p-4 sm:p-5'>
        <Body searchValue={searchValue} />
      </section>
    </section>
  )
}
