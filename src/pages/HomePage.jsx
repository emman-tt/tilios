import Header from '../UI/Header'
import Hero from '../UI/Hero'
import Information from '../UI/Information'
import { useRef, useState } from 'react'
import Collection from '../UI/Collection'
import Shop from '../UI/Shop'

import Endsection from '../UI/EndSection'
export default function HomePage () {
  const containeRef = useRef(null)
  const headerText = useRef(null)
  const tilioRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sidebarBg = useRef(null)
  function closeSideBar () {
    console.log('close sidebar')
    isMenuOpen ? setIsMenuOpen(false) : null
  }

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
