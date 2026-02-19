import { NavLink } from 'react-router-dom'

export function NotFound ({
  message = 'No product Found',
  showButton = true,
  buttonMessage = 'Add new',
  className
}) {
  return (
    <section className={` flex  gap-8 flex-col items-center ${className}`}>
      <div>
        <img
          width='70'
          height='60'
          src='https://img.icons8.com/external-outline-andi-nur-abdillah/64/external-Empty-empty-state-(outline)-outline-andi-nur-abdillah.png'
          alt='external-Empty-empty-state-(outline)-outline-andi-nur-abdillah'
        />
      </div>
      <p className='text-xl font-semibold font-mono'> {message} </p>
      {showButton && (
        <NavLink
          to={'/dashboard/addproduct'}
          className='p-3 cursor-pointer px-10 rounded-2xl bg-black text-white'
        >
          {buttonMessage}
        </NavLink>
      )}
    </section>
  )
}
