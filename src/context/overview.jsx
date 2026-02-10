import { useContext, createContext, useReducer } from 'react'

const OverviewContext = createContext()

const initialState = {
  customers: [
    {
      id: 1,
      name: 'Manuel llama',
      date: new Date().toLocaleString()
    },
    {
      id: 2,
      name: 'Manuel llama',
      date: new Date().toLocaleString()
    },
    {
      id: 3,
      name: 'Manuel llama',
      date: new Date().toLocaleString()
    }
  ],
  revenue: {
    amount: 0,
    date: new Date().toLocaleString()
  },
  totalOrders: {
    amount: 0,
    date: new Date().toLocaleString()
  },
  deliveredOrders: 0,
  refund: {
    amount: 0,
    orders: 0
  }
}

function reducer (state, action) {
  switch (action.type) {
    case value:
      break

    default:
      throw new Error('Unknown actions')
  }
}

export const OverviewProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <OverviewContext.Provider value={{ state }}>
      {children}
    </OverviewContext.Provider>
  )
}

export const useOverview = () => useContext(OverviewContext)
