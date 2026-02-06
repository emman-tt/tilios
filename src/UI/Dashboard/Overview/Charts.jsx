import EChartsReact from 'echarts-for-react'
import { DotIcon } from 'lucide-react'
export const AreaChart = () => {
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
      data: [
        'Jan',
        'Feb',
        'Mar',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ]
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
    
        data: [43, 62, 49, 64, 53, 43, 34, 43, 10, 33, 9, 40],
        type: 'line',
        symbol: 'none',
        lineStyle: {
          width: 10,
          color: '#a6d7ee',
          opacity: 0.1
        },
        areaStyle: {
          color: '#a6d7ee',
          opaque: 0.1
        }
        // itemStyle: { color: '#a6d7ee' }
      },
      {
        smooth: 0.5,
        name: 'Expenses',
        data: [2, 31, 14, 35, 53, 53, 23, 23, 13, 44, 32, 15],
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
        // itemStyle: { color: '#b16c88' }
      }
    ]
  }

  return (
    <main className='grow w-full p-0 h-full'>
      <header className='flex justify-between px-5'>
        <div className='font-semibold text-xl'>
          Revenue <span className='text-sm font-light'>(this year)</span>
        </div>
        <div className='flex gap-5 text-sm '>
          <p className='flex gap-2  items-center h-full'>
            <span className='h-2 w-2  rounded-full inline-block bg-[#a6d7ee]'></span>
            Income
          </p>
          <p className='text-sm flex gap-2 items-center h-full'>
            <span className='h-2 w-2  rounded-full inline-block bg-[#b16c88]'></span>
            Expense
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
