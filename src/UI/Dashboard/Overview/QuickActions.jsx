import { NavLink } from 'react-router-dom'

export const QuickActions = ({ className }) => {
  return (
    <section
      className={`flex flex-col  max-lg:mt-10 px-2 sm:px-4 grow shadow-lg rounded-xl p-3 sm:pb-4 gap-4 sm:gap-5 ${className}`}
    >
      <header className='font-semibold text-lg sm:text-2xl px-2'>
        Quick Actions
      </header>
      <section className='flex flex-col max-lg:p-10 max-lg:px-3  sm:flex-row justify-between gap-3 sm:gap-5 md:gap-7 px-2'>
        <div className='flex flex-col w-full gap-2 sm:gap-3'>
          <p className='flex gap-2 text-sm sm:text-lg font-serif px-2 sm:px-5 items-center'>
            <img
              width='20'
              height='20'
              className='sm:w-7 sm:h-7'
              src='https://img.icons8.com/external-flat-icons-inmotus-design/67/external-New-label-flat-icons-inmotus-design.png'
              alt='external-New-label-flat-icons-inmotus-design'
            />
            <span>New items in stock ?</span>
          </p>
          <NavLink
            to={'addProduct'}
            className='border-black text-center hover:bg-black border hover:text-white cursor-pointer rounded-xl p-3 sm:p-2 text-sm sm:text-sm text-black font-medium'
          >
            Add product
          </NavLink>
        </div>
        <div className='flex flex-col w-full gap-2 sm:gap-3'>
          <p className='flex gap-2 text-sm sm:text-lg font-serif px-2 sm:px-5 items-center'>
            <img
              width='20'
              height='20'
              className='sm:w-7 sm:h-7'
              src='https://img.icons8.com/color-glass/48/receive-cash.png'
              alt='receive-cash'
            />
            <span>Payment Confirmation</span>
          </p>
          <button className='bg-white cursor-pointer hover:text-white hover:bg-black rounded-xl p-3 sm:p-2 text-sm sm:text-sm text-black border font-medium'>
            Confirm Payments
          </button>
        </div>
      </section>
    </section>
  )
}
