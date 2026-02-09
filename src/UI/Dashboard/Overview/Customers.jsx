export const Customers = ({ className }) => {
  return (
    <section className='flex w-full h-full flex-col px-4 grow shadow-lg rounded-xl'>
      <header className='text-2xl font-semibold'>New customers</header>

      <div className='grid grid-cols-4 grid-rows-3  py-5 gap-y-4'>
        <p className=' justify-start flex pl-10'>
          <span className='p-2 rounded-full h-max bg-gray-100'>EM</span>
        </p>
        <p>Emmanuel Acquah</p>
        <p>Today</p>
        <p>07:16</p>

        <p className=' justify-start flex pl-10'>
          <span className='p-2 rounded-full h-max bg-gray-100'>ML</span>
        </p>
        <p>Manuel llama</p>
        <p>Today</p>
        <p>07:16</p>

        <p className=' justify-start flex pl-10'>
          <span className='p-2 rounded-full h-max bg-gray-100'>PB</span>
        </p>
        <p>Playboi Carti</p>
        <p>Today</p>
        <p>07:16</p>
      </div>
    </section>
  )
}
