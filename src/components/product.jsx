import styles from '../assets/css/product.module.css'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/cart'
export function ProductItem ({ item, status, tilioRef, shopContainer }) {
  const [isLoaded, setIsLoaded] = useState(status === 'success')
  const eachBox = useRef(null)

  const { addCart } = useCart()
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

  function calculateDiscount (item) {
    const discountValue = (parseFloat(item.discount) / 100) * item.amount
    const priceAtSale = item.amount - discountValue
    return priceAtSale.toFixed(2)
  }

  return (
    <section
      onClick={() => {
        addCart(item.id)
      }}
      className='relative group flex  sm:px-18 flex-col w-full px-10 pt-5 max-sm:pb-10  h-full xl:p-5 2xl:p-10 lg:p-5 md:p-20  justify-between  '
    >
      <div className='relative max-sm:px-5'>
        <img
          ref={eachBox}
          src={item.image}
          className='tiles-image relative w-full rounded-4xl h-full object-cover'
          alt={item.name}
        />

        {item.discount > 0 && (
          <div className='absolute max-sm:left-3 max-sm:rounded-xl max-sm:-top-1  -top-3 left-0 rounded-4xl text-white p-1 px-3 font-semibold text-sm  flex justify-center items-center  bg-red-400'>
            -{item.discount}%
          </div>
        )}
      </div>

      <div className='flex justify-between  mb-10'>
        <p className={'font-mono w-[40%]'}>{item.name}</p>
        <div className={'font-semibold'}>
          <p className={item.discount > 0 ? 'line-through text-gray-400' : ''}>
            {'$ ' + item.amount}
          </p>
          {item.discount > 0 && (
            <p className=' '>$ {calculateDiscount(item)}</p>
          )}
        </div>
      </div>
      <div className='absolute lg:hidden flex   group-hover:flex p-2 text-sm  text-white font-medium gap-3 items-center backdrop-blur-3xl bg-black shadow-2xl rounded-xl  px-3 right-2 bottom-2 z-10 cursor-pointer lg:bottom-2 xl:bottom-4 lg:right-1 xl:right-5'>
        Add to Cart <ShoppingBag size={15} />
      </div>
    </section>
  )
}
