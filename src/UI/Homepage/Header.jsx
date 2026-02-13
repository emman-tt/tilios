import { Volleyball, Menu, X } from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useCart } from '../../context/cart'
export default function Header ({
  headerText,
  isMenuOpen,
  setIsMenuOpen,
  sidebarBg
}) {
  const navigate = useNavigate()
  const { cartTotal } = useCart()

  return (
    <section
      ref={headerText}
      className='w-full fixed top-0 z-50 left-0 right-0'
    >
      <nav className='flex w-full justify-between p-5 px-6 md:px-9 items-center  backdrop-blur-md'>
        <div className='text-lg cursor-pointer font-semibold flex gap-1 hover:italic transition-all duration-500'>
          Tilios
          <span>
            <Volleyball size={20} />
          </span>
        </div>

        <ul className='hidden md:flex gap-6 items-center'>
          <li className='cursor-pointer hover:font-bold hover:italic transition-all'>
            Search
          </li>
          <li className='cursor-pointer flex gap-4'>
            <div className='hover:font-semibold hover:italic transition-all'>
              Collection
            </div>
          </li>
          <li className='cursor-pointer hover:font-bold hover:italic transition-all'>
            Contact
          </li>
          <li className='cursor-pointer hover:font-bold hover:italic transition-all font-semibold'>
            <NavLink to={'/cart'}>
              Cart({cartTotal > 0 ? cartTotal : 0})
            </NavLink>
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
          <div className='cursor-pointer font-semibold'>
            Cart({cartTotal > 0 ? cartTotal : 0})
          </div>
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
        <ul className='flex flex-col gap-6 text-xl font-mono font-semibold'>
          <li
            onClick={() => setIsMenuOpen(false)}
            className='cursor-pointer hover:italic'
          >
            Search
          </li>

          <li
            onClick={() => setIsMenuOpen(false)}
            className='cursor-pointer hover:italic'
          >
            Collection
          </li>

          <li
            onClick={() => setIsMenuOpen(false)}
            className='cursor-pointer hover:italic'
          >
            Contact
          </li>
          <NavLink
            to={'/auth'}
            onClick={() => setIsMenuOpen(false)}
            className='   cursor-pointer hover:italic'
          >
            Login
          </NavLink>
        </ul>
      </div>
    </section>
  )
}
