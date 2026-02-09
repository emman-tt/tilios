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
    <section className=' h-full w-full pt-5 p-10'>
      <h2 className='text-xl font-semibold'>Add Products</h2>

      <section className=' flex gap-20 p-10 '>
        <div className='flex flex-col grow gap-10   pr-20   '>
          <div>
            <p className='text-lg font-semibold pl-3'>Title</p>
            <input
              value={title}
              onChange={e => handleInput('title', e.target.value)}
              type='text'
              className='border hover:outline-none w-full mt-1 p-2 border-gray-500 rounded-lg'
              name=''
              id=''
            />
          </div>
          <div>
            <p className='text-lg font-semibold pl-3'>Category</p>
            <select
              value={category}
              onChange={e => {
                handleInput('category', e.target.value)
              }}
              className='w-full mt-1 p-2 border-gray-500 rounded-lg border '
            >
              <option value={1}>Ceramic</option>
              <option value={2}>Porcelain</option>
              <option value={3}>Stone</option>
              <option value={4}>Glass</option>
            </select>
          </div>

          <div>
            <p className='text-lg font-semibold pl-3'>Price(per ft)</p>
            <input
              value={price}
              onChange={e => handleInput('price', e.target.value)}
              type='number'
              name=''
              className='border hover:outline-none w-full mt-1 p-2 border-gray-500 rounded-lg'
              id=''
            />
          </div>

          <div>
            <p className='text-lg font-semibold pl-3'>Stock</p>
            <input
              value={stock}
              onChange={e => {
                handleInput('stock', e.target.value)
              }}
              type='number'
              name=''
              className='border hover:outline-none w-full mt-1 p-2 border-gray-500 rounded-lg'
              id=''
            />
          </div>
          <div>
            <p className='text-lg font-semibold pl-3'>
              Discount ( if any in percent %)
            </p>
            <input
              value={discount}
              onChange={e => handleInput('discount', e.target.value)}
              type='number'
              name=''
              className='border hover:outline-none w-full mt-1 p-2 border-gray-500 rounded-lg'
              id=''
            />
          </div>
        </div>

        <div className='w-[50%] h-full relative flex   flex-col gap-10 '>
          <div className='h-full'>
            <div className='flex justify-between w-full'>
              <p className='text-lg font-semibold  pl-3'>Media</p>

              {isSelected && (
                <button
                  onClick={() => {
                    setIsSelected(false), removeFile()
                  }}
                  className='p-2 font-semibold relative z-10 cursor-pointer bg-gray-50 rounded-2xl px-7'
                >
                  Clear
                </button>
              )}
            </div>

            <div className='flex flex-col bg-[#e6ecf5ac]  items-center justify-center  rounded-xl  mt-5 h-70'>
              {!isSelected ? (
                <>
                  <svg
                    className='w-8 h-8 mb-4 text-gray-500'
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
                  <p className='mb-2 text-sm text-gray-500 font-semibold'>
                    Click to upload photo
                  </p>
                  <p className='text-xs text-gray-400'>
                    PNG or JPG (MAX. 800x400px)
                  </p>
                </>
              ) : (
                <div className='flex justify-center h-full gap-5  w-full items-center'>
                  <section className='flex flex-col'>
                    <div className=' h-60 w-70 '>
                      <img
                        src={selectedFile}
                        className='h-full object-cover rounded-xl w-full'
                        alt=''
                      />
                    </div>
                    <p>{fileName}</p>
                  </section>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              disabled={isSelected}
              type='file'
              accept='image/*'
              className='absolute  top-0 left-0 right-0 h-[60%]   w-full  opacity-0 cursor-pointer'
              onChange={e => handleFileChange(e)}
            />
          </div>
          <button
            onClick={() => {
              validateFieldsAndSubmit()
            }}
            className='p-3 px-15 cursor-pointer mt-10 hover:bg-[#fdc886] border rounded-xl  flex  self-center'
          >
            Publish
          </button>
        </div>
      </section>
    </section>
  )
}
