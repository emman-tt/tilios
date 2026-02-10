import { useRef, useState } from 'react'
import { useAddProduct } from '../../../context/add-product'
import { toast } from 'sonner'
export default function AddProduct () {
  const [selectedFile, setSelectedFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [isSelected, setIsSelected] = useState(false)
  const { state, handleInput,addProduct } = useAddProduct()
  const { title, category, image, stock, discount, price } = state

  const fileInputRef = useRef(null)

  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const handleFileChange = e => {
    const file = e.target.files[0]
    console.log(e.target.files)

    if (file) {
      setFileName(file.name)
      setIsSelected(true)
      const imageUrl = URL.createObjectURL(file)
      console.log(imageUrl)
      setSelectedFile(imageUrl)
      handleInput('image', imageUrl)
    }
  }

  function validateFieldsAndSubmit () {
    if (category < 1 || stock < 1 || !image.trim() || !title.trim() || !price) {
      return toast.error('Some required fields are missing')
    }
    console.log('called')
    addProduct()
  }

  return (
    <section className='h-full w-full pt-5 p-4 sm:p-6 md:p-10 overflow-y-auto'>
      <h2 className='text-lg sm:text-xl font-semibold'>Add Products</h2>

      <section className='flex flex-col lg:flex-row gap-6 sm:gap-10 md:gap-20 p-4 sm:p-6 md:p-10'>
        <div className='flex flex-col grow gap-6 sm:gap-8 md:gap-10 w-full lg:w-auto'>
          <div>
            <p className='text-sm sm:text-base md:text-lg font-semibold pl-3'>Title</p>
            <input
              value={title}
              onChange={e => handleInput('title', e.target.value)}
              type='text'
              className='border hover:outline-none w-full mt-1 p-2 text-sm border-gray-500 rounded-lg'
              name=''
              id=''
            />
          </div>
          <div>
            <p className='text-sm sm:text-base md:text-lg font-semibold pl-3'>Category</p>
            <select
              value={category}
              onChange={e => {
                handleInput('category', e.target.value)
              }}
              className='w-full mt-1 p-2 text-sm border-gray-500 rounded-lg border'
            >
              <option value={1}>Ceramic</option>
              <option value={2}>Porcelain</option>
              <option value={3}>Stone</option>
              <option value={4}>Glass</option>
            </select>
          </div>

          <div>
            <p className='text-sm sm:text-base md:text-lg font-semibold pl-3'>Price(per ft)</p>
            <input
              value={price}
              onChange={e => handleInput('price', e.target.value)}
              type='number'
              name=''
              className='border hover:outline-none w-full mt-1 p-2 text-sm border-gray-500 rounded-lg'
              id=''
            />
          </div>

          <div>
            <p className='text-sm sm:text-base md:text-lg font-semibold pl-3'>Stock</p>
            <input
              value={stock}
              onChange={e => {
                handleInput('stock', e.target.value)
              }}
              type='number'
              name=''
              className='border hover:outline-none w-full mt-1 p-2 text-sm border-gray-500 rounded-lg'
              id=''
            />
          </div>
          <div>
            <p className='text-sm sm:text-base md:text-lg font-semibold pl-3'>
              Discount ( if any in percent %)
            </p>
            <input
              value={discount}
              onChange={e => handleInput('discount', e.target.value)}
              type='number'
              name=''
              className='border hover:outline-none w-full mt-1 p-2 text-sm border-gray-500 rounded-lg'
              id=''
            />
          </div>
        </div>

        <div className='w-full lg:w-[50%] h-full relative flex flex-col gap-6 sm:gap-8 md:gap-10'>
          <div className='h-full'>
            <div className='flex justify-between w-full'>
              <p className='text-sm sm:text-base md:text-lg font-semibold pl-3'>Media</p>

              {isSelected && (
                <button
                  onClick={() => {
                    setIsSelected(false), removeFile()
                  }}
                  className='p-2 font-semibold text-xs sm:text-sm relative z-10 cursor-pointer bg-gray-50 rounded-2xl px-4 sm:px-7'
                >
                  Clear
                </button>
              )}
            </div>

            <div className='flex flex-col bg-[#e6ecf5ac] items-center justify-center rounded-xl mt-4 sm:mt-5 h-52 sm:h-60 md:h-70'>
              {!isSelected ? (
                <>
                  <svg
                    className='w-6 sm:w-8 h-6 sm:h-8 mb-3 sm:mb-4 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    />
                  </svg>
                  <p className='mb-2 text-xs sm:text-sm text-gray-500 font-semibold px-2 text-center'>
                    Click to upload photo
                  </p>
                  <p className='text-xs text-gray-400 px-2 text-center'>
                    PNG or JPG (MAX. 800x400px)
                  </p>
                </>
              ) : (
                <div className='flex justify-center h-full gap-3 sm:gap-5 w-full items-center px-2'>
                  <section className='flex flex-col gap-2 w-full'>
                    <div className='h-40 sm:h-52 md:h-60 w-full'>
                      <img
                        src={selectedFile}
                        className='h-full object-cover rounded-xl w-full'
                        alt=''
                      />
                    </div>
                    <p className='text-xs sm:text-sm truncate'>{fileName}</p>
                  </section>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              disabled={isSelected}
              type='file'
              accept='image/*'
              className='absolute top-0 left-0 right-0 h-[60%] w-full opacity-0 cursor-pointer'
              onChange={e => handleFileChange(e)}
            />
          </div>
          <button
            onClick={() => {
              validateFieldsAndSubmit()
            }}
            className='p-2 sm:p-3 px-6 sm:px-15 cursor-pointer mt-4 sm:mt-6 md:mt-10 hover:bg-[#fdc886] border rounded-xl flex self-center text-sm sm:text-base font-medium'
          >
            Publish
          </button>
        </div>
      </section>
    </section>
  )
}
