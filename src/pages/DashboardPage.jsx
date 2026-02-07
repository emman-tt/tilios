import Logo from '../components/logo'
import Sidebar from '../UI/Dashboard/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard () {
  return (
    <section>
      <section className='flex h-screen'>
        <Sidebar className={'h-full w-60 pl-3 pr-2'} />
        <main className='flex flex-col w-full h-full'>
          <header className=' flex w-full items-center h-15 border-b border-gray-200 justify-between px-10 pt-0'>
            <Logo
              classname={`flex gap-7 align-middle items-center text-lg font-semibold`}
            />

            <div className='flex gap-7 align-middle items-center'>
              Emmannuel
              <span className='p-3 rounded-full text-white font-bold bg-[#fdc886]'>
                EM
              </span>
            </div>
          </header>

          <section className='h-full'>
            <Outlet />
          </section>
        </main>
      </section>
    </section>
  )
}
