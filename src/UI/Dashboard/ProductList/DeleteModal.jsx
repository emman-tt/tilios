import { useProductList } from '../../../context/productlist'
export default function DeleteModal ({
  deleteMode,
  deleteProduct,
  product,
  categoryArray
}) {
  const { state } = useProductList()
  const { deleteProductDetails } = state
  function findCategory (id) {
    const cat = categoryArray
      .find(cat => cat.id === id)
      .value.toLocaleLowerCase()

    return cat
  }
  return (
    <section className='flex flex-col gap-6 sm:gap-10 p-6 sm:p-12  md:p-12 md:px-20  rounded-2xl bg-white  absolute z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%]  '>
      <p className='text-2xl sm:text-3xl font-bold flex justify-center'>
        Delete permanently
      </p>
      <section className='flex flex-col gap-2'>
        <p className='font-semibold text-lg'>
          Item : {deleteProductDetails.name}
        </p>
        <p className='font-semibold text-lg'>
          Price : $ {deleteProductDetails.amount}
        </p>
        <p className='font-semibold text-lg'>
          Category : {findCategory(deleteProductDetails.categoryId)}
        </p>
      </section>
      <p className='text-xs sm:text-sm text-center'>
        note: this action is irreversible
      </p>

      <div className='flex w-full justify-between gap-3 sm:gap-5'>
        <button
          className='bg-red-500 cursor-pointer rounded-xl grow text-white px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium'
          onClick={() => deleteProduct()}
        >
          Delete
        </button>
        <button
          className='bg-black cursor-pointer text-white grow rounded-xl px-2 sm:px-3 py-4 text-xs sm:text-sm font-medium'
          onClick={() => deleteMode(false, 0)}
        >
          Cancel
        </button>
      </div>
    </section>
  )
}
