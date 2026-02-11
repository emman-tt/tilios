import { useState, useRef } from 'react'
import { XIcon, Plus } from 'lucide-react'
import gsap from 'gsap'
import { useProductList } from '../../../context/productlist'
import { useGSAP } from '@gsap/react'
export const ProductEditor = ({}) => {
  const [selectedFile, setSelectedFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [isSelected, setIsSelected] = useState(false)
  const fileInputRef = useRef(null)

  const { state, editorMode, closeEditor, onChangeInput, updateProduct } =
    useProductList()

  const { name, price, stock, categoryValue, discount, image, showEditor } =
    state
  const editorRef = useRef(null)

  useGSAP(
    () => {
      if (!editorRef) {
        return
      }

      gsap.from(editorRef.current, {
        x: 100,
        ease: '',
        duration: 0.2
      })
    }
    // { scope: containerRef }
  )

  const handleFileChange = e => {
    const file = e.target.files[0]
    console.log(e.target.files)

    if (file) {
      setFileName(file.name)
      setIsSelected(true)
      const imageUrl = URL.createObjectURL(file)
      console.log(imageUrl)
      setSelectedFile(imageUrl)
      onChangeInput('image', imageUrl)
    }
  }

  const removeFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  return (
    <section
      ref={editorRef}
      className={`w-full sm:w-100 md:w-170 shadow-2xl h-full flex flex-col p-4 sm:p-5 absolute right-0 bg-white z-32 top-0 bottom-0 overflow-y-auto`}
    >
      <p
        onClick={() => closeEditor()}
        className='flex justify-center cursor-pointer items-center w-10 sm:w-13 h-10 sm:h-13 align-middle rounded-full bg-[#f7f6f9] shrink-0'
      >
        <XIcon size={20} />
      </p>

      <p className='text-2xl sm:text-3xl font-semibold mt-6 sm:mt-8'>
        Edit Product
      </p>

      <section
        ref={editorRef}
        className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-y-5 mt-5'
      >
        <div>
          <p className='text-xs sm:text-sm md:text-base font-semibold pl-2 mb-2'>
            Product Name
          </p>
          <input
            type='text'
            value={name}
            onChange={e => {
              onChangeInput('name', e.target.value)
            }}
            className='border rounded-xl p-2 sm:p-3 px-4 sm:px-8 text-xs sm:text-sm w-full'
            placeholder='eg.appollo'
          />
        </div>
        <div>
          <p className='text-xs sm:text-sm md:text-base font-semibold pl-2 mb-2'>
            Category
          </p>
          <input
            value={categoryValue}
            type='text'
            onChange={e => {
              onChangeInput('categoryValue', e.target.value)
            }}
            className='border rounded-xl p-2 sm:p-3 px-4 sm:px-8 text-xs sm:text-sm w-full'
            placeholder='eg.ceramic'
          />
        </div>
        <div>
          <p className='text-xs sm:text-sm md:text-base font-semibold pl-2 mb-2'>
            Price(per ft)
          </p>
          <input
            value={price}
            type='number'
            onChange={e => {
              onChangeInput('price', e.target.value)
            }}
            placeholder='eg.$8.90'
            className='border rounded-xl p-2 sm:p-3 px-4 sm:px-8 text-xs sm:text-sm w-full'
          />
        </div>
        <div>
          <p className='text-xs sm:text-sm md:text-base font-semibold pl-2 mb-2'>
            Stock
          </p>
          <input
            value={stock}
            type='number'
            onChange={e => {
              onChangeInput('stock', e.target.value)
            }}
            placeholder='eg.4'
            className='border rounded-xl p-2 sm:p-3 px-4 sm:px-8 text-xs sm:text-sm w-full'
          />
        </div>
      </section>

      <section className='flex gap-3 sm:gap-5 mt-6 sm:mt-9'>
        <div className='rounded-xl w-24 sm:w-30 h-24 sm:h-30 bg-[#f8f8fa] shrink-0'>
          <img
            src={image ? image : selectedFile}
            className='w-full h-full object-cover rounded-2xl'
          />
        </div>

        <div className='relative shrink-0'>
          <div className='border-dashed border-gray-300 border flex justify-center items-center rounded-xl w-24 sm:w-30 h-24 sm:h-30'>
            <Plus size={20} />
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='absolute top-0 left-0 right-0 h-[60%] w-full opacity-0 cursor-pointer'
            onChange={e => handleFileChange(e)}
          />
        </div>
      </section>

      <div className='mt-4 sm:mt-5 w-[50%]'>
        <p className='text-xs sm:text-sm md:text-base font-semibold pl-2 mb-2'>
          Discount(if any) %
        </p>
        <input
          onChange={e => {
            onChangeInput('discount', e.target.value)
          }}
          type='number'
          value={discount}
          placeholder='eg.0%'
          className='border rounded-xl p-2 sm:p-3 px-4 sm:px-8 text-xs sm:text-sm w-full'
        />
      </div>

      <section className='flex gap-3 sm:gap-5 mt-8 sm:mt-15  sm:flex-row'>
        <button
          onClick={() => {
            updateProduct()
          }}
          className='flex cursor-pointer justify-center items-center px-6 sm:px-15 py-2 sm:py-3 rounded-2xl text-black border hover:bg-black hover:text-white text-xs sm:text-sm font-medium flex-1'
        >
          Save
        </button>
        <button
          onClick={() => closeEditor()}
          className='flex cursor-pointer justify-center items-center px-6 sm:px-15 py-2 sm:py-3 rounded-2xl text-black border hover:bg-black hover:text-white text-xs sm:text-sm font-medium flex-1'
        >
          Cancel
        </button>
      </section>
    </section>
  )
}
