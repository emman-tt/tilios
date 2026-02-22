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
    <section className='flex max-lg:mb-20 max-lg:py-10 w-full  flex-col px-2 sm:px-4  shadow-lg rounded-xl py-0'>
      <header className='text-lg sm:text-xl font-semibold px-2'>
        Recent customers
      </header>

      <div className='py-10 sm:py-6 gap-y-10 sm:gap-y-4 flex flex-col w-full overflow-x-auto'>
        {customers
          .slice(0, 3)
          .reverse()
          .map(item => (
            <section
              key={item.id}
              className='flex w-full justify-between items-center px-2 sm:px-4 gap-2 sm:gap-4 text-xs sm:text-sm '
            >
              <p className='p-1.5 sm:p-2 rounded-full h-max bg-gray-100 text-xs  font-semibold'>
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
