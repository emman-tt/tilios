import team from '../../assets/img/team.jpg'

import { MoveRight } from 'lucide-react'

export default function Biography ({ BioHead, BioInfo, BiographyRef }) {
  return (
    <section
      ref={BiographyRef}
      className='bg-[#464240] sm:absolute  inset-0 h-full z-10 flex flex-col md:flex-row justify-between px-6 md:px-12  md:pt-40 lg:pt-20 xl:pt-50 w-full  text-white pt-0 overflow-y-auto md:overflow-hidden gap-10 md:gap-0 max-sm:pt-30'
    >
      <header
        ref={BioHead}
        className='text-3xl md:text-5xl  xl:text-6xl font-extrabold font-sans max-md:tracking-widest w-full  md:w-[40%] xl:w-[30%]  leading-tight'
      >
        A Legacy Of Expertly Crafted Tiles
      </header>
      <section className='w-full md:w-[55%] lg:w-[50%] md:pr-12  xl:pr-35 pb-10 md:pb-0'>
        <p
          ref={BioInfo}
          className='text-base xl:text-lg leading-relaxed md:leading-10 lg:leading-6 xl:leading-10'
        >
          At our tile store, our team of experts is dedicated to helping you
          find the perfect tiles for your project. Our staff is knowledgeable,
          friendly and passionate about providing exceptional customer service.
          We take pride in our expertise and will work with you to understand
          your needs and preferences, whether you are renovating your bathroom,
          kitchen or any other space. From selecting the right tiles to
          providing advice on installation, our team is here to support you at
          every step of the process. Visit our store today and let us help you
          bring your tiling vision to life.
        </p>

        <div className='w-full max-sm:hidden md:w-max h-48 md:h-40 mt-8 md:mt-15'>
          <img
            src={team}
            className='rounded-3xl md:rounded-4xl object-cover h-full w-full'
            alt='team'
          />
        </div>
        <div className='mt-8 md:mt-10 flex items-center gap-4 md:gap-10 font-semibold cursor-pointer hover:gap-12 transition-all'>
          WATCH VIDEO
          <MoveRight size={20} />
        </div>
      </section>
    </section>
  )
}
