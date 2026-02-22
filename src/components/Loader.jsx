import styles from '../assets/css/loader.module.css'
export default function Loader ({ className }) {
  return (
    <section
      className={`absolute inset-0  opacity-85 flex justify-center items-center align-middle bg-gray-10 rounded-3xl ${className}`}
    >
      <div className={styles.loader}></div>
    </section>
  )
}
