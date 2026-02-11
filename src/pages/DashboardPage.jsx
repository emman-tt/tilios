import Logo from '../components/logo'
import Sidebar from '../UI/Dashboard/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Dashboard () {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <section>
      <section className='flex h-screen '>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='lg:hidden absolute top-0  md:left-10 z-10 p-2 right-10 '
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`fixed lg:static top-0 right-0 h-screen z-40 transition-all duration-300 ${
            sidebarOpen ? 'w-60' : 'w-0 lg:w-60'
          } overflow-hidden`}
        >
          <Sidebar className={'h-full w-60 pl-3 pr-2'} />
        </div>

        {sidebarOpen && (
          <div
            className='fixed inset-0 bg-black opacity-80 lg:hidden z-30'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className='flex flex-col w-full h-full'>
          <header className='flex w-full max-lg:justify-end  items-center h-15 border-b border-gray-200 justify-between px-4 sm:px-8 md:px-10 pt-0 ml-0 max-sm:justify-start lg:ml-0'>
            <Logo
              classname={`flex gap-7 align-middle max-lg:hidden items-center text-sm sm:text-lg font-semibold`}
            />

            <div className='flex gap-3  sm:gap-7 align-middle items-center'>
              <span className='text-sm sm:text-base'>Emmannuel</span>
              <span className='p-2 sm:p-3 rounded-full text-white font-bold bg-[#fdc886] text-xs sm:text-sm'>
                EM
              </span>
            </div>
          </header>

          <section className='h-full overflow-y-auto'>
            <Outlet />
          </section>
        </main>
      </section>
    </section>
  )
}
