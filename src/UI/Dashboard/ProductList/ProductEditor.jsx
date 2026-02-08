import { useState, useRef } from 'react'
import { XIcon, Plus } from 'lucide-react'

import { useProductList } from '../../../context/productlist'

export const ProductEditor = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [isSelected, setIsSelected] = useState(false)
  const fileInputRef = useRef(null)

  const { state, editorMode, closeEditor, onChangeInput } = useProductList()

  const { name, price, stock, category, discount, image, showEditor } = state

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
      className={`w-170 shadow-2xl  h-full flex flex-col p-5 absolute right-0 bg-white z-32 top-0 bottom-0 ${className}`}
    >
      <p
        onClick={() => closeEditor()}
        className='flex justify-center cursor-pointer items-center  w-13 h-13 align-middle rounded-full bg-[#f7f6f9] '
      >
        <XIcon />
      </p>

      <p className='text-3xl font-semibold mt-8'>Edit Product</p>

      <section className='grid grid-cols-2 gap-y-5 grid-rows-2 mt-5'>
        <div>
          <p className='text-md font-semibold pl-2 mb-2'>Product Name</p>
          <input
            type='text'
            value={name}
            onChange={e => {
              onChangeInput('name', e.target.value)
            }}
            className='border rounded-xl p-3 px-8'
            placeholder='eg.appollo'
          />
        </div>
        <div>
          <p className='text-md font-semibold pl-2 mb-2'>Category</p>
          <input
            value={category}
            type='text'
            onChange={e => {
              onChangeInput('category', e.target.value)
            }}
            className='border rounded-xl p-3 px-8'
            placeholder='eg.ceramic'
          />
        </div>
        <div>
          <p className='text-md font-semibold pl-2 mb-2'>Price(per ft)</p>
          <input
            value={price}
            type='number'
            onChange={e => {
              onChangeInput('price', e.target.value)
            }}
            placeholder='eg.$8.90'
            className='border rounded-xl p-3 px-8'
          />
        </div>
        <div>
          <p className='text-md font-semibold pl-2 mb-2'>Stock</p>
          <input
            value={stock}
            type='number'
            onChange={e => {
              onChangeInput('stock', e.target.value)
            }}
            placeholder='eg.4'
            className='border rounded-xl p-3 px-8'
          />
        </div>
      </section>

      <section className='flex gap-5 mt-9'>
        <div className='rounded-xl w-30 h-30  bg-[#f8f8fa]'>
          <img
            src={image ? image : selectedFile}
            className='w-full h-full object-cover rounded-2xl'
          />
        </div>

        <div className='relative'>
          <div className='border-dashed border-gray-300 border flex justify-center items-center rounded-xl w-30 h-30'>
            <Plus />
          </div>
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            className='absolute  top-0 left-0 right-0 h-[60%]   w-full  opacity-0 cursor-pointer'
            onChange={e => handleFileChange(e)}
          />
        </div>
      </section>

      <div className='mt-5'>
        <p className='text-md font-semibold pl-2 mb-2'>Discount(if any) %</p>
        <input
          onChange={e => {
            onChangeInput('discount', e.target.value)
          }}
          type='number'
          value={discount}
          placeholder='eg.0%'
          className='border rounded-xl p-3 px-8'
        />
      </div>

      <section className='flex gap-5 mt-15'>
        <button className='flex justify-center items-center px-15 py-3 rounded-2xl text-black border hover:bg-black hover:text-white'>
          Save
        </button>
        <button
          onClick={() => closeEditor()}
          className='flex justify-center items-center px-15 py-3 rounded-2xl text-black border hover:bg-black hover:text-white'
        >
          Cancel
        </button>
      </section>
    </section>
  )
}
