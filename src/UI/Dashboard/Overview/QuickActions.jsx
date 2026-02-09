import { NavLink } from "react-router-dom"

export const QuickActions = ({ className }) => {
  return (
    <section
      className={`flex px-4 grow shadow-lg rounded-xl pb-4 flex-col ${className}`}
    >
      <header className='font-semibold text-2xl'>Quick Actions</header>
      <section className='flex justify-between gap-7 mt-5'>
        <div className='flex flex-col w-full gap-2'>
          <p className='flex gap-2 text-lg font-serif pl-5'>
            <img
              width='27'
              height='27'
              src='https://img.icons8.com/external-flat-icons-inmotus-design/67/external-New-label-flat-icons-inmotus-design.png'
              alt='external-New-label-flat-icons-inmotus-design'
            />
            New items in stock ?
          </p>
          <NavLink
            to={'addProduct'}
            className='border-black text-center hover:bg-black border hover:text-white cursor-pointer rounded-xl p-2 text-black'
          >
            Add product
          </NavLink>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <p className='flex gap-2 text-lg font-serif pl-5'>
            <img
              width='27'
              height='27'
              src='https://img.icons8.com/color-glass/48/receive-cash.png'
              alt='receive-cash'
            />
            Payment Confirmation
          </p>
          <button className='bg-white cursor-pointer hover:text-white hover:bg-black rounded-xl p-2 text-black border'>
            Confirm Payments
          </button>
        </div>
      </section>
    </section>
  )
}