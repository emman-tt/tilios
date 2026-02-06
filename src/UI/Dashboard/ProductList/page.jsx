import { useMemo } from 'react'

export default function ProductList () {
  const rows = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: 1234 + i,
        name: 'Yellow Chair',
        status: 'Shipped',
        quantity: 1270,
        sales: 70
      })),
    []
  )

  return (
    <section className='p-6 '>
      <div className='flex justify-between items-center gap-3 mb-4'>
        <div className=''>
          Showing{' '}
          <select className='px-2 py-1 rounded-md border border-[#e6dfd6] bg-white'>
            <option>10</option>
            <option>25</option>
          </select>{' '}
          Entries
        </div>
        <div className='flex gap-2 items-center'>
          <select className='px-3 py-2 rounded-md border border-[#e6dfd6] bg-white text-sm'>
            <option>Choose Status</option>
          </select>
          <select className='px-3 py-2 rounded-md border border-[#e6dfd6] bg-white text-sm'>
            <option>Month</option>
          </select>
          <select className='px-3 py-2 rounded-md border border-[#e6dfd6] bg-white text-sm'>
            <option>Date</option>
          </select>
          <select className='px-3 py-2 rounded-md border border-[#e6dfd6] bg-white text-sm'>
            <option>Year</option>
          </select>
          <input
            className='px-3 py-2 rounded-md border border-[#e6dfd6]'
            placeholder='Search'
          />
        </div>
      </div>

      <h3 className='text-[#7b5d2b] mt-3 mb-4 text-lg font-semibold'>
        Order List
      </h3>

      <div className='overflow-auto rounded-lg'>
        <table className='w-full bg-white border-collapse'>
          <thead>
            <tr>
              <th className='text-left px-4 py-3 border-b-2 border-[#efe7db] text-[#6b5d4a] font-semibold'>
                Product Name
              </th>
              <th className='text-left px-4 py-3 border-b-2 border-[#efe7db] text-[#6b5d4a] font-semibold'>
                Product ID
              </th>
              <th className='text-left px-4 py-3 border-b-2 border-[#efe7db] text-[#6b5d4a] font-semibold'>
                Status
              </th>
              <th className='text-left px-4 py-3 border-b-2 border-[#efe7db] text-[#6b5d4a] font-semibold'>
                Quantity
              </th>
              <th className='text-left px-4 py-3 border-b-2 border-[#efe7db] text-[#6b5d4a] font-semibold'>
                Sales
              </th>
              <th className='px-4 py-3 border-b-2 border-[#efe7db]' />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td className='px-4 py-4 border-b border-[#f1eae0] text-[#6b5d4a]'>
                  {r.name}
                </td>
                <td className='px-4 py-4 border-b border-[#f1eae0]'>{r.id}</td>
                <td className='px-4 py-4 border-b border-[#f1eae0] text-[#9b8f7b]'>
                  {r.status} <span className='ml-2 text-[#c9bfae]'>▾</span>
                </td>
                <td className='px-4 py-4 border-b border-[#f1eae0]'>
                  {r.quantity}
                </td>
                <td className='px-4 py-4 border-b border-[#f1eae0]'>
                  {r.sales}
                </td>
                <td className='px-4 py-4 border-b border-[#f1eae0]'>
                  <button className='bg-white border border-[#c9bfae] text-[#6b5d4a] px-3 py-1 rounded-md'>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex gap-2 justify-end items-center mt-4'>
        <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white text-[#b59f86] hover:bg-[#f6efe6]'>
          ‹
        </button>
        <button className='w-9 h-9 rounded-full border border-[#d6c8b2] bg-[#f6efe6] text-[#b59f86]'>
          1
        </button>
        <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white text-[#b59f86] hover:bg-[#f6efe6]'>
          2
        </button>
        <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white text-[#b59f86] hover:bg-[#f6efe6]'>
          3
        </button>
        <button className='w-9 h-9 rounded-full border border-[#efeadf] bg-white text-[#b59f86] hover:bg-[#f6efe6]'>
          ›
        </button>
      </div>
    </section>
  )
}
