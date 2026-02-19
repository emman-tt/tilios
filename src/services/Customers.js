import { api } from '../api/axios'

export async function fetchCustomers () {
  try {
    const response = await api.get('/admin/customers')
    return response.data
  } catch (error) {
    console.log(error)
  }
}
