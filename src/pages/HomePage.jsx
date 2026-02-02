import Header from '../UI/Header'
import Hero from '../UI/Hero'
import Information from '../UI/Information'
import { useRef } from 'react'
import Collection from '../UI/Collection'
import Shop from '../UI/Shop'

import Endsection from '../UI/EndSection'
export default function HomePage () {
  const containeRef = useRef(null)
  const headerText = useRef(null)
  const tilioRef = useRef(null)

  return (
    <section className='w-full h-max bg-[#fefaf6] '>
      <Header headerText={headerText} />
      <Hero containerRef={containeRef} headerText={headerText} />
      <Information
        tilioRef={tilioRef}
        headerText={headerText}
        containerRef={containeRef}
      />
      <Collection />
      <Shop tilioRef={tilioRef} />
      <Endsection headerText={headerText} />
    </section>
  )
}
