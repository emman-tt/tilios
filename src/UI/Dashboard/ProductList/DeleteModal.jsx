export default function DeleteModal ({ deleteMode, deleteProduct }) {
  return (
    <section className='flex flex-col gap-6 sm:gap-10 p-6 sm:p-12 md:p-25 rounded-2xl bg-white shadow-2xl absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-auto max-w-md'>
      <p className='text-2xl sm:text-3xl font-bold flex justify-center'>
        Delete permanently
      </p>
      <p className='text-xs sm:text-sm text-center'>note: this action is irreversible</p>

      <div className='flex w-full justify-between gap-3 sm:gap-5'>
        <button
          className='bg-red-500 cursor-pointer rounded-xl grow text-white px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium'
          onClick={() => deleteProduct()}
        >
          Delete
        </button>
        <button
          className='bg-black cursor-pointer text-white grow rounded-xl px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium'
          onClick={() => deleteMode(false, 0)}
        >
          Cancel
        </button>
      </div>
    </section>
  )
}
