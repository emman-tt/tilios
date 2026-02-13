import Header from '../UI/Homepage/Header'
import Hero from '../UI/Homepage/Hero'
import Information from '../UI/Homepage/Information'
import { useEffect, useRef, useState } from 'react'
import Collection from '../UI/Homepage/Collection'
import Shop from '../UI/Homepage/Shop'
import { useCart } from '../context/cart'
import Endsection from '../UI/Homepage/EndSection'
import { autoRefresh } from '../hooks/autoRefresh'
import { api } from '../api/axios'
import { toast } from 'sonner'
export default function HomePage () {
  const containeRef = useRef(null)
  const headerText = useRef(null)
  const tilioRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sidebarBg = useRef(null)
  const { fetchCart } = useCart()

  function closeSideBar () {
    console.log('close sidebar')
    isMenuOpen ? setIsMenuOpen(false) : null
  }

  async function silentUserAuth () {
    try {
      const response = await api.get('/silent/user-auth')
      const data = await response.data
      const email = data.email

      toast.success('User logged in as :', {
        description: email
      })

      fetchCart()
    } catch (error) {
      console.log(error)
      const status = error.status
      const serverError = error.response.data.message

      if (status === 403) {
        const status = await autoRefresh()

        if (status === 'success') {
          return silentUserAuth()
        }
      }

      if (status === 405) {
        return toast.error('Session timed out, please log in')
      }

      if (status === 401) {
        return
      }

      return toast.error(serverError)
    }
  }
  useEffect(() => {
    silentUserAuth()
  }, [])

  return (
    <section className='w-full h-max bg-[#fefaf6] '>
      <Header
        sidebarBg={sidebarBg}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        headerText={headerText}
      />
      <Hero
        sidebarBg={sidebarBg}
        closeSideBar={closeSideBar}
        containerRef={containeRef}
        headerText={headerText}
      />
      <Information
        sidebarBg={sidebarBg}
        closeSideBar={closeSideBar}
        tilioRef={tilioRef}
        headerText={headerText}
        containerRef={containeRef}
      />
      <Collection closeSideBar={closeSideBar} />
      <Shop closeSideBar={closeSideBar} tilioRef={tilioRef} />
      <Endsection
        sidebarBg={sidebarBg}
        closeSideBar={closeSideBar}
        headerText={headerText}
      />
    </section>
  )
}
