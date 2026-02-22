import { toast } from 'sonner'
import { api } from '../api/axios'

export async function protectDashboard (signal) {
  try {
    const response = await api.get('/admin/check', {
      signal: signal
    })
    const username = response.data.name
    toast.success(`Admin verified , welcome back ${username}`)
    return username
  } catch (error) {
    if (error.status === 401) {
      toast.error('Unauthorized, not an admin')
      return (window.location.href = '/')
    }
    if (error.status === 405) {
      return toast.error('Session timed out , log in')
    }

    // window.location.href = '/'
  }
}
