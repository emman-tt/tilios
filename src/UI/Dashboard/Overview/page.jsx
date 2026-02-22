import { Chart } from './Charts'
import { Customers } from './Customers'
import { QuickActions } from './QuickActions'
import { fetchOverview } from '../../../services/Overview'
import { useEffect } from 'react'
import { Header } from './Header'
import { useSelector, useDispatch } from 'react-redux'
import { saveAnalytics } from '../../../store/store'
export default function Overview () {
  const dispatch = useDispatch()

  const { analytics, customers, chart_data } = useSelector(
    state => state.overview
  )

  useEffect(() => {
    fetchOverview().then(item => {
      dispatch(
        saveAnalytics({
          analytics: item.analytics,
          customers: item.recent_customers,
          chart_data: item.chart_data
        })
      )
      console.log(item.chart_data)
    })
  }, [])

  return (
    <section className='h-full w-full pt-5 p-4 sm:p-6 md:p-10 overflow-y-auto'>
      <section>
        <h2 className='text-base sm:text-lg md:text-lg font-semibold mb-3 sm:mb-5'>
          Analytics
        </h2>
      </section>

      <Header analytics={analytics} />
      <section className='flex flex-col lg:flex-row w-full gap-3 sm:gap-5 lg:gap-10 mt-4 sm:mt-6 '>
        <div className='w-full lg:flex-1 h-72    sm:h-80 md:h-100 lg:h-102 shadow-xl border-gray-100 rounded-3xl p-2 sm:p-4 md:p-6 '>
          <Chart data={chart_data} />
        </div>
        <div className='w-full lg:flex-1 h-auto lg:h-100 flex gap-3 sm:gap-5 lg:gap-10 flex-col'>
          <QuickActions />
          <Customers customers={customers} />
        </div>
      </section>
    </section>
  )
}
