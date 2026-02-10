import { Volleyball } from 'lucide-react'
import { Globe } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
export default function Header () {
  const { changeAuthType, authType } = useAuth()
  return (
    <section className='flex w-full justify-between px-5 sm:px-20 pt-6 '>
      <NavLink
        to={'/'}
        className='text-xl cursor-pointer font-semibold items-center flex gap-3 hover:italic transition-all duration-500 max-sm:text-lg '
      >
        Tilios
        <span>
          <Volleyball size={25} />
        </span>
      </NavLink>

      <div className='flex gap-10   items-center'>
        <NavLink to={'/'} className={'hidden sm:block'}>
          <Globe className='cursor-pointer' size={25} />
        </NavLink>
        <NavLink to={'signup'} className='hidden sm:block cursor-pointer '>
          Sign Up
        </NavLink>
        <NavLink
          to={'/auth'}
          onClick={() => {
            changeAuthType(authType === 'admin' ? 'user' : 'admin')
          }}
          className='bg-[#fdc886] rounded-xl text-black font-semibold  p-3 cursor-pointer'
        >
          {authType === 'admin' ? 'User login' : 'Admin Access'}
        </NavLink>
      </div>
    </section>
  )
}
