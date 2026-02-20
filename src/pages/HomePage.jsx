import Header from '../UI/Homepage/Header'
import Hero from '../UI/Homepage/Hero'
import Information from '../UI/Homepage/Information'
import { useEffect, useRef, useState } from 'react'
import Collection from '../UI/Homepage/Collection'
import Shop from '../UI/Homepage/Shop'
import { useCart } from '../context/cart'
import Endsection from '../UI/Homepage/EndSection'
import { silentUserAuth } from '../services/silentAuth'
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

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      const status = await silentUserAuth(controller.signal)
      if (status === 'success') {
        fetchCart()
      }

      console.log(status)
    })()

    return () => {
      controller.abort()
    }
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
