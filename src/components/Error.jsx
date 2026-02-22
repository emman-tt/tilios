import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const App = ({ className }) => {
  return (
    <section className={`${className}`}>
      <DotLottieReact
        src='https://lottie.host/751f5e38-0cb8-4e99-a354-d507eba1fa1d/qGWrvRd56s.lottie'
        loop
        height={4}
        width={10}
        autoplay
      />
    </section>
  )
}

export default function Error ({
  errMessage = 'Oops... Please check your connetion'
}) {
  return (
    <section className=' h-130 w-full flex-col  justify-center items-center flex'>
      <App className={'h-70 w-60'} />
      <h2 className='text-3xl font-semibold'>{errMessage}</h2>
    </section>
  )
}
