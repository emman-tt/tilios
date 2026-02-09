export default function DeleteModal ({ deleteMode, deleteProduct }) {
  return (
    <section className='flex flex-col gap-10 p-25 rounded-2xl bg-white shadow-2xl  absolute z-20 top-50 left-120'>
      <p className='text-3xl font-bold flex justify-center '>
        Delete permanently
      </p>
      <p className='text-sm text-center'>note: this action is irreversible</p>

      <div className='flex w-full justify-between gap-5'>
        <button
          className='bg-red-500 cursor-pointer rounded-xl grow text-white px-3 py-2'
          onClick={() => deleteProduct()}
        >
          Delete
        </button>
        <button
          className='bg-black cursor-pointer text-white grow rounded-xl px-3 py-2'
          onClick={() => deleteMode(false, 0)}
        >
          Cancel
        </button>
      </div>
    </section>
  )
}
