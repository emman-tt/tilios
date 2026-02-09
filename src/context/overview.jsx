import { useContext, createContext, useReducer } from 'react'

const OverviewContext = createContext()

const initialState = {
  customers: [],
  revenue: [0, new Date().toLocaleString()],
  totalOrders: [0, new Date().toLocaleString()],
  deliveredOrders: 0,
  refundedOrders: 0,
  refundAmount: 0
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
  //   const {
  //     customers,
  //     revenue,
  //     totalOrders,
  //     deliveredOrders,
  //     refundedOrders,
  //     refundAmount
  //   } = state
  return (
    <OverviewContext.Provider value={{ state }}>
      {children}
    </OverviewContext.Provider>
  )
}

export const useOverview = () => useContext(OverviewContext)
