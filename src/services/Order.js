import { api } from '../api/axios'

export async function fetchOrders (filter = 'all') {
  try {
    const response = await api.get(`/admin/orders?filter=${filter}`)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function deleteOrder (id) {
  try {
    await api.put(`/admin/orders/${id}`)
  } catch (error) {
    console.log(error)
  }
}
export async function markOrderDelivered (id) {
  try {
    await api.put(`/admin/orders/${id}`)
  } catch (error) {
    console.log(error)
  }
}
export async function confirmPayment (id) {
  try {
    await api.put(`/admin/confirm/payment/${id}`)
  } catch (error) {
    console.log(error)
  }
}
