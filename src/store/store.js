import { configureStore, createSlice } from '@reduxjs/toolkit'

const OrderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'loading',
    filter: 'all'
  },
  reducers: {
    saveOrders: (state, action) => {
      state.orders = action.payload
      state.status = 'loaded'
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    confirmPaymentStatus: (state, action) => {
      const order = state.orders.find(item => item.reference === action.payload)
      if (order) {
        order.payment_status = 'confirmed'
      } else {
        console.warn(`Order with ID ${action.payload} not found in state`)
      }
    },
    markDelivered: (state, action) => {
      const order = state.orders.find(item => item.reference === action.payload)
      if (order) {
        order.order_status = 'delivered'
      } else {
        console.warn(`Order with ID ${action.payload} not found in state.`)
      }
    }
  }
})
const CustomerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    status: 'loading'
  },
  reducers: {
    saveCustomers: (state, action) => {
      state.customers = action.payload
      state.status = 'loaded'
    },
    updateStatus: (state, action) => {
      state.status = action.payload
    }
  }
})

const OverviewSlice = createSlice({
  name: 'overview',
  initialState: {
    customers: [],
    analytics: [],
    chart_data: []
  },
  reducers: {
    saveAnalytics: (state, action) => {
      state.analytics = action.payload.analytics
      state.customers = action.payload.customers
      state.chart_data = action.payload.chart_data
    }
  }
})

export const {
  saveOrders,
  setStatus,
  setFilter,
  confirmPaymentStatus,
  markDelivered
} = OrderSlice.actions
export const { saveCustomers, updateStatus } = CustomerSlice.actions
export const { saveAnalytics } = OverviewSlice.actions

export const store = configureStore({
  reducer: {
    orders: OrderSlice.reducer,
    customers: CustomerSlice.reducer,
    overview: OverviewSlice.reducer
  }
})
