import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFetch } from './api/useFetch'
import { useProductList } from '../../../context/productlist'
export default function Pagination () {
  const [entries, setEntries] = useState(10)
  const [entriesBox, showEntriesBox] = useState(false)

  const { state, setParams } = useProductList()
  const { totalPages, currentPage, category, limit } = state

  return (
    <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 justify-between sm:justify-end items-start sm:items-center mt-4 sm:mt-6 md:mt-8 px-3 sm:px-6 md:px-0'>
      <section className='flex gap-2 sm:gap-4 items-center text-xs sm:text-sm'>
        <span>Showing</span>
        <div className='relative cursor-pointer rounded-md border hover:bg-gray-100 border-[#e6dfd6] bg-white'>
          <span
            className='block w-full px-3 sm:px-6 py-2 sm:py-3 font-semibold text-xs sm:text-sm'
            onClick={() => showEntriesBox(e => !e)}
          >
            {limit}
          </span>
          {entriesBox && (
            <div className='absolute -top-20 right-0 rounded-2xl gap-1 px-4 sm:px-7 py-3 sm:py-4 shadow-2xl items-center text-white bg-black flex flex-col font-semibold text-xs sm:text-sm'>
              <div
                className='hover:italic cursor-pointer'
                onClick={() => {
                  setEntries(5)
                  showEntriesBox(false)
                  setParams('limit', 5)
                }}
              >
                5
              </div>
              <div
                className='hover:italic cursor-pointer'
                onClick={() => {
                  setEntries(10), showEntriesBox(false), setParams('limit', 10)
                }}
              >
                10
              </div>
            </div>
          )}
        </div>
        <span>Entries</span>
      </section>

      <section className='flex gap-2 sm:gap-3 md:mr-20'>
        <button
          disabled={currentPage == 1}
          onClick={() => {
            setParams('page', currentPage - 1)
          }}
          className={`w-8 h-8 sm:w-9 sm:h-9 ${
            currentPage == 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
          } rounded-full border border-[#efeadf] flex justify-center items-center bg-white hover:bg-gray-100`}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          disabled={currentPage == totalPages}
          onClick={() => {
            setParams('page', currentPage + 1)
          }}
          className={`w-8 h-8 sm:w-9 sm:h-9 ${
            currentPage == totalPages ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
          } rounded-full border border-[#efeadf] bg-white flex justify-center items-center hover:bg-gray-100`}
        >
          <ChevronRight size={20} />
        </button>
      </section>
    </div>
  )
}
