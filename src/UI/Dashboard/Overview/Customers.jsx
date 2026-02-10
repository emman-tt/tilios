export const Customers = ({ className, customers }) => {
  function createInitials (item) {
    const splitted = item.split('')
    const first = splitted[0]
    const second = splitted[1]
    const full = first + second
    return full.toUpperCase()
  }
  return (
    <section className='flex max-lg:mb-20 max-lg:py-10 w-full h-full flex-col px-2 sm:px-4 grow shadow-lg rounded-xl py-4'>
      <header className='text-xl sm:text-2xl font-semibold px-2'>
        New customers
      </header>

      <div className='py-10 sm:py-5 gap-y-10 sm:gap-y-7 flex flex-col w-full overflow-x-auto'>
        {customers.map(item => (
          <section
            key={item.id}
            className='flex w-full justify-between items-center px-2 sm:px-4 gap-2 sm:gap-4 text-xs sm:text-sm md:text-base'
          >
            <p className='shrink-0'>
              <span className='p-1.5 sm:p-2 rounded-full h-max bg-gray-100 text-xs sm:text-sm font-semibold'>
                {createInitials(item.name)}
              </span>
            </p>
            <p className='grow text-left truncate'>{item.name}</p>
            <p className='shrink-0'>{item.date}</p>
          </section>
        ))}
      </div>
    </section>
  )
}
