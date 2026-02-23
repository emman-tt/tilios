import { api } from '../api/axios'
import { handleError } from './handleError'

export async function fetchOrders (filter = 'all') {
  try {
    const response = await api.get(`/admin/orders?filter=${filter}`)
    const data = response.data
    return data
  } catch (error) {
    handleError(fetchOrders, error, filter)
  }
}

export async function deleteOrder (id) {
  try {
    await api.put(`/admin/orders/${id}`)
  } catch (error) {
    handleError(deleteOrder, error, id)
  }
}
export async function markOrderDelivered (id) {
  try {
    await api.put(`/admin/orders/${id}`)
  } catch (error) {
    handleError(markOrderDelivered, error, id)
  }
}
export async function confirmPayment (id) {
  try {
    await api.put(`/admin/confirm/payment/${id}`)
  } catch (error) {
    handleError(confirmPayment, error, id)
  }
}
