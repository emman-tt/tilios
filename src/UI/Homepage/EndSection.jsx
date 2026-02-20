import { useRef } from 'react'
import Biography from './Biography'
import Footer from './Footer'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger, SplitText)
export default function Endsection ({ headerText, closeSideBar, sidebarBg }) {
  const EndRef = useRef(null)
  const BiographyRef = useRef(null)
  const footerRef = useRef(null)
  const BioHead = useRef(null)
  const BioInfo = useRef(null)

  useGSAP(
    () => {
      if (!footerRef.current || !BiographyRef.current || !EndRef.current) return

      ScrollTrigger.refresh()
      const isMobile = window.innerWidth < 768

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: EndRef.current,
          start: 'top top',
          end: isMobile ? '+=40%' : '+=20%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          // markers: true,
          invalidateOnRefresh: true
        }
      })

      tl.fromTo(
        footerRef.current,
        { y: isMobile ? '100%' : '95%' },
        {
          y: '20%',
          delay: 2,
          ease: 'none'
        },
        0
      )
    },
    { scope: EndRef, dependencies: [] }
  )

  useGSAP(
    () => {
      if (!headerText?.current || !BiographyRef?.current) return

      const BioHeadSplit = new SplitText(BioHead.current, {
        type: 'words,lines,chars'
      })
      const BioInfoSplit = new SplitText(BioInfo.current, {
        type: 'words,lines,chars'
      })

      const isMobile = window.innerWidth < 768

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: BiographyRef.current,
          start: isMobile ? 'top 80%' : 'top+=-200 top',
          end: isMobile ? 'bottom bottom' : 'top 0%',
          scrub: 0.2,
          // markers: true,
          toggleActions: 'play reverse play reverse'
        }
      })

      tl.from(
        BioHeadSplit.chars,
        {
          x: 100,
          opacity: 0,
          ease: 'circ.inOut',
          duration: 2,
          stagger: {
            amount: isMobile ? 10 : 30,
            from: 'end'
          }
        },
        0
      )
      tl.from(
        BioInfoSplit.lines,
        {
          y: 100,
          opacity: 0,
          ease: 'power3',
          filter: 'blur(70px)',
          duration: 10,
          stagger: {
            amount: 10,
            from: 'end'
          }
        },
        0
      )

      tl.to(
        headerText.current,
        {
          color: 'white',
          duration: 0.5,
          ease: 'power2.out'
        },
        0
      )
      tl.to(
        sidebarBg.current,
        {
          backgroundColor: 'black',
          duration: 0.5,
          ease: 'power2.out'
        },
        0
      )
    },
    { scope: BiographyRef }
  )

  return (
    <section
      onClick={() => closeSideBar()}
      ref={EndRef}
      className='relative w-full h-screen bg-amber-300 mt-20 md:mt-100 overflow-hidden'
    >
      <Biography
        BioHead={BioHead}
        BioInfo={BioInfo}
        BiographyRef={BiographyRef}
      />
      <Footer footerRef={footerRef} />
    </section>
  )
}
