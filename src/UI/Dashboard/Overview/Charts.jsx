import { useEffect, useState, useMemo, lazy, Suspense } from 'react'
import Loader from '../../../components/Loader'

// Lazy load ECharts - this is KEY for reducing bundle size!
const EChartsReact = lazy(() => import('echarts-for-react'))

export const Chart = ({ data }) => {
  // ✅ Use useMemo to process data - no need for useState here!
  const { xAxis, yAxis } = useMemo(() => {
    if (!data) return { xAxis: [], yAxis: [] }
    
    const timeArr = []
    const revenueArr = []
    
    // ✅ Use forEach instead of map with side effects
    data.forEach(item => {
      timeArr.push(formatDate(item.time_bucket))
      revenueArr.push(item.total_revenue)
    })
    
    return { xAxis: timeArr, yAxis: revenueArr }
  }, [data]) // ✅ Only recalculates when data changes

  // ✅ Memoize the chart option to prevent unnecessary re-renders
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
  }), [xAxis, yAxis]) // ✅ Only updates when axes data changes

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
      <header className='flex flex-col sm:flex-row justify-between px-2 sm:px-4 md:px-5 gap-2 sm:gap-3'>
        <div className='font-semibold text-base sm:text-lg'>
          Revenue
          <span className='text-xs sm:text-sm font-light'>(this year)</span>
        </div>
        <div className='flex gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm flex-wrap'>
          <p className='flex gap-1 sm:gap-2 items-center h-full'>
            <span className='h-2 w-2 rounded-full inline-block bg-[#b16c88]'></span>
            <span className='hidden sm:inline'>Income</span>
            <span className='sm:hidden'>Inc</span>
          </p>
        </div>
      </header>
      
      {/* ✅ Suspense handles loading state while ECharts loads */}
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><Loader /></div>}>
        <EChartsReact
          opts={{ renderer: 'canvas', usePassive: true }}
          option={option}
          style={{ height: '100%', width: '100%' }}
          lazyUpdate={true}
          notMerge={false} // Add this for better performance
        />
      </Suspense>
    </main>
  )
}