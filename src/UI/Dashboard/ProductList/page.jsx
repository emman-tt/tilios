import { ChevronDown, ChevronUpCircle } from 'lucide-react'
import { ListFilterIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { Collectiion } from '../../../utils/collection'
import { ProductEditor } from './ProductEditor'
import Pagination from './Pagination'
import { NavLink } from 'react-router-dom'
import { useFetch } from './api/useFetch'
import { useProductList } from '../../../context/productlist'
import { NotFound } from './not-found'
import Loader from '../../Login/Loader'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import DeleteModal from './DeleteModal'
import Overlay from '../../../components/Overlay'

export default function ProductList () {
  const [categoryBox, showCategoryBox] = useState(false)
  const [categoryArray, setCategoryArray] = useState(Collectiion)
  const [currentCategory, setCurrentCategory] = useState(categoryArray[0].value)
  const {
    state,
    editorMode,
    closeEditor,
    setParams,
    deleteMode,
    deleteProduct
  } = useProductList()
  const { showEditor, productList, status, currenPage, showDeleteModal } = state
  const { fetchProducts } = useFetch()
  const [searchValue, setSearchValue] = useState('')

  const containerRef = useRef(null)

  const filteredProductList = productList.filter(item => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase())
  })

  function findCategory (id) {
    const cat = categoryArray
      .find(cat => cat.id === id)
      .value.toLocaleLowerCase()

    return cat
  }
  return (
    <section
      ref={containerRef}
      className='p-2 sm:p-6 md:pr-10  h-full overflow-hidden flex flex-col'
    >
      {/*Editor Sidebar */}
      {showEditor && <ProductEditor />}

      {showEditor && (
        <div className='fixed inset-0 backdrop-blur-sm  bg-[#1a191948] z-25'></div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          categoryArray={categoryArray}
          deleteProduct={deleteProduct}
          deleteMode={deleteMode}
        />
      )}

      {/* Delte Modal Overlay */}
      {showDeleteModal && (
        <div className='fixed inset-0 backdrop-blur-sm  bg-[#1a191948] z-25'></div>
      )}

      <div className='flex flex-col sm:flex-row justify-end items-start sm:items-center gap-3 mb-4 flex-wrap'>
        <div className='flex max-sm:items-center  sm:flex-row gap-3 sm:gap-7 items-start sm:items-center w-full sm:w-auto'>
          <section className='flex gap-2 sm:gap-3  items-center text-xs sm:text-sm'>
            <span>
              <ListFilterIcon size={16} />
            </span>
            <p>Filter</p>
          </section>
          <section>
            <div className='text-xs sm:text-sm relative rounded-2xl border border-gray-500'>
              <div
                onClick={() => showCategoryBox(e => !e)}
                className='p-2 px-2 gap-3 sm:gap-5 flex cursor-pointer hover:bg-gray-50 rounded-2xl justify-between items-center'
              >
                <span className='truncate'>
                  {currentCategory.toLowerCase() === 'all'
                    ? 'Category'
                    : currentCategory}
                </span>
                <span>
                  {categoryBox ? (
                    <ChevronUpCircle size={15} />
                  ) : (
                    <ChevronDown size={15} />
                  )}
                </span>
              </div>
              {categoryBox && (
                <div className='absolute -bottom-45 max-sm:-bottom-38 z-30 right-0 rounded-2xl gap-3 px-4 sm:px-8 py-3 items-center text-white bg-black flex flex-col text-xs sm:text-sm'>
                  {categoryArray.map(item => (
                    <div
                      className='cursor-pointer hover:italic'
                      onClick={() => {
                        showCategoryBox(false),
                          setCurrentCategory(item.value),
                          setParams('category', item.id)
                        fetchProducts(currenPage, item.id)
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
            onChange={e => setSearchValue(e.target.value)}
            className='px-2 sm:px-3 py-2 w-full sm:w-100 rounded-md border border-[#e6dfd6] text-xs sm:text-sm'
            placeholder='Search by product name '
          />
        </div>
      </div>

      <div className='  rounded-4xl overflow-y-hidden p-0 sm:p-6 md:pt-15 lg:p-12  lg:pl-0 lg:pb-5 xl:pl-10  md:pl-2  shadow flex-1 relative   pt-12  lg:pr-0 max-sm:rounded-xl'>
        <div
          className='absolute   left-0 right-0 z-20 top-0 rounded-t-xl bg-[#eef0f2] grid grid-cols-5 sm:grid-cols-7
         md:grid-cols-10 lg:grid-cols-9 xl:grid-cols-9 gap-0  font-semibold text-xs sm:text-sm '
        >
          <div className='text-left max-sm:pl-12 col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 md:pl-10 xl:pl-20 px-2 sm:px-4 py-3 sm:py-4 rounded-l-3xl max-[330px]:pl-0 border-b border-[#efe7db] whitespace-nowrap'>
            Product Name
          </div>
          <div className='text-left px-2 sm:px-4 py-3 sm:py-4 border-b border-[#efe7db] whitespace-nowrap hidden sm:block'>
            Price
          </div>
          <div className='text-left px-2 sm:px-4 py-3 sm:py-4 border-b border-[#efe7db] max-sm:hidden whitespace-nowrap'>
            Stock
          </div>
          <div className='text-left px-2 sm:px-4 py-3 sm:py-4 border-b border-[#efe7db] whitespace-nowrap hidden md:block'>
            Product ID
          </div>
          <div className='text-left px-2 sm:px-4 py-3 sm:py-4 border-b border-[#efe7db] whitespace-nowrap hidden md:block'>
            Sold units
          </div>
          <div className='text-left px-2 sm:px-4 py-3 sm:py-4 border-b border-[#efe7db] whitespace-nowrap  lg:block'>
            Category
          </div>
          <div className='px-2  max-lg:px-0    sm:px-4 py-3 sm:py-4 border-b border-[#efe7db] rounded-r-3xl'></div>
        </div>

        {/* Body Rows */}
        <div className=' overflow-y-scroll h-full w-full [scrollbar-width:thin]'>
          <div className='font-semibold text-xs sm:text-sm'>
            {status === 'loading' ? (
              <section className='flex relative  justify-center items-center h-120 w-full'>
                <Loader />
              </section>
            ) : filteredProductList.length === 0 || !productList ? (
              <div className='col-span-full'>
                <div className='w-full h-full flex justify-center pb-20 sm:pb-40 pt-10 sm:pt-20'>
                  <NotFound />
                </div>
              </div>
            ) : (
              filteredProductList.map((item, idx) => (
                <div
                  key={idx}
                  className='grid grid-cols-5  md:grid-cols-10 lg:grid-cols-9 xl:grid-cols-9 gap-0 border-b border-[#f7f7f7] hover:bg-gray-50 transition-colors'
                >
                  <div className='px-2 col-span-2 lg:col-span-2 md:col-span-2 xl:col-span-2 sm:px-4 py-2 sm:py-4 flex gap-2 sm:gap-3 items-center'>
                    <div className='h-8 sm:h-10 w-8 sm:w-10 shrink-0'>
                      <img
                        src={item.image}
                        alt=''
                        className='rounded-lg w-full h-full object-cover'
                      />
                    </div>
                    <span className='truncate text-xs sm:text-sm'>
                      {item.name}
                    </span>
                  </div>

                  <div className='px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm hidden sm:block'>
                    {item.amount}
                  </div>

                  <div className='px-2 sm:px-4 py-2 sm:py-4 text-xs max-sm:hidden sm:text-sm'>
                    {item.stock}
                  </div>

                  <div className='px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm hidden md:block'>
                    {item.id}
                  </div>

                  <div className='px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm  hidden   md:block'>
                    {item.saleProducts.sold_units}
                  </div>

                  <div className='px-2 sm:px-4 py-5 sm:py-4   text-xs sm:text-sm  lg:block'>
                    {findCategory(item.categoryId)}
                  </div>

                  <div className='px-2 sm:px-4 py-2 sm:py-4 '>
                    <div className='flex gap-1 sm:gap-3 flex-row  sm:flex-row'>
                      <button
                        onClick={() => {
                          editorMode({
                            name: item.name,
                            price: item.amount,
                            stock: item.stock,
                            serverCategory: item.categoryId,
                            categoryValue: categoryArray
                              .find(cat => cat.id === item.categoryId)
                              .value.toLocaleLowerCase(),
                            discount: item.discount,
                            image: item.image,
                            productId: item.id
                          })
                        }}
                        className='bg-white border hover:bg-gray-50 cursor-pointer border-[#c9bfae] px-1 sm:px-3 py-1 rounded-md text-xs sm:text-sm max-sm:py-2 whitespace-nowrap'
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => {
                          deleteMode(true, item)
                        }}
                        className='bg-red-300 max-sm:bg-red-500 text-white rounded-xl hover:bg-red-500 cursor-pointer px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm whitespace-nowrap max-sm:rounded'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Pagination />
    </section>
  )
}
