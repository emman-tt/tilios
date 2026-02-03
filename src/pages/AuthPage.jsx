import { Outlet } from 'react-router-dom'
import Header from '../UI/Login/Header'
import { useAuth } from '../context/auth'
import { AuthProvider } from '../context/auth'
export default function AuthPage () {
  return (
    <AuthProvider>
      <section className='bg-[#f5f2ea] h-screen overflow-hidden'>
        <Header />
        <section className='h-full w-full flex justify-center pt-10 '>
          <Outlet />
        </section>
      </section>
    </AuthProvider>
  )
}
