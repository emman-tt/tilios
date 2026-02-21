import {
  Volleyball,
  Menu,
  X,
  LockKeyholeOpenIcon,
  ShoppingBag,
  Search
} from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useCart } from '../../context/cart'
import { toast } from 'sonner'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import { PhoneIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { UserStar } from 'lucide-react'
gsap.registerPlugin(ScrollToPlugin)
export default function Header ({
  headerText,
  isMenuOpen,
  setIsMenuOpen,
  sidebarBg,
  shopRef
}) {
  const navigate = useNavigate()
  const { cartTotal } = useCart()

  function moveTo (where) {
    where === 'search'
      ? gsap.to(window, {
          duration: 0,
          scrollTo: { y: shopRef.current, offsetY: 500 },
          ease: 'power2.inOut'
        })
      : where === 'contact'
      ? gsap.to(window, {
          duration: 0,
          scrollTo: { y: 'max' },
          ease: 'power2.inOut'
        })
      : gsap.to(window, {
          duration: 0,
          scrollTo: shopRef.current,
          ease: 'power2.inOut'
        })
  }

  return (
    <section
      ref={headerText}
      className='w-full fixed top-0 z-50 left-0 right-0'
    >
      {/* desktop navigation */}
      <nav className='flex w-full text-sm justify-between p-5 px-6 md:px-9 items-center  backdrop-blur-md'>
        <div className='text-sm cursor-pointer font-semibold flex gap-1 hover:italic transition-all duration-500'>
          Tilios
          <span>
            <Volleyball size={20} />
          </span>
        </div>

        <ul className='hidden md:flex gap-6 items-center'>
          <li
            onClick={() => {
              moveTo('search')
            }}
            className='cursor-pointer hover:font-bold hover:italic transition-all'
          >
            Search
          </li>
          <li
            className='cursor-pointer hover:font-bold hover:italic transition-all'
            onClick={() => {
              moveTo('shop')
            }}
          >
            Collection
          </li>
          <li
            onClick={() => {
              moveTo('contact')
            }}
            className='cursor-pointer hover:font-bold hover:italic transition-all'
          >
            Contact
          </li>
          <li className='cursor-pointer hover:font-bold hover:italic transition-all font-semibold'>
            <NavLink to={'/cart'}>
              Cart({cartTotal > 0 ? cartTotal : 0})
            </NavLink>
          </li>
          <li
            onClick={() => {
              const token = localStorage.getItem('accessToken')
              if (!token) {
                return toast.error('Unauthorized')
              }
              navigate('/dashboard')
            }}
            className='cursor-pointer hover:font-bold hover:italic transition-all font-semibold'
          >
            Admin
          </li>
          <li
            onClick={() => {
              navigate('/auth')
            }}
            className='cursor-pointer hover:font-bold hover:italic transition-all font-semibold'
          >
            Login
          </li>
        </ul>

        <div className='md:hidden flex items-center gap-4'>
          <NavLink to={'/cart'} className='cursor-pointer font-semibold'>
            Cart({cartTotal > 0 ? cartTotal : 0})
          </NavLink>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-2 hover:bg-gray-100 rounded-full transition-all'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        ref={sidebarBg}
        className={`fixed inset-0 bg-[#fefaf6] z-40 transform ${
          isMenuOpen ? 'translate-x-40' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden flex flex-col p-10 pt-24 gap-8 pl-5`}
      >
        {/* mobile navigation */}
        <ul className='flex flex-col gap-6 text-xl font-mono font-semibold'>
          <li
            onClick={() => {
              setIsMenuOpen(false), moveTo('search')
            }}
            className='cursor-pointer flex items-center gap-3 hover:font-bold hover:italic transition-all font-semibold'
          >
            <Search className='h-5 w-5' />
            Search
          </li>

          <li
            onClick={() => {
              setIsMenuOpen(false), moveTo('shop')
            }}
            className='cursor-pointer flex gap-3 items-center hover:font-bold hover:italic transition-all font-semibold'
          >
            <ShoppingBag className='h-5 w-5' />
            Collection
          </li>

          <li
            onClick={() => {
              setIsMenuOpen(false), moveTo('contact')
            }}
            className='cursor-pointer flex items-center gap-3 hover:font-bold hover:italic transition-all font-semibold'
          >
            <PhoneIcon className='h-5 w-5' />
            Contact
          </li>
          <li
            onClick={() => {
              const token = localStorage.getItem('accessToken')
              if (!token) {
                return toast.error('Unauthorized')
              }
              navigate('/dashboard')
            }}
            className='cursor-pointer flex items-center gap-3 hover:font-bold hover:italic transition-all font-semibold'
          >
            <UserStar className='h-5 w-5' />
            Admin
          </li>
          <NavLink
            to={'/auth'}
            onClick={() => setIsMenuOpen(false)}
            className='flex gap-3 items-center  cursor-pointer hover:font-bold hover:italic transition-all font-semibold'
          >
            <LockKeyholeOpenIcon className='h-5 w-5' />
            Login
          </NavLink>
        </ul>
      </div>
    </section>
  )
}
