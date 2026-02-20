import { autoRefresh } from '../hooks/autoRefresh'
import { api } from '../api/axios'
import { toast } from 'sonner'
import { handleError } from './handleError'
export async function silentUserAuth (signal) {
  try {
    const response = await api.get('/silent/user-auth', {
      signal: signal
    })
    const data = await response.data
    const email = await data.email

    return data.status
  } catch (error) {
    handleError(silentUserAuth, error, signal)
  }
}
