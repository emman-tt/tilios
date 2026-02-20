import EChartsReact from 'echarts-for-react'
import Loader from '../../../components/Loader'
import { useEffect, useState } from 'react'
export const Chart = ({ data }) => {
  const [xAxis, setXaxis] = useState([])
  const [yAxis, setYaxis] = useState([])

  function buildChartData () {
    const timeArr = []
    const revenueArr = []
    data.map(item => {
      timeArr.push(formatDate(item.time_bucket))
      revenueArr.push(item.total_revenue)

      return setYaxis(revenueArr), setXaxis(timeArr)
    })
  }

  function formatDate (item) {
    const date = new Date(item).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
    return date
  }

  useEffect(() => {
    buildChartData()
  }, [data])

  const option = {
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '5%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        margin: 0,
        padding: [5, 10],
        rotate: 45
      },
      type: 'category',
      data: xAxis
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [
      {
        smooth: true,
        name: 'Income',

        data: yAxis,
        type: 'line',
        symbol: 'none',
        lineStyle: {
          width: 10,
          color: '#b16c88',
          opacity: 0.1
        },
        areaStyle: {
          color: '#b16c88',
          opaque: 0.1
        }
        // itemStyle: { color: '#a6d7ee' }
      }
    ]
  }

  if (!data || xAxis.length === 0) {
    return (
      <section className='relative'>
        <Loader />
      </section>
    )
  }

  return (
    <main className='grow w-full p-0 h-full flex flex-col'>
      <header className='flex flex-col sm:flex-row justify-between px-2 sm:px-4 md:px-5 gap-2 sm:gap-3'>
        <div className='font-semibold text-base sm:text-lg md:text-xl'>
          Revenue{' '}
          <span className='text-xs sm:text-sm font-light'>(this year)</span>
        </div>
        <div className='flex gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm flex-wrap'>
          <p className='flex gap-1 sm:gap-2 items-center h-full'>
            <span className='h-2 w-2 rounded-full inline-block bg-[#a6d7ee]'></span>
            <span className='hidden sm:inline'>Income</span>
            <span className='sm:hidden'>Inc</span>
          </p>
          <p className='text-xs sm:text-sm flex gap-1 sm:gap-2 items-center h-full'>
            <span className='h-2 w-2 rounded-full inline-block bg-[#b16c88]'></span>
            <span className='hidden sm:inline'>Expense</span>
            <span className='sm:hidden'>Exp</span>
          </p>
        </div>
      </header>
      <EChartsReact
        opts={{ renderer: 'canvas', usePassive: true }}
        option={option}
        style={{ height: '100%', width: '100%' }}
        lazyUpdate={true}
      />
    </main>
  )
}
