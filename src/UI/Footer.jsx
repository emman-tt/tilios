import { Volleyball } from 'lucide-react'

export default function Footer ({ footerRef }) {
  return (
    <section
      ref={footerRef}
      className='absolute inset-0 flex flex-col align-top justify-start items-start z-20 h-full text-white py-10 md:py-16 w-full bg-[#1f1f1f] gap-8 md:gap-10 px-6 md:px-12 overflow-y-auto md:overflow-hidden'
    >
      <section className='flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-6 md:gap-0'>
        <div className='w-full md:w-[25%] lg:w-[20%] text-xl md:text-2xl font-medium leading-tight'>
          CONTACT US IF YOU HAVE ANY QUESTIONS
        </div>
        <div className='text-4xl md:text-6xl lg:text-8xl font-bold font-mono w-full md:w-[60%] leading-none'>
          Made By Emmanuel Acuqah (me)
        </div>

        <Volleyball
          className='hidden md:block opacity-50 md:opacity-100'
          size={150}
        />
      </section>
      <section className='flex flex-wrap md:flex-nowrap w-full justify-between gap-10 md:gap-0'>
        <ul className='flex flex-col gap-4 md:gap-6 text-sm md:text-base'>
          <li className='hover:underline cursor-pointer'>INSTAGRAM</li>
          <li className='hover:underline cursor-pointer'>FACEBOOK</li>
          <li className='hover:underline cursor-pointer'>TWITTER</li>
        </ul>

        <ul className='flex flex-col md:flex-row gap-10 md:gap-16'>
          <li>
            <p className='mb-3 text-[#827f80] text-xs uppercase tracking-widest'>
              MAIN WAREHOUSE
            </p>
            <div className='text-sm md:text-base'>410 Gh, Accra</div>
            <div className='text-sm md:text-base'>Greater, Africa</div>
          </li>
          <li>
            <p className='mb-3 text-[#827f80] text-xs uppercase tracking-widest'>
              SALES OFFICE
            </p>
            <div className='text-sm md:text-base'>410 Gh, Accra</div>
            <div className='text-sm md:text-base'>Greater, Africa</div>
          </li>
        </ul>

        <ul className='flex flex-col justify-center gap-2 md:gap-4 font-mono text-sm md:text-base'>
          <li>+233 8433 232 344</li>
          <li>+233 3203 102 422</li>
        </ul>
      </section>

      <section className='text-[#827f80] w-full justify-between flex flex-col md:flex-row gap-4 md:gap-0 text-[10px] md:text-xs mt-auto pt-8 border-t border-gray-800'>
        <div className='flex gap-4'>
          <div className='hover:text-white cursor-pointer'>Privacy Policy</div>
          <div className='hover:text-white cursor-pointer'>
            Terms and Conditions
          </div>
        </div>
        <div>@tilio.com is a registered trademark of the Incoperated</div>
      </section>
    </section>
  )
}
