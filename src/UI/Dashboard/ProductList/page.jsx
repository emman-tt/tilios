import { ChevronDown, ChevronLeft, ChevronRight, XIcon } from 'lucide-react'
import { ListFilterIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Collectiion } from '../../../utils/collection'
export default function ProductList () {
  const rows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: 1234 + i,
        name: 'Yellow Chair',
        price: 45,
        status: 'Shipped',
        category: 'ceramic',
        quantity: 1270,
        sales: 70
      })),
    []
  )

  const [entries, setEntries] = useState(10)
  const [entriesBox, showEntriesBox] = useState(false)
  const [categoryBox, showCategoryBox] = useState(false)
  const [category, setCategory] = useState(Collectiion)
  const [currentCategory, setCurrentCategory] = useState(category[0].value)

  return (
    <section className='p-6 pr-10 relative h-full '>
      {/* Sidebar */}
      <ProductEditor />
      <div className='flex justify-end items-center gap-3 mb-4'>
        <div className='flex gap-7 items-center'>
          <section className='flex gap-3 items-center'>
            <span>
              <ListFilterIcon size={17} />
            </span>
            <p>Filter</p>
          </section>
          <section>
            <p className=' text-sm   relative rounded-2xl  border  border-gray-500'>
              <div
                onClick={() => showCategoryBox(true)}
                className='p-2 px-2 gap-5 flex cursor-pointer hover:bg-gray-50 rounded-2xl justify-between items-center'
              >
                {currentCategory.toLowerCase() === 'all'
                  ? 'Category'
                  : currentCategory}
                <span>{<ChevronDown size={15} />}</span>
              </div>
              {categoryBox && (
                <div className='absolute -bottom-40  z-30 right-0 rounded-2xl gap-3  px-8 py-3   items-center text-white bg-black flex flex-col'>
                  {category
                    .filter(item => item.id > 0)
                    .map(item => (
                      <div
                        className='cursor-pointer hover:italic'
                        onClick={() => {
                          showCategoryBox(false), setCurrentCategory(item.value)
                        }}
                        key={item.id}
                      >
                        {item.value}
                      </div>
                    ))}
                </div>
              )}
            </p>
          </section>

          <input
            className='px-3 py-2 w-100 rounded-md border border-[#e6dfd6]'
            placeholder='Search'
          />
        </div>
      </div>

      <div className=' overflow-auto rounded-4xl [scrollbar-width:none] p-12 pl-20 pt-0 shadow-xl h-140'>
        <table className='w-full bg-white  relative mt-2 '>
          <thead className='sticky    z-20 text-black bg-[#eef0f2]   top-0 w-full '>
            <tr className='h-7 bg-white'>
              <td colSpan='7'></td>
            </tr>
            <tr className='h-10 '>
              <th className='text-left px-4 rounded-l-3xl   border-b-0 border-[#efe7db]  font-semibold'>
                Product Name
              </th>
              <th className='text-left px-4  border-b-0 border-[#efe7db]  font-semibold'>
                Product ID
              </th>
              <th className='text-left px-4  border-b-0 border-[#efe7db]  font-semibold'>
                Price(per ft)
              </th>
              <th className='text-left px-4  border-b-0 border-[#efe7db]  font-semibold'>
                Stock qty
              </th>
              <th className='text-left px-4  border-b-0 border-[#efe7db]  font-semibold'>
                Sold units
              </th>
              <th className='text-left px-4  border-b-0 border-[#efe7db]  font-semibold'>
                Category
              </th>
              <th className='px-4  border-b-0 rounded-r-3xl border-[#efe7db]' />
            </tr>
            <tr className='h-6 bg-white'>
              <td colSpan='7 px-4'></td>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td className='px-4 py-4 border-b  border-[#f7f7f7] '>
                  {r.name}
                </td>
                <td className='px-4 py-4 border-b border-[#f7f7f7]'>{r.id}</td>
                <td className='px-4 py-4 border-b border-[#f7f7f7] '>
                  {r.price}
                </td>
                <td className='px-4 py-4 border-b border-[#f7f7f7]'>
                  {r.quantity}
                </td>
                <td className='px-4 py-4 border-b border-[#f7f7f7]'>
                  {r.sales}
                </td>
                <td className='px-4 py-4 border-b border-[#f7f7f7]'>
                  {r.category}
                </td>
                <td className='px-4 py-4 border-b border-[#f7f7f7]'>
                  <button className='bg-white border border-[#c9bfae]  px-3 py-1 rounded-md'>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex gap-10 justify-end items-center mt-8'>
        <section className='flex gap-4 items-center '>
          Showing
          <div className=' relative cursor-pointer  rounded-md border border-[#e6dfd6] bg-white'>
            <span
              className='w-full px-6 py-3 font-semibold '
              onClick={() => showEntriesBox(true)}
            >
              {entries}
            </span>
            {entriesBox && (
              <div className='absolute -top-25 right-0 rounded-2xl gap-1  px-8 py-7 shadow-2xl  items-center text-white bg-black flex flex-col'>
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
                <div
                  onClick={() => {
                    setEntries(15), showEntriesBox(false)
                  }}
                >
                  15
                </div>
              </div>
            )}
          </div>
          Entries
        </section>

        <section className='flex gap-3'>
          <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white  hover:bg-[#f6efe6]'>
            <ChevronLeft />
          </button>
          <button className='w-9 h-9 rounded-full border border-[#d6c8b2] bg-[#f6efe6] '>
            1
          </button>
          <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white  hover:bg-[#f6efe6]'>
            2
          </button>
          <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white  hover:bg-[#f6efe6]'>
            3
          </button>
          <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white  hover:bg-[#f6efe6]'>
            <ChevronRight />
          </button>
        </section>
      </div>
    </section>
  )
}

export const ProductEditor = ({ className }) => {
  return (
    <section
      className={`w-170 shadow-2xl h-full absolute right-0 bg-white z-32 top-0 bottom-0 ${className}`}
    ></section>
  )
}
