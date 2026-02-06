import { AreaChart } from './Charts'
export default function Overview () {
  return (
    <section className=' h-full w-full pt-5 p-10'>
      <section>
        <h2 className='text-xl font-semibold'>Analytics</h2>
        <ul className='w-full grid-cols-4 grid gap-7 pr-20 pt-5'>
          <li className=''>
            <header className='flex rounded-lg items-center bg-[#fafafa] pl-5  gap-7  p-0.5 text-sm'>
              <img
                style={{ width: 15, height: 15 }}
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3VsQmAMBBG4Ve5hDqITqCb6T6ivW6ixDVOhAgWFgbFA3MP/jL5mkDAirEEaIEVkAebQuHmIXhsDIWdP1jwceJXasHy0hag1oD3zVqwGHyVwRK4DkiBDOi/hLPTXXkUcO/xHR2ieFxiMDdhpwU3Wt9i4nH3Ilrdga1/tQEirqIJujpQ5QAAAABJRU5ErkJggg=='
                alt='wallet'
              ></img>
              Total Revenue
            </header>

            <div className='flex flex-col h-30  justify-center pl-5'>
              <p className='text-4xl font-bold font-mono'>$8,201</p>
              <p className='text-sm flex gap-2 mt-3 '>
                Total Revenue since
                <span className='font-semibold'>12/05/25</span>
              </p>
            </div>
          </li>
          <li className=''>
            <header className='bg-[#f2f8ff] flex rounded-lg items-center pl-5 gap-7  p-0.5 text-sm'>
              <img
                style={{ width: 15, height: 15 }}
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABX0lEQVR4nO2ZTUrDUBSFv4GLaBGc6wbEgdKZA3U36gbUiaIb0bEz6zZcQxBRI2gdeCVwC8X32ubnBe/T+8EZ3SQ9h5echjxwHMfJnX3gDngDxJhK9ba3LMSpAbNSUyeLVqI64AM4BIbYYwgcqUeZtzJjHVYhrHOsXqvbLKDU4QD7DNTra2w4vfdyQeb5nQ52gFugMPBAyw8V6m27TpDcFCAZtpbEDpIMW0tiQ8mwtSQ29NbCWwtvLby1bDH4V62VC5KqtSbAA3AOrHYwVJ17odeapGytNnoERi1CjPTcXupXWuoZWGu4Ek99/o9IB900CHKd6DcDJJGWfqoBdoEv60EKYHNBiK3E73EBklDvwCWwDqyoNoArnUkuQWRGn6q+rh8gmSrgtw15EF8RbCngzwQpDZiShnqJBbk3YEwaKrqtcGDAmKR6rzszYE66br3NbsGNjT4zZd3NUMdxHEzzDf8FVNAOQ0xwAAAAAElFTkSuQmCC'
                alt='wallet-app'
              ></img>
              Total Orders
            </header>
            <div className='flex flex-col h-30  justify-center pl-5'>
              <p className='text-4xl font-bold font-mono flex gap-4 items-baseline'>
                131
                <span className='font-light font-sans text-xl'>Orders</span>
              </p>
              <p className='text-sm flex gap-2 mt-3 '>
                All Orders since
                <span className='font-semibold'>12/05/25</span>
              </p>
            </div>
          </li>
          <li className='grow'>
            <header className='bg-[#f5fdfb] flex rounded-lg items-center pl-5  gap-7 p-0.5 text-sm'>
              <img
                style={{ width: 15, height: 15 }}
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADfElEQVR4nO2aPWgUQRSAJ+/toTZaiPgDgoWFghoLC0U0YmPIzmyikNbCqI2FhRZqo0VsRGMQ7BICprAwERtRNBLUwkJFuH2z0UhUNKSSoGAU9MzJ29uTGHN3u3dzu8mSgYFwmb9v3ts3770ZIRZLiov0rCZHw5GDnlhbqg3/j9s42tor5mORHhyVhDmlMa8Ip6WG50rjBSdr7eDKf/u/EU5zG27LfcR8Ko6Gk8UFRqqFPheSXr8QedGgCC9FBphVpcZr5/MCYllz07CwlGvtVgTHJWG3JHgoCSdqhfgLQzgRjNnNc/BcPKdxEEnYb2rREeD6jUKorFgtNf6MG0Rp/FXOAkYHITibAES+IBU4Y4YiLxqkxrfJgeA7I4bAdvFAUhAqqLyGmiAcje1K42TSIIrwK1uyyADtY2JFElZKVaxwq80TK0NBFM4KHI95kZNSw6OQ0hnnNVYG0fA0gZ3uCIzK5XAw8KQyCMFQzBDDDNE8KpYojV6YPuwBVASRGgZjBJlSJDb68xJejAA/UBmEsDc2EIJTvhZkM9uieA6SsCfEN4JdManUK3YK2/MCg9glSv8rIVQL++oNwbtvu5nGQJVPV9G/ryxEiys2s6NWf5XCTp6vdURsUBq/RQYhzLWOZLaWUSu4HwPEm6b3YqlvbgkeVD8ODM0N4aKsu0oR/ra1tSfYtI5ax3M8tP8HIXCr0NVoMQrhdZ6LYwwjPhyBWzOIJPweuDOdIft8ah4VywNpDBiRMs0BwmKKOMhdNp2+5SE4wWpTFtxFFajwIVOq6sylWv6CNNyLJhW40/5RLCv0xTZF+KOE9G4WvWpjDimV+NiL5jeq3kuCZ0XX2nZxnyT8MgviM8f8BclhjwkISZizvcyWkiDVHoiSIOuMiHUFmEzjzDSR7cHhwjeI+6tK4ukqDsRg165WJ2r8ILNiU/Ggk4SvOcbg84LVz3Dc31VXp9FXI8/ayeM0j4pVra5YH0ij5myk+nee3oogiuB2jRNNzbQmLZTZbjonJjUMVpZI2JCz/I7lbIJjfpqV4KVJCFXJYhkPdflqgeCxcQgdNtRNJvkQZYPGQyUfUpMOSlWCLnUp0/mQxFYax4zdZikN5xb+tYLgQ02sScVFD5dErBjhDWG6pOYyNDXX0+l+MFDmCYcieLHgnnDMflRTjBbLPaqRnrWrVJvFIlJQ/gBM5rBjCx+7KAAAAABJRU5ErkJggg=='
                alt='approval'
              ></img>
              Delivered Orders
            </header>
            <div className='flex flex-col h-30  justify-center pl-5'>
              <p className='text-4xl font-semibold font-mono'>112</p>
              <p className='text-sm flex gap-2 mt-3 '>19 orders</p>
            </div>
          </li>
          <li className='grow'>
            <header className='bg-[#fff5f5] flex rounded-lg items-center pl-5 gap-7 p-0.5 text-sm'>
              <img
                style={{ width: 15, height: 15 }}
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB1ElEQVR4nO2ZTShEURTHf/KRbwsLERvNyoKFlUipKXZCtmzEUilJKVu2PhZTSra+dljYWpCNbGRLLHyFWSnj6dVZvMY87903d2Yu3V+dXt3eOef/fx9n7mvAYrGo4KRFjVI21GWo4cVvXRvpzXsU83tNM7CpmL9lmoEUEA+Z2y/nG2XAAd6BwYC8ITnPMdGAI3EADAONQCnQBIwAhwF5xhiIGl6sgSCsAayB7Ehv0BxiyhhtwKXlrxtwsQYEayDfBl49Nap81rXiaI4dT+0On3VjDTwDMU/tBZ914wy8yRX2inQ/Na8zrFssFk0UAwPAOnAOPAKfCi/uPbAMlJFnSoBJ4FbTBFpS7B8DpoAZoFtVvJtwqXn234XsHZdt+lda/n6Yu1gPbGRI1hV+lAFjwEVA/qpfgSIp8JAj4X4GaoFp4CZkfkq2HT+YzULUfIQXtBVYAZIR+i1mKtiWhQEV8V3AruIUcyROgb7fip/k+PGJGlfAqDzmvzJugFjHEzcyxt1xHooK4MUA4U/AHFBOBNYKKDwpP3bu9joy7QUQ/gEkgAY0cZYn4SlgW0aqVibyIP5Y7nZOqJZPv1wIP4nw52AkEp6mR7KdruQP0QnsydFi+a98A1L1QXdmAWFdAAAAAElFTkSuQmCC'
                alt='refund'
              />
              Refund
            </header>
            <div className='flex flex-col h-30  justify-center pl-5'>
              <p className='text-4xl font-semibold font-mono'>$80</p>
              <p className='text-sm flex gap-2 mt-3 '>1 order</p>
            </div>
          </li>
        </ul>
      </section>

      <section className='flex w-full justify-between mt-10 gap-15'>
        <div className='min-w-170 h-110 shadow-xl  border-gray-100 rounded-3xl p-10'>
          <AreaChart />
        </div>
        <div className='w-full h-full flex gap-15 flex-col'>
          <QuickActions />
          <Customers />
        </div>
      </section>
    </section>
  )
}

export const Customers = ({ className }) => {
  return (
    <section className='flex w-full h-full flex-col px-4 grow shadow-lg rounded-xl'>
      <header className='text-2xl font-semibold'>New customers</header>

      <div className='grid grid-cols-4 grid-rows-3  py-5 gap-y-4'>
        <p className=' justify-start flex pl-10'>
          <span className='p-2 rounded-full h-max bg-gray-100'>EM</span>
        </p>
        <p>Emmanuel Acquah</p>
        <p>Today</p>
        <p>07:16</p>

        <p className=' justify-start flex pl-10'>
          <span className='p-2 rounded-full h-max bg-gray-100'>ML</span>
        </p>
        <p>Manuel llama</p>
        <p>Today</p>
        <p>07:16</p>

        <p className=' justify-start flex pl-10'>
          <span className='p-2 rounded-full h-max bg-gray-100'>PB</span>
        </p>
        <p>Playboi Carti</p>
        <p>Today</p>
        <p>07:16</p>
      </div>
    </section>
  )
}

export const QuickActions = ({ className }) => {
  return (
    <section
      className={`flex px-4 grow shadow-lg rounded-xl pb-4 flex-col ${className}`}
    >
      <header className='font-semibold text-2xl'>Quick Actions</header>
      <section className='flex justify-between gap-7 mt-5'>
        <div className='flex flex-col w-full gap-2'>
          <p className='flex gap-2 text-lg font-serif pl-5'>
            <img
              width='27'
              height='27'
              src='https://img.icons8.com/external-flat-icons-inmotus-design/67/external-New-label-flat-icons-inmotus-design.png'
              alt='external-New-label-flat-icons-inmotus-design'
            />
            New items in stock ?
          </p>
          <button className='bg-black hover:bg-white border hover:text-black cursor-pointer rounded-xl p-2 text-white'>
            Add product
          </button>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <p className='flex gap-2 text-lg font-serif pl-5'>
            <img
              width='27'
              height='27'
              src='https://img.icons8.com/color-glass/48/receive-cash.png'
              alt='receive-cash'
            />
            Payment Confirmation
          </p>
          <button className='bg-white cursor-pointer hover:text-white hover:bg-black rounded-xl p-2 text-black border'>
            Confirm Payments
          </button>
        </div>
      </section>
    </section>
  )
}
