import { Dot } from 'lucide-react'
import { useState } from 'react'
import { Collectiion } from '../../utils/collection'
import { useProductContext } from '../../context/product'

export default function Collection ({ closeSideBar }) {
  const { state, changeCategory } = useProductContext()
  const [active, isActive] = useState(false)
  const [search, setSearch] = useState('- SEARCH')
  const [nav, setNav] = useState(Collectiion)

  function Selector (key) {
    setNav(prev =>
      prev.map(item =>
        item.id === key
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
    changeCategory(key)
  }

  return (
    <section onClick={() => closeSideBar()} className='py-8'>
      <nav className='flex flex-col lg:flex-row justify-between w-full px-6 md:px-12 items-start lg:items-center gap-8 lg:gap-0'>
        <h2 className='w-full lg:w-[15%] font-mono font-semibold text-sm md:text-base'>
          A WIDE RANGE OF OPTIONS FOR YOUR HOME
        </h2>

        <div className='w-full lg:w-80 flex'>
          <input
            value={search}
            onChange={e => {
              setSearch(e.target.value)
            }}
            type='text'
            placeholder='SEARCH'
            className='border-b-2 border-gray-400 w-full focus:outline-none py-2 font-semibold bg-transparent'
          />
        </div>

        <div className='flex flex-col md:flex-row w-full lg:w-[60%] justify-between gap-6 md:gap-4'>
          <ul className='flex flex-wrap gap-2 lg:justify-around grow'>
            {nav.map(item => (
              <li
                onClick={() => {
                  Selector(item.id)
                }}
                key={item.id}
                style={
                  item.selected
                    ? { backgroundColor: 'black', color: 'white' }
                    : { backgroundColor: '', color: 'black' }
                }
                className='cursor-pointer rounded-full px-4 md:px-5 flex justify-center items-center text-xs md:text-sm h-8 font-light border border-gray-200'
              >
                {item.value}
              </li>
            ))}
          </ul>

          <ul className='flex justify-start md:justify-center gap-4 md:gap-8 w-full md:w-auto lg:w-[35%]'>
            <li className='flex justify-center items-center text-sm md:text-base'>
              <Dot size={24} className='md:size-8.75' />
              Appearance
            </li>
            <li className='flex justify-center items-center text-sm md:text-base'>
              <Dot size={24} className='md:size-8.75' />
              Collection
            </li>
          </ul>
        </div>
      </nav>
    </section>
  )
}
