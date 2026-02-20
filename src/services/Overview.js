import { toast } from 'sonner'
import { api } from '../api/axios'
import { autoRefresh } from '../hooks/autoRefresh'
import { silentUserAuth } from './silentAuth'

export async function fetchOverview () {
  try {
    const response = await api.get('/admin/overview')
    return response.data
  } catch (error) {
    const status = error.status
    if (status === 403) {
      const status = await autoRefresh()

      if (status === 'success') {
        return fetchOverview()
      }
    }

    if (status === 405) {
      return toast.error('Session timed out, please log in')
    }

    if (status === 401) {
      return
    }

    return toast.error(serverError)
  }
}
