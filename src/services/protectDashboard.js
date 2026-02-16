import { toast } from 'sonner'
import { api } from '../api/axios'

export async function protectDashboard () {
  try {
    const response = await api.get('/admin/check')
    const username = response.data.name
    toast.success(`Admin verified , welcome back ${username}`)
  } catch (error) {
    if (error.status === 401) {
      toast.error('Unauthorized, not an admin')
      window.location.href ="/"
    }
    if (error.status === 405) {
      toast.error('Session timed out , log in')
    }
  }
}
