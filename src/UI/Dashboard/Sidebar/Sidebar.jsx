import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'
import { memo } from 'react'
export default Sidebar = memo(({ className }) => {
  const [selected, setSelected] = useState(1)
  const [sidebar, setSidebar] = useState(sidebarNav)
  const location = useLocation()
  useEffect(() => {
    const path = location.pathname
    const end = path.split('/')
    const pathname = end[end.length - 1]

    if (pathname.toLowerCase() === 'dashboard') {
      return setSelected(1)
    }

    const route = sidebar.find(
      item => item.route.toLowerCase() === pathname.toLowerCase()
    )

    setSelected(route.id)
  }, [location])
  return (
    // bg-[#f2f8ff]
    <section
      className={`
      bg-white
          pt-20 sm:pt-30 flex flex-col sm:pl-6 sm:pr-1 gap-3  sm:gap-5 text-xs  sm:text-sm md:text-md font-medium font-sans ${className}`}
    >
      {sidebar.map(item => (
        <NavLink
          key={item.id}
          to={`${item.route}`}
          onClick={() => {
            setSelected(item.id)
          }}
          className={` cursor-pointer ${
            item.id === selected ? 'bg-[#eff3f4]' : ''
          } 
          ${
            item.id === sidebar.length &&
            'border-t rounded-none mt-5 border-gray-400'
          }
          
          p-1.5 sm:py-2 px-3 text-[#5c5c5c]  rounded-2xl flex justify-start gap-3 sm:gap-2 items-center text-sm sm:text-sm `}
        >
          <img src={item.icon} className='h-6  sm:h-5 w-6 sm:w-5' alt='' />
          <span className='  sm:inline'>{item.name}</span>
        </NavLink>
      ))}
      <NavLink
        to={'/'}
        className='p-1.5 sm:py-2 px-3 text-[#5c5c5c]  rounded-2xl flex justify-start gap-3 sm:gap-2 items-center text-sm sm:text-sm'
      >
        <Home className='h-6 sm:h-5 w-6 sm:w-5' />
        <span className='sm:inline'>Homepage</span>
      </NavLink>
    </section>
  )
})

const sidebarNav = [
  {
    id: 1,
    name: 'Overview',
    route: '',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABOElEQVR4nMWUu0pDQRCGP0URrFIpWlsIGhB8BsFYKIioT5QihQ/htfEhrARfQCSKigExNoKmdmVgDkiczc4ZAg5MsefM/t/uXBbq2xbQA1LBJaYV0McjXvlLBJBq+v8ApoE94ALojhuwo7nLBaUoYAI4cpyiFy1yTjwNAVrGDXPim9WmXec1Z0ak6w1YyxX00Qm4ATYMgOxfImOHNQqV1Gd1fQVcA4u6XrAAZwHAwZCGNEgHOLUA9wHAh968ASwDl/pdtP7YV0G8bwByPrAAg4L4qsatOwCfFuDBIb6ibVgC3FmAcyPwHWjqf8nxq3Nyjz1tGjl5UpcH0hy05zGId1XLtG1DvF9D/Fs1Rtp8UDwBbZw2Fzh5G5j0Aqp0PTlzXkxLzqaAfX1bZPxlGGXib4ET7ZZsQX/bD4dlRdj1hvmaAAAAAElFTkSuQmCC'
  },
  {
    id: 2,
    route: 'addproduct',
    name: 'Add Product',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2XISxFURjHfxTRiOYVVXg2VWGqUdQXVZoqSuxFVRQINoKRRKMQFUHjaRQ+O9u525n4nXs99/j/tl983/3O7+3dex8IIYQQQvgYBw4BczhI5gycM46ASYbEEvDkXDx4m8y6y5gTdlj8zYOPAbvAZ8bSweNk5knmrC+gH3drlNnMbyt1L5m7X9PMe2CuiYOPAJvAR02LWpxXsVXj3LDjNjBa1+E7wFWNC1auJtdYa2D+Zdw9i3XgpYHlgt3kOt2GrvEG9HIjiP+MRd+B1+gz8Jj4ANxEr4GLxNP4snIUX5gOEvvxcRrciTeuynCD3Ij24k+xcgVYji4A84nhKTUTnQImotkBrOUqgBcrRAXwYoWoAF6sEIcWoC4UgJYGmK7h8J02BzjL/EsaPnve5gD2R1QAL1aICuDFClEBvFghKoAXK0QF8GKFqABerBAVwIsVogJ4sUJUAC9WiArgxQpRAbxYISqAFytEBfBihSiEEEIIwU++AThZPKNfGpqOAAAAAElFTkSuQmCC'
  },
  {
    id: 3,
    route: 'productlist',
    name: 'Product List',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACv0lEQVR4nO2ZT4hNURzHP/4lhI1R/oWQsiEWNkqzkliRkuTPylIs30INicVYqJlko2hWZvGmrCgLhpoZRUnNDBYkCVGIaUZc/fR7dbq9c9895zznXtxv/Zp3/33v73Pu+Z37m/egkpdmAF1ALzCHv1TzgAEg0bgFzKbko94D9BujvhB4ZEA0ol/PL52mA1eNRG8AM/VYTxMQiWt6XWk0DbjcJFHZh4583QLTq9dHlyR1GvhmSSwdNaNOhnNekzSJIeMJB2sRcNMxgZ/AUeP6sQCYE+2A2Aa8VsM3QCdwIWcCU8AO9VkDvLUAHzPu1wE8Tp3zCVjiCyDz97gmI2Z3gKXAWcfR/AxsVs8twJfU8UlgdwZEI/p8IOYD140RuwjMAs54To13wDr13gl8d4RINGQ25NYm4JnxSPfq/q6AOS7xHFisXgeBCUeIBHiiA9pSh4CvetFDndeiU4EQjRjWVcxUR06IXIUvb+MrxsmXjFai1iaIRgwYb3ZXiMzClzV6pM3J/unoawZypASJJR7RmX4ajcKWiC3py3xBHmQ9jdiSxWTCE0TK4bek4MYLBhH5vJvG9eVsrY3Yku5hLvDCAWLMhEjXRl6Q+w43HMzhd0D/7snp+dSEyFqpWmnQAeRuDj9pRqUdIkd3LQO/LG0wmjqhqKkl9+zWz+u197JBLLdNESmYwzrNigSZAjbo9nlLj7bCxbAokAS4rdtS+C+N/bIIrPIxjC1z5Pfpvv26LUCrfQ2LBHlldMbSwK7Uz9t9DGMrXQ/nUse36n+YzoZFg0zq6iXaCHxwzassIIl+O3kSeO+TV5lAkpDWqQIJ1H8FMuJjGFutID4Ca30MYysL4gewy9ewTCC1EMPYskHUfX87KRPIKLAg1DC2govbZhhbwcVtM4yt4OLOMiwi6u36YfRegRBDxjcplSpVqvQP6xcHH+IZG+RZNQAAAABJRU5ErkJggg=='
  },
  {
    id: 4,
    name: 'Orders',
    route: 'orders',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABw0lEQVR4nO2UyyutURjGfyOdwsmAZDsmysAAIxR/AHUMpIzM/QPYRkbkUsotZkwoR9qZMCDMjA0pTM5pK7HdC7lsrXo+rVbr+xCd0ffUan/rWc/7vs+7LhtixIgRw48WYAu4BW70/Zv/hAEgGzL6Pfpy4A9wAlwDKaDiK51ngXugGyjR6BGXdXaiXIVdoxmgVJocYAQ4BtLAkDgvtpXAFHeR1Jo5jgDz4laAhIquiluSZthjcDDMwLUEpmsXCa0ZTYALccUWVybuUvO05g1Ao74N58XVBwxcevS/PAZONc9o3mgZOAszsCmBOXMXvVrbsLgFcasyYcaauEVpUp4jWA4z0GxdwqS6Tqj4g9aanF0JLqc9HoFKvRrfa3oB+sJMzEU8w1lLV6QLGaY9ssx0AYXOi3pxmuEHMAM8RyR9AqakDYofAO0ylA+0AvtWjNnJsBe1bhcPnuAdMA7UAbka9cCEtd1/9XuozlwUWCY6Iy50JiBmrMRVYWcD1AD/rO46IrRt0uxEaN6SPqvzqOK2PtiJ6gjdT2nO30s4LeEYH8ekYkb5BuwpWe0nYuoVs/sdBu6ULO8TMXmKMX/FMWLEiMFX8Ar7D7RML2XVbgAAAABJRU5ErkJggg=='
  },
  {
    id: 5,
    name: 'Customers',
    route: 'customers',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABgklEQVR4nO2Wv0vDQBTHP0NwEMFFUwUdg2tR/55uirg4dhUHF/8RwaUu4hZp/AU6GVTo7uIgSJ17UngHx3lJY3JnHfrgC+Wal8/33r13BGZRL1rAOfAF3AIbFXJuACXKaBArwIvxsrGuK+RdWTne4Ar4nJAXA3lTA60C+FhnFuwReJDfJjyXSvR9wp+ApYKd5hY8rrvz5xL4sgNugv8EjpTdhMVyDPoofh1zwH1FODJatWH2nB4D+yXwVeDU11zrMCFbwJ0DnjvgjebaDPNli8DQcdkUwb0bWJOyDgW8I5fQZQHcu4ELYB1YALaBI+CjBO7dgKoh7wZSoD0NA23gROY5nYaBVM7fhCcFOcl/7oEI6ACvoo6sBe+BSGADxzODMiPKUw8k8rk2cjwzkv+SkD3QAzZF2ogG6/VeyB5QAjSNmGBdmWA9oKyS74nsIwnWA8rSoWjivaE89UBjA6phD2QVDPRDGoiAXeDNYeAd6Mrn3o/IGsBdO5oX2IGoK2uzwIxvQwenR7Q2Pb0AAAAASUVORK5CYII='
  },
  {
    id: 6,
    name: 'Settings',
    route: 'settings',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC2UlEQVR4nO2av2sUQRTHP8FgUHMngtHCHwg5UCNioqIRS7HRXi099A8wxM4YECGiYv6CWNl5iIWtgoVGLKKthSjmULhYaZFc7pJbGXgLy7ruzszO3e6d+cIXApmbed/deTvffW9hA/8H7gPrgBdiE5iki1CNEOHzA12CItCKEVIH+ukCjMeI8HkoywD3AxPAUMK4soaQSwlzDAE3gH04xgHgqwRRAy7GjH2oIeROzO/PAd9lnMq1kisRpYjkVTnwCBgIjd0BvNEQ8goohH67WS5COL8WgeF2iAjyIzAiefEcWNUQ4XMZeAIcBQ4CCzFjU4nZmyDCZ8Mg+CiqO7CiMW4R2GMjRCdpO82rNkK2Ap9yELwn/AwMYokTDraOCzaB06TEdA6ETOEAyk7MZyjiLbAJRyhltMWWXZwhQZzJ6G6sA0dcCnlhGICyMbeAUWCbcEz2es1wrjlXInbJU0N34acR9iMI9b+KwXy/gC227xPKclwXP/XeUESfxhp9hmJeAw/kkD6VcKG4JzbAdj/XkhaIuGBLKdb7JjH/hbWUialywhS3U665FjVp3OupDo9ZCBlLuWarHUJsfFAhj0IKFkKKeRQympet1cjA2KU1pI2oSW9K8azeocfvduCn5Vp1iXUyye2q9/DLwIxmMcFnxeBAfGYw70vgrpSRDtsW+EwtSkWSOO5OmIj4bWtRXJjGJTnsjstjeVD+nrbYTo/pARvfcm3jRwy3lyuuSM3LCQakEOdlxAWpQqbGbIYiPKEqpabCeQcnvqtcuWArYifwIwcivMCBu9tGyEQOgvdCVD0Tq8aOThF7tUNF7KrE1Ja2wjsZMy6ntW1bYTihCFh10fCJEtOUU7o/otEzr1lMCBtMVU2cinDhTrtWwdbbF+Bsyse1MoD/wslAF8CpiGDjpyzFtjhc0xByRaOlUbZt7HTSlykrnnsUe+WDgZ75hAOpAPbERzUbwBJ/AGHShFfzN0J6AAAAAElFTkSuQmCC'
  }
]
