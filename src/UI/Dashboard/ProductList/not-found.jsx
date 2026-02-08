import { NavLink } from 'react-router-dom'

export function NotFound () {
  return (
    <section className=' flex  gap-8 flex-col items-center'>
      <div>
        <img
          width='70'
          height='60'
          src='https://img.icons8.com/external-outline-andi-nur-abdillah/64/external-Empty-empty-state-(outline)-outline-andi-nur-abdillah.png'
          alt='external-Empty-empty-state-(outline)-outline-andi-nur-abdillah'
        />
      </div>
      <p className='text-xl font-semibold font-mono'> No product Found </p>
      <NavLink
        to={'/dashboard/addproduct'}
        className='p-3 cursor-pointer px-10 rounded-2xl bg-black text-white'
      >
        Add new
      </NavLink>
    </section>
  )
}
