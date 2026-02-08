import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFetch } from './api/useFetch'
import { useProductList } from '../../../context/productlist'
export default function Pagination () {
  const [entries, setEntries] = useState(10)
  const [entriesBox, showEntriesBox] = useState(false)
  const { fetchProducts } = useFetch()
  const { state } = useProductList()
  const { totalPages, currentPage } = state
  return (
    <div className='flex gap-10 justify-end items-center mt-8'>
      <section className='flex gap-4 items-center '>
        Showing
        <div className=' relative cursor-pointer  rounded-md border hover:bg-gray-100 border-[#e6dfd6] bg-white'>
          <span
            className='w-full px-6 py-3 font-semibold '
            onClick={() => showEntriesBox(e => !e)}
          >
            {entries}
          </span>
          {entriesBox && (
            <div className='absolute -top-20 right-0 rounded-2xl gap-1  px-7 py-4 shadow-2xl  items-center text-white bg-black flex flex-col font-semibold'>
              <div
                onClick={() => {
                  setEntries(5)
                  showEntriesBox(false)
                }}
              >
                5
              </div>
              <div
                onClick={() => {
                  setEntries(10), showEntriesBox(false)
                }}
              >
                10
              </div>
            </div>
          )}
        </div>
        Entries
      </section>

      <section className='flex gap-3 mr-20'>
        <button
          disabled={currentPage == 1}
          onClick={() => fetchProducts(currentPage - 1)}
          className={`w-9 h-9 ${
            currentPage == 1 ? 'opacity-40' : ''
          } rounded-full border border-[#efeadf] flex justify-center items-center bg-white  hover:bg-gray-100`}
        >
          <ChevronLeft />
        </button>
        {/* <button className='w-9 h-9 rounded-full border border-[#d6c8b2] bg-[#f6efe6] '>
          1
        </button>
        <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white  hover:bg-[#f6efe6]'>
          2
        </button>
        <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white  hover:bg-[#f6efe6]'>
          3
        </button> */}
        <button
          disabled={currentPage == totalPages}
          onClick={() => fetchProducts(currentPage + 1)}
          className={`w-9 h-9 ${
            currentPage == totalPages ? 'opacity-30' : ''
          } rounded-full border border-[#efeadf] bg-white flex justify-center items-center  hover:bg-gray-100`}
        >
          <ChevronRight size={30} />
        </button>
      </section>
    </div>
  )
}
