import { autoRefresh } from '../hooks/autoRefresh'
import { api } from '../api/axios'
import { toast } from 'sonner'
export async function silentUserAuth () {
  try {
    const response = await api.get('/silent/user-auth')
    const data = await response.data
    const email = await data.email

    // toast.success('User logged in as :', {
    //   description: email
    // })

    return data.status
  } catch (error) {
    console.log(error)
    const status = error.status
    const serverError = error.response.data.message

    if (status === 403) {
      const status = await autoRefresh()

      if (status === 'success') {
        return silentUserAuth()
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
