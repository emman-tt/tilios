import { useEffect, useState, useMemo, lazy, Suspense } from 'react'
import Loader from '../../../components/Loader'
const EChartsReact = lazy(() => import('echarts-for-react'))

export const Chart = ({ data }) => {

  const { xAxis, yAxis } = useMemo(() => {
    if (!data) return { xAxis: [], yAxis: [] }

    const timeArr = []
    const revenueArr = []

    data.forEach(item => {
      timeArr.push(formatDate(item.time_bucket))
      revenueArr.push(item.total_revenue)
    })

    return { xAxis: timeArr, yAxis: revenueArr }
  }, [data]) 

  
  const option = useMemo(() => ({
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
        padding: [5, 17],
        rotate: 45
      },
      type: 'category',
      data: xAxis,
      min: 0,
      boundaryGap: false
    },
    yAxis: {
      min: 0,
      type: 'value',
      splitLine: { show: false },
      axisLabel: {
        formatter: '${value}'
      }
    },
    series: [{
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
    }]
  }), [xAxis, yAxis]) 

  function formatDate(item) {
    const date = new Date(item).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
    return date
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
      <header className='flex flex-row justify-between px-2 sm:px-4 md:px-5 items-center mb-2'>
        <div className='font-semibold text-sm sm:text-lg'>
          Revenue
          <span className='text-[10px] sm:text-sm font-light ml-1'>(this year)</span>
        </div>
        <div className='flex gap-2 sm:gap-3 md:gap-5 text-[10px] sm:text-sm flex-wrap'>
          <p className='flex gap-1 sm:gap-2 items-center h-full'>
            <span className='h-2 w-2 rounded-full inline-block bg-[#b16c88]'></span>
            <span className='inline'>Income</span>
          </p>
        </div>
      </header>

    
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><Loader /></div>}>
        <EChartsReact
          opts={{ renderer: 'canvas', usePassive: true }}
          option={option}
          style={{ height: '100%', width: '100%' }}
          lazyUpdate={true}
          notMerge={false} 
        />
      </Suspense>
    </main>
  )
}