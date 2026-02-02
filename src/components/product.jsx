import styles from '../assets/css/product.module.css'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShoppingBag } from 'lucide-react'

export function ProductItem ({ item, status, tilioRef, shopContainer }) {
  const [isLoaded, setIsLoaded] = useState(status === 'success')
  const eachBox = useRef(null)
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)

      gsap.from(eachBox.current, {
        y: 20,
        rotateZ: 30,

        duration: 2.8,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: shopContainer.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 2,

          toggleActions: 'play reverse play reverse'
        }
      })
    },

    { scope: shopContainer }
  )

  return (
    <section className='relative group flex flex-col w-full px-18 pt-5 max-sm:pb-10  h-full xl:p-10 lg:p-5 md:p-20  justify-between  '>
      <div className='relative'>
        <img
          ref={eachBox}
          src={item.image}
          className='tiles-image w-full rounded-4xl h-full object-cover'
          alt={item.name}
        />
      </div>

      <div className='flex justify-between'>
        <p className={'font-mono w-[40%]'}>{item.name}</p>
        <p className={'font-semibold'}>{'$ ' + item.amount}</p>
      </div>
      <div className='absolute lg:hidden flex  group-hover:flex p-2 text-sm  text-white font-medium gap-3 items-center backdrop-blur-3xl bg-gray-400 shadow-2xl rounded-4xl px-3 right-2 bottom-2 z-10 cursor-pointer lg:bottom-2 xl:bottom-4 lg:right-1 xl:right-5'>
        Add to Cart <ShoppingBag size={15} />
      </div>
    </section>
  )
}
