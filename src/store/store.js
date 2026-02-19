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

export const { saveOrders, setStatus, setFilter } = OrderSlice.actions
export const { saveCustomers, updateStatus } = CustomerSlice.actions

export const store = configureStore({
  reducer: {
    orders: OrderSlice.reducer,
    customers: CustomerSlice.reducer
  }
})
