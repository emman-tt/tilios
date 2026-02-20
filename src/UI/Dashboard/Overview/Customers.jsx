export const Customers = ({ className, customers }) => {
  function createInitials (item) {
    const splitted = item.split('')
    const first = splitted[0]
    const second = splitted[1]
    const full = first + second
    return full.toUpperCase()
  }

  function formatDate (rawDate) {
    const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return formattedDate
  }
  return (
    <section className='flex max-lg:mb-20 max-lg:py-10 w-full h-max flex-col px-2 sm:px-4  shadow-lg rounded-xl py-4'>
      <header className='text-xl sm:text-2xl font-semibold px-2'>
        New customers
      </header>

      <div className='py-10 sm:py-5 gap-y-10 sm:gap-y-7 flex flex-col w-full overflow-x-auto'>
        {customers.map(item => (
          <section
            key={item.id}
            className='flex w-full justify-between items-center px-2 sm:px-4 gap-2 sm:gap-4 text-xs sm:text-sm md:text-base'
          >
            <p className='p-1.5 sm:p-2 rounded-full h-max bg-gray-100 text-xs sm:text-lg font-semibold'>
              {createInitials(item.name)}
            </p>

            <p className=' truncate font-semibold'>{item.name}</p>
            <p className='shrink-0 font-semibold'>
              {formatDate(item.createdAt)}
            </p>
          </section>
        ))}
      </div>
    </section>
  )
}
