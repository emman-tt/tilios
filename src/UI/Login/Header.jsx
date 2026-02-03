import { Volleyball } from 'lucide-react'
import { Globe } from 'lucide-react'
import { NavLink } from 'react-router-dom'
export default function Header () {
  return (
    <section className='flex w-full justify-between px-20 pt-6 '>
      <NavLink
        to={'/'}
        className='text-xl cursor-pointer font-semibold items-center flex gap-3 hover:italic transition-all duration-500'
      >
        Tilios
        <span>
          <Volleyball size={25} />
        </span>
      </NavLink>

      <div className='flex gap-10 items-center'>
        <NavLink to={'/'}>
          <Globe className='cursor-pointer' size={25} />
        </NavLink>
        <NavLink to={'signup'} className='cursor-pointer'>
          Sign Up
        </NavLink>
        <button className='bg-[#fdc886] rounded-xl text-black font-semibold p-3 cursor-pointer'>
          Request Demo
        </button>
      </div>
    </section>
  )
}
