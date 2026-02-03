import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SplitText from 'gsap/SplitText'
import bg7 from '../../assets/img/bg7.jpg'
export default function Hero ({
  containerRef,
  headerText,
  closeSideBar,
  sidebarBg
}) {
  gsap.registerPlugin(ScrollTrigger, SplitText)

  const nextPanel = useRef(null)
  const previousPanel = useRef(null)
  const bgRef = useRef(null)
  const barRef = useRef(null)
  const textRef1 = useRef(null)
  const textRef2 = useRef(null)
  const textRef3 = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        nextPanel.current,
        { y: '100%' },
        {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: true,
            pin: true,
            anticipatePin: 1
          }
        }
      )
      gsap.to(previousPanel.current, {
        y: -40,
        zoom: 0.3,
        scale: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',

          scrub: true
        }
      })
    },
    { scope: containerRef }
  )

  useGSAP(
    () => {
      const splitAnime1 = new SplitText(textRef1.current, {
        type: 'chars,lines,words'
      })
      const splitAnime2 = new SplitText(textRef2.current, {
        type: 'chars,lines,words'
      })
      const splitAnime3 = new SplitText(textRef3.current, {
        type: 'chars,lines,words'
      })

      gsap.from(splitAnime1.lines, {
        y: 100,
        opacity: 1,
        stagger: {
          amount: 0.5,
          from: 'end'
        },

        ease: 'back.out',
        scrollTrigger: {
          trigger: textRef1.current,
          start: 'top 90%',
          end: 'top 50%',
          // markers: true,
          scrub: 1
        }
      })
      gsap.from(splitAnime2.chars, {
        y: -800,
        opacity: 0.5,
        scale: 2,
        stagger: {
          amount: 1,
          from: 'edges'
        },

        ease: 'elastic',
        scrollTrigger: {
          trigger: textRef1.current,
          start: 'top 70%',
          end: 'top 50%',
          // markers: true,
          scrub: 2.5
        }
      })
      gsap.from(splitAnime3.chars, {
        x: 100,
        opacity: 0,
        stagger: 0.5,
        duration: 0.5,
        ease: 'back.out',
        scrollTrigger: {
          trigger: textRef1.current,
          start: 'top 90%',
          end: 'top 50%',
          // markers: true,
          scrub: 1
        }
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top 90%',
          end: 'top 10%',
          scrub: 3
        }
      })

      tl.from(barRef.current, {
        ease: 'ease',
        width: 0,
        stagger: 5,
        duration: 10
      })

      // return () => splitAnime.revert()
    },
    { scope: containerRef }
  )

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: window.innerWidth < 768 ? 500 : 1000,
          end: 10000,
          toggleActions: 'play reverse play reverse'
        },
        backgroundColor: '#333333',
        duration: 0.3,
        color: 'white'
      })
      gsap.to(headerText.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: window.innerWidth < 768 ? 500 : 1000,
          end: 10000,
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.3,
        color: 'white'
      })
      gsap.to(sidebarBg.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: window.innerWidth < 768 ? 500 : 1000,
          end: 10000,
          toggleActions: 'play reverse play reverse'
        },
        duration: 0.3,
        backgroundColor: 'black'
      })
    },
    { scope: containerRef }
  )

  return (
    <main
      onClick={() => closeSideBar()}
      ref={containerRef}
      className='relative w-full min-h-300  overflow-hidden'
    >
      <section
        ref={previousPanel}
        className='flex flex-col md:flex-row justify-between pt-32 max-sm:pt-10 max-sm:justify-start max-sm:gap-12 top-20 xl:top-60 px-6 md:px-5 w-full absolute inset-0 z-10 gap-0 md:gap-0'
      >
        <div className='text-lg md:text-2xl font-semibold md:pr-10 lg:pr-0 lg:w-[30%] w-full md:w-auto'>
          INSPIRED TILING SOLUTIONS
        </div>
        <div className='font-sans w-full md:w-[80%] lg:w-[50%] font-semibold lg:pr-10 lg:text-8xl text-[3.5em] md:text-[4em]  leading-tight'>
          Your home, your reflection.
        </div>
        <div className='w-full md:w-[45%] lg:w-[30%] xl:w-[20%] text-base lg:text-lg md:text-sm font-semibold'>
          The goal was to create a minimalistic yet sophisticated website with
          the ability to view tiles in the interior for users or download them
          and view them in your project for interior designers.
        </div>
      </section>

      <section>
        <div>
          <section
            ref={nextPanel}
            className='absolute inset-0 pt-10 xl:p-10  z-20 flex flex-col items-center justify-center bg-[#333333] text-white'
          >
            <div
              ref={barRef}
              className='w-[200%] max-lg:hidden h-10 md:h-25 rotate-10 -z-1 bg-[#1c1c1dc3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            ></div>

            <div
              ref={bgRef}
              className='relative top-10 md:top-20 h-[70%] md:h-[80%] w-full p-2 md:p-0 lg:p-0 xl:p-20'
            >
              <img
                src={bg7}
                alt=''
                className='h-full w-full rounded-3xl opacity-70 object-cover'
              />
              <ul className='flex flex-col md:flex-row absolute bottom-10 md:bottom-20 lg:bottom-40 left-0 right-0 justify-between w-full px-8 md:px-5 lg:px-30 items-start md:items-center gap-6 md:gap-0'>
                <li
                  ref={textRef1}
                  className='font-semibold text-lg md:text-xl w-full md:w-[25%] lg:w-[15%]'
                >
                  Our Exquisite Collection of Tiles
                </li>
                <li
                  ref={textRef2}
                  className='tile-title text-4xl md:text-6xl lg:text-7xl font-extrabold font-stretch-ultra-expanded'
                >
                  Celestial Symphony
                </li>
                <li
                  ref={textRef3}
                  className='tile-title font-semibold text-lg md:text-xl'
                >
                  02 - 26
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
