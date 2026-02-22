export function Header({ analytics }) {
  function formatDate(rawDate) {
    const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

    return formattedDate
  }
  return (
    <ul className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 md:gap-5 lg:gap-7 lg:pr-20 mb-6 sm:mb-8'>
      <li className=''>
        <header className='flex rounded-lg items-center bg-[#fafafa] pl-3 sm:pl-4 gap-3 sm:gap-4 p-1 text-[10px] sm:text-xs'>
          <img
            style={{ width: 15, height: 15 }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgklEQVR4nO3VsQmAMBBG4Ve5hDqITqCb6T6ivW6ixDVOhAgWFgbFA3MP/jL5mkDAirEEaIEVkAebQuHmIXhsDIWdP1jwceJXasHy0hag1oD3zVqwGHyVwRK4DkiBDOi/hLPTXXkUcO/xHR2ieFxiMDdhpwU3Wt9i4nH3Ilrdga1/tQEirqIJujpQ5QAAAABJRU5ErkJggg=='
            alt='wallet'
          ></img>
          Total Revenue
        </header>

        <div className='flex flex-col h-auto justify-center pl-3 sm:pl-4 py-2 sm:py-3'>
          <p className='text-lg sm:text-2xl md:text-3xl font-bold font-mono'>
            ${analytics.total_revenue || 0}
          </p>
          <p className='text-[10px] sm:text-xs flex sm:flex-row gap-1 sm:gap-2 mt-1'>
            Last updated at
            <span className=''>
              {formatDate(analytics?.revenue_sync?.updatedAt)}
            </span>
          </p>
        </div>
      </li>
      <li className=''>
        <header className='bg-[#f2f8ff] flex rounded-lg items-center pl-3 sm:pl-4 gap-3 sm:gap-4 p-1 text-[10px] sm:text-xs'>
          <img
            style={{ width: 15, height: 15 }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABX0lEQVR4nO2ZTUrDUBSFv4GLaBGc6wbEgdKZA3U36gbUiaIb0bEz6zZcQxBRI2gdeCVwC8X32ubnBe/T+8EZ3SQ9h5echjxwHMfJnX3gDngDxJhK9ba3LMSpAbNSUyeLVqI64AM4BIbYYwgcqUeZtzJjHVYhrHOsXqvbLKDU4QD7DNTra2w4vfdyQeb5nQ52gFugMPBAyw8V6m27TpDcFCAZtpbEDpIMW0tiQ8mwtSQ29NbCWwtvLby1bDH4V62VC5KqtSbAA3AOrHYwVJ17odeapGytNnoERi1CjPTcXupXWuoZWGu4Ek99/o9IB900CHKd6DcDJJGWfqoBdoEv60EKYHNBiK3E73EBklDvwCWwDqyoNoArnUkuQWRGn6q+rh8gmSrgtw15EF8RbCngzwQpDZiShnqJBbk3YEwaKrqtcGDAmKR6rzszYE66br3NbsGNjT4zZd3NUMdxHEzzDf8FVNAOQ0xwAAAAAElFTkSuQmCC'
            alt='wallet-app'
          ></img>
          Total Orders
        </header>
        <div className='flex flex-col h-auto justify-center pl-3 sm:pl-4 py-2 sm:py-3'>
          <p className='text-lg sm:text-2xl md:text-3xl font-bold font-mono flex items-baseline gap-2'>
            {analytics.total_orders || 0}
            <span className='font-light font-sans text-xs sm:text-lg'>
              Orders
            </span>
          </p>
          <p className='text-[10px] sm:text-xs flex sm:flex-row gap-1 sm:gap-2 mt-1'>
            Last updated at
            <span className=''>
              {formatDate(analytics?.orders_sync?.updatedAt)}
            </span>
          </p>
        </div>
      </li>
      <li className='grow'>
        <header className='bg-[#f5fdfb] flex rounded-lg items-center pl-3 sm:pl-4 gap-3 sm:gap-4 p-1 text-[10px] sm:text-xs '>
          <img
            style={{ width: 15, height: 15 }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADfElEQVR4nO2aPWgUQRSAJ+/toTZaiPgDgoWFghoLC0U0YmPIzmyikNbCqI2FhRZqo0VsRGMQ7BICprAwERtRNBLUwkJFuH2z0UhUNKSSoGAU9MzJ29uTGHN3u3dzu8mSgYFwmb9v3ts3770ZIRZLiov0rCZHw5GDnlhbqg3/j9s42tor5mORHhyVhDmlMa8Ip6WG50rjBSdr7eDKf/u/EU5zG27LfcR8Ko6Gk8UFRqqFPheSXr8QedGgCC9FBphVpcZr5/MCYllz07CwlGvtVgTHJWG3JHgoCSdqhfgLQzgRjNnNc/BcPKdxEEnYb2rREeD6jUKorFgtNf6MG0Rp/FXOAkYHITibAES+IBU4Y4YiLxqkxrfJgeA7I4bAdvFAUhAqqLyGmiAcje1K42TSIIrwK1uyyADtY2JFElZKVaxwq80TK0NBFM4KHI95kZNSw6OQ0hnnNVYG0fA0gZ3uCIzK5XAw8KQyCMFQzBDDDNE8KpYojV6YPuwBVASRGgZjBJlSJDb68xJejAA/UBmEsDc2EIJTvhZkM9uieA6SsCfEN4JdManUK3YK2/MCg9glSv8rIVQL++oNwbtvu5nGQJVPV9G/ryxEiys2s6NWf5XCTp6vdURsUBq/RQYhzLWOZLaWUSu4HwPEm6b3YqlvbgkeVD8ODM0N4aKsu0oR/ra1tSfYtI5ax3M8tP8HIXCr0NVoMQrhdZ6LYwwjPhyBWzOIJPweuDOdIft8ah4VywNpDBiRMs0BwmKKOMhdNp2+5SE4wWpTFtxFFajwIVOq6sylWv6CNNyLJhW40/5RLCv0xTZF+KOE9G4WvWpjDimV+NiL5jeq3kuCZ0XX2nZxnyT8MgviM8f8BclhjwkISZizvcyWkiDVHoiSIOuMiHUFmEzjzDSR7cHhwjeI+6tK4ukqDsRg165WJ2r8ILNiU/Ggk4SvOcbg84LVz3Dc31VXp9FXI8/ayeM0j4pVra5YH0ij5myk+nee3oogiuB2jRNNzbQmLZTZbjonJjUMVpZI2JCz/I7lbIJjfpqV4KVJCFXJYhkPdflqgeCxcQgdNtRNJvkQZYPGQyUfUpMOSlWCLnUp0/mQxFYax4zdZikN5xb+tYLgQ02sScVFD5dErBjhDWG6pOYyNDXX0+l+MFDmCYcieLHgnnDMflRTjBbLPaqRnrWrVJvFIlJQ/gBM5rBjCx+7KAAAAABJRU5ErkJggg=='
            alt='approval'
          ></img>
          Delivered Orders
        </header>
        <div className='flex flex-col h-auto justify-center pl-3 sm:pl-4 py-2 sm:py-3'>
          <p className='text-lg sm:text-2xl md:text-3xl font-semibold font-mono'>
            {analytics.delivered_orders || 0}
          </p>
          <p className='text-xs  flex gap-2 mt-1 sm:mt-3'>Successful orders</p>
        </div>
      </li>
      <li className='grow'>
        <header className='bg-[#fff5f5] flex rounded-lg items-center pl-3 sm:pl-4 gap-3 sm:gap-4 p-1 text-[10px] sm:text-xs'>
          <img
            style={{ width: 15, height: 15 }}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB1ElEQVR4nO2ZTShEURTHf/KRbwsLERvNyoKFlUipKXZCtmzEUilJKVu2PhZTSra+dljYWpCNbGRLLHyFWSnj6dVZvMY87903d2Yu3V+dXt3eOef/fx9n7mvAYrGo4KRFjVI21GWo4cVvXRvpzXsU83tNM7CpmL9lmoEUEA+Z2y/nG2XAAd6BwYC8ITnPMdGAI3EADAONQCnQBIwAhwF5xhiIGl6sgSCsAayB7Ehv0BxiyhhtwKXlrxtwsQYEayDfBl49Nap81rXiaI4dT+0On3VjDTwDMU/tBZ914wy8yRX2inQ/Na8zrFssFk0UAwPAOnAOPAKfCi/uPbAMlJFnSoBJ4FbTBFpS7B8DpoAZoFtVvJtwqXn234XsHZdt+lda/n6Yu1gPbGRI1hV+lAFjwEVA/qpfgSIp8JAj4X4GaoFp4CZkfkq2HT+YzULUfIQXtBVYAZIR+i1mKtiWhQEV8V3AruIUcyROgb7fip/k+PGJGlfAqDzmvzJugFjHEzcyxt1xHooK4MUA4U/AHFBOBNYKKDwpP3bu9joy7QUQ/gEkgAY0cZYn4SlgW0aqVibyIP5Y7nZOqJZPv1wIP4nw52AkEp6mR7KdruQP0QnsydFi+a98A1L1QXdmAWFdAAAAAElFTkSuQmCC'
            alt='refund'
          />
          Refund
        </header>
        <div className='flex flex-col h-auto justify-center pl-3 sm:pl-4 py-2 sm:py-3'>
          <p className='text-lg sm:text-2xl md:text-3xl font-semibold font-mono'>
            ${analytics.refunded_orders || 0}
          </p>
          <p className='text-xs  flex gap-2 mt-1 sm:mt-3'>0 order</p>
        </div>
      </li>
    </ul>
  )
}
