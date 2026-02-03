import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitText from 'gsap/SplitText'
import { useRef } from 'react'
import { Volleyball } from 'lucide-react'

export default function Information ({
  containerRef,
  headerText,
  tilioRef,
  closeSideBar,
  sidebarBg
}) {
  const infoBox = useRef(null)
  const firstRef = useRef(null)
  const secondRef = useRef(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText)

      const headText = new SplitText(firstRef.current, {
        type: 'chars',
        wordsClass: 'inline-block white-space-nowrap'
      })
      const secondText = new SplitText(secondRef.current, {
        type: 'words,lines'
      })

      gsap.from(headText.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back.out',
        scrollTrigger: {
          trigger: firstRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1
          // markers: true
        }
      })

      gsap.to(headerText.current, {
        scrollTrigger: {
          trigger: infoBox.current,
          start: 'top top',

          toggleActions: 'play reverse play reverse'
        },

        duration: 0.3,
        color: 'black'
      })
      gsap.to(sidebarBg.current, {
        scrollTrigger: {
          trigger: infoBox.current,
          start: 'top top',

          toggleActions: 'play reverse play reverse'
        },

        duration: 0.3,
        backgroundColor: 'white'
      })
      gsap.from(secondText.lines, {
        y: 200,
        opacity: 0,
        stagger: { amount: 0.7, from: 'egdes' },
        duration: 0.8,
        ease: 'power2',

        scrollTrigger: {
          trigger: firstRef.current,
          start: 'bottom bottom',

          scrub: 1
        }
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      onClick={() => closeSideBar()}
      ref={infoBox}
      className='min-h-screen pt-20 md:pt-40 lg:pt-100 flex flex-col justify-center items-center gap-20 md:gap-40 lg:gap-60 pb-20 md:pb-40 lg:pb-100 px-6 md:px-12'
    >
      <h2
        ref={firstRef}
        className='first-text text-4xl max-sm:pt-40 md:text-6xl lg:text-7xl max-sm:text-3xl w-full md:w-[70%] lg:w-[40%] font-bold font-sans text-center leading-tight max-sm:font-semibold max-sm:px-0'
      >
        Whole Catalog Of Tiles
      </h2>

      <div className='flex justify-center flex-col items-center w-full'>
        <div
          ref={secondRef}
          className='second-text text-center text-base md:text-lg lg:px-40 w-full md:w-[80%] lg:w-200 font-medium leading-relaxed'
        >
          TileCraft, located in the heart of New-York, was founded by Esther
          Howard with a passion for creating high-quality tiles. Our
          state-of-the-art production facility combines traditional
          craftsmanship with modern technology to produce tiles that are both
          beautiful and durable.
        </div>
        <h2
          ref={tilioRef}
          className='flex justify-center items-center gap-3 md:gap-5 font-bold text-2xl md:text-3xl mt-8 md:mt-10'
        >
          Tilios
          <span>
            <Volleyball size={window.innerWidth < 768 ? 24 : 30} />
          </span>
        </h2>
      </div>
    </section>
  )
}
