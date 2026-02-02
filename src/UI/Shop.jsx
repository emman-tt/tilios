import { ProductItem } from '../components/product'
import { useFetchProducts } from '../hooks/useFetchProducts'
import { useProductContext } from '../context/product'
import styles from '../assets/css/product.module.css'
import { useRef } from 'react'
export default function Shop ({ tilioRef,closeSideBar }) {
  const { state } = useProductContext()
  const { products, status } = state

  const shopContainer = useRef(null)
  useFetchProducts()
  return (
    <main   onClick={() => closeSideBar()}
      ref={shopContainer}
      className='grid pt-10 md:pt-30 grid-cols-1 md:grid-cols-2  lg:grid-cols-4 max-sm:h-[600vh] md:h-[230vh] lg:h-[150vh] px-6 md:px-12 lg:pl-40 xl:pl-100 xl:pr-40 border-gray-500'
    >
      {status === 'success'
        ? products.map(artifact => (
            <div key={artifact.id} className='border-r border-b  h-90 '>
              <ProductItem
                shopContainer={shopContainer}
                tilioRef={tilioRef}
                item={artifact}
                status={status}
              />
            </div>
          ))
        : [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
            <section
              key={item}
              className='relative flex flex-col w-full h-auto p-4 md:p-10 justify-between border-b md:border-r last:border-r-0'
            >
              <div
                className={`${styles.shimmerImage} tiles-image rounded-2xl h-40 md:h-50`}
              ></div>
              <div className='flex w-full justify-between mt-5 '>
                <p className={`${styles.shimmerText}`}></p>
                <p className={`${styles.shimmerText}`}></p>
              </div>
            </section>
          ))}
    </main>
  )
}
