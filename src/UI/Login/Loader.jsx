import styles from './css/loader.module.css'
export default function Loader () {
  return (
    <section className='absolute inset-0  opacity-85 flex justify-center items-center align-middle bg-gray-50 rounded-3xl'>
      <div className={styles.loader}></div>
    </section>
  )
}
