import { ChevronDown } from 'lucide-react'
import { ListFilterIcon } from 'lucide-react'
import { lazy, useEffect, useMemo, useState } from 'react'
import { Collectiion } from '../../../utils/collection'
import { ProductEditor } from './ProductEditor'
import Pagination from './Pagination'
import { NavLink } from 'react-router-dom'
import { useFetch } from './api/useFetch'
import { useProductList } from '../../../context/productlist'
import { NotFound } from './not-found'
import Loader from '../../Login/Loader'
export default function ProductList () {
  const [categoryBox, showCategoryBox] = useState(false)
  const [category, setCategory] = useState(Collectiion)
  const [currentCategory, setCurrentCategory] = useState(category[0].value)
  const { state, editorMode, closeEditor } = useProductList()
  const { showEditor, productList, status } = state
  const { fetchProducts } = useFetch()

  useEffect(() => {
    fetchProducts()
  }, [])

  if (status === 'loading') {
    return (
      <section className='flex relative justify-center items-center h-full w-full'>
        <Loader />
      </section>
    )
  }

  return (
    <section className='p-6 pr-10 relative h-full '>
      {/*Editor Sidebar */}
      {showEditor && <ProductEditor />}

      <div className='flex justify-end items-center gap-3 mb-4'>
        <div className='flex gap-7 items-center'>
          <section className='flex gap-3 items-center'>
            <span>
              <ListFilterIcon size={17} />
            </span>
            <p>Filter</p>
          </section>
          <section>
            <div className=' text-sm   relative rounded-2xl  border  border-gray-500'>
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
            </div>
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
          <tbody className='font-semibold text-sm'>
            {productList.length === 0 || !productList ? (
              <tr>
                <td colSpan='7'>
                  <div className='w-full h-full flex justify-center pb-40 pt-20 '>
                    <NotFound />
                  </div>
                </td>
              </tr>
            ) : (
              productList.map((item, idx) => (
                <tr key={idx}>
                  <td className='px-4 py-4 border-b  flex gap-3 items-center  border-[#f7f7f7] '>
                    <div className='h-10 w-10  '>
                      <img
                        src={item.image}
                        alt=''
                        className='rounded-lg w-full h-full object-cover'
                      />
                    </div>

                    <span>{item.name}</span>
                  </td>
                  <td className='px-4 py-4 pl-7  border-b border-[#f7f7f7]'>
                    {item.id}
                  </td>
                  <td className='px-4 py-4 pl-7  border-b border-[#f7f7f7] '>
                    {item.amount}
                  </td>
                  <td className='px-4 py-4 pl-7 border-b border-[#f7f7f7]'>
                    {item.stock}
                  </td>
                  <td className='px-4 py-4 pl-7  border-b border-[#f7f7f7]'>
                    {item.saleProducts.sold_units}
                  </td>
                  <td className='px-4 py-4  border-b border-[#f7f7f7]'>
                    {category
                      .find(cat => cat.id === item.categoryId)
                      .value.toLocaleLowerCase()}
                  </td>
                  <td className='px-4 py-4 border-b border-[#f7f7f7]'>
                    <button
                      onClick={() => {
                        editorMode({
                          name: item.name,
                          price: item.amount,
                          stock: item.stock,
                          category: category
                            .find(cat => cat.id === item.categoryId)
                            .value.toLocaleLowerCase(),
                          discount: item.discount,
                          image: item.image
                        })
                      }}
                      className='bg-white border hover:bg-gray-50 cursor-pointer border-[#c9bfae]  px-3 py-1 rounded-md'
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </section>
  )
}
